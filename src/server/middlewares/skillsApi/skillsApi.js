import slugify from 'slug'
import selectn from 'selectn'
import { Router } from 'express'
import sequelize from 'sequelize'
import generateUuid from 'uuid/v4'
import { mustLogin } from 'server/services/permissions'
import { Skills, Revisions, User } from 'server/data/models'

const limit = 12

async function getSkill(where) {
  try {
    const skill = await Skills.findOne({where, raw: true})
    const revision = await Revisions.findOne({
      where: {
        active: true,
        parentId: skill.id,
      },
      include: [User],
      raw: true,
      nest: true,
    })
    const previousRevision = await Revisions.findById(revision.previousId, {raw: true})
    const revisions = await Revisions.findAll({where: {parentId: skill.id}, raw: true})

    skill.revision = revision
    skill.revisions = revisions
    skill.revision.previousRevision = previousRevision

    return skill
  } catch (error) {
    throw new Error(error)
  }
}

export default Router()

  // get single skill
  .get('/skill/:slug', async (req, res) => {
    const slug = selectn('params.slug', req)
    try {
      return getSkill({slug})
            .then(skill => res.json(skill))
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // get all skills
  .get('/:page?', async (req, res) => {
    try {
      const { page } = req.params
      const skillsCount = await Skills.count()
      const offset = page ? limit * (page -1) : 0
      res.json({
        currentPage: Number(page) || 1 ,
        totalPages: Math.ceil(skillsCount / limit),
        values: await Skills.findAll({limit, offset}),
      })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // update skill
  .put('/:parentId', mustLogin, async ({user, session, body, params}, res) => {
    /*
      1) deactivate previous revision
      2) create new one
      3) ???
      4) PROFIT
    */
    try {

      const UserId = user.id
      console.log('user.id: ', user.id);
      console.log('session: ', session);
      const { parentId } = params
      Revisions
      .findOne({where: {
        parentId,
        active: true,
      }})
      .then(revision => revision.update({active: false}))
      .then(previousRevision => {
        return Revisions.create({
          ...body,
          UserId,
          parentId,
          active: true,
          // we need to set "previousId" to easily find difference after edit
          previousId: previousRevision.id
        })
      })
      // TODO: maybe i should get rid of RevisionId completely?
      .then(createdRevision => {
        return Skills.update(
          {RevisionId: createdRevision.id},
          {where: {id: createdRevision.parentId}}
        )
      })
      .then(() => getSkill({id: parentId}))
      .then(skill => res.json(skill))

    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // create skill
  .post('/', mustLogin, async ({user, body}, res) => {
    /*
      1) create skill
      2) create revision for skill
      3) ???
      4) PROFIT
    */
    try {
      const UserId = user.id
      const slug = slugify(body.name)
      const SkillId = generateUuid()
      const RevisionId = generateUuid()

      await Revisions
      .create({
        ...body,
        UserId,
        active: true,
        id: RevisionId,
        parentId: SkillId,
        name: 'initial_revision',
      })
      .then(() =>
        Skills.create({
          ...body,
          slug,
          UserId,
          RevisionId,
          id: SkillId,
        })
      )
      .then(skill => res.json(skill))

    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })