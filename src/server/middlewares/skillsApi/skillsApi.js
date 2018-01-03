import slugify from 'slug'
import selectn from 'selectn'
import { Router } from 'express'
import sequelize from 'sequelize'
import generateUuid from 'uuid/v4'
import { mustLogin } from 'server/services/permissions'
import { Skills, Revisions, User } from 'server/data/models'
import { getRevisions } from 'server/middlewares/revisionsApi'

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
    // const revisions = await Revisions.findAll({where: {parentId: skill.id}, raw: true})

    skill.revision = revision
    skill.revisions = await getRevisions(skill.id)
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
      return res.json(await getSkill({slug})) 
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
      0) check if text is changed
      1) deactivate previous revision
      2) create new one
      3) ???
      4) PROFIT
    */
    try {

      const UserId = user.id
      const { parentId } = params
      const currentRevision = await Revisions
      .findOne({
        where: {
          parentId,
          active: true,
      }})
      const newRevisionId = generateUuid()
      // TODO: comment
      const where = { id: parentId }
      const newRevisionBody = {
        ...body,
        UserId,
        parentId,
        active: true,
        id: newRevisionId,
        // we need to set "previousId" to easily find difference after edit
        previousId: currentRevision.id
      }
      // TODO: test
      if (!body.name) return res.status(409).send({statusText: 'name can not be undefined'})
      if (currentRevision.text === body.text) {
        return res.status(409).send({statusText: 'text is the same'})      
      }
      // deactivate current revision
      await currentRevision.update({active: false})
      // create new one
      await Revisions.create(newRevisionBody)
      // update skill with new RevisionId
      // TODO: maybe i should get rid of RevisionId completely?
      await Skills.update({RevisionId: newRevisionId}, {where})
      return res.json(await getSkill(where))

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

      // check if skill already exists
      if (await Skills.findOne({where: {slug}})) {
        return res.status(409).send({statusText: 'skill already exists'})
      }

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
      console.error(error)
      res.status(500).end(error)
    }
  })