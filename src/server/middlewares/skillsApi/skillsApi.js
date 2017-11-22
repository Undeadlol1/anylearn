import slugify from 'slug'
import { Router } from 'express'
import sequelize from 'sequelize'
import generateUuid from 'uuid/v4'
import { Skills, Revisions } from 'server/data/models'
import { mustLogin } from 'server/services/permissions'
import { error } from 'util';

const limit = 12

export default Router()

  // get all skills
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const totalSkills = await Skills.count()
      const offset = page ? limit * (page -1) : 0
      const totalPages = Math.ceil(totalSkills / limit)
      const skills = await Skills.findAll({limit, offset})
      res.json({ skills, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single skill
  .get('/skill/:slug', async ({params}, res) => {
    try {
      const slug = params && params.slug
      console.log('slug: ', slug);
      const skill = await Skills.findOne({where: {slug}})
      // console.log('skill: before', skill);
      const revision = await Revisions.findOne({
        where: {
          active: true,
          parentId: skill.id,
        }
      })
      const revisions = await Revisions.findAll({where: {parentId: skill.id}})
      console.log('revisions.length: ', revisions.length);
      console.log('revisions: ', revisions);
      skill.dataValues.revision = revision && revision.dataValues
      skill.dataValues.revisions = revisions && revisions
      // console.log('skill.dataValues.revisions.length: ', skill.dataValues.revisions.length);
      // console.log('skill.dataValues: ', skill.dataValues);
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // update skill
  .put('/:parentId', mustLogin, async ({user, body, params}, res) => {
    /*
      1) deactivate previous revision
      2) create new one
      3) ???
      4) PROFIT
    */
    try {
      const UserId = user.id
      const { parentId } = params
      await Revisions.update(
        { active: false },
        {
          where: {
            parentId,
            active: true,
          }
        }
      )
      const revision = await Revisions.create({
        ...body,
        UserId,
        parentId,
        active: true,
      })
      console.log('revision: ', revision);
      const skill = await Skills.findById(parentId)
      skill.dataValues.revision = revision.dataValues

      res.json(skill)

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

      const response  = await Revisions
                          .create({
                            ...body,
                            UserId,
                            active: true,
                            id: RevisionId,
                            parentId: SkillId,
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

      res.json(response)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })