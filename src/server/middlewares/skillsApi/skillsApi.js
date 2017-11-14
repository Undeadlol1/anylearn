import slugify from 'slug'
import { Router } from 'express'
import sequelize from 'sequelize'
import generateUuid from 'uuid/v4'
import { Skills, Revisions } from 'server/data/models'
import { mustLogin } from 'server/services/permissions'

const limit = 12

export default Router()

  // get all skills
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const totalSkillss = await Skills.count()
      const offset = page ? limit * (page -1) : 0
      const totalPages = Math.ceil(totalSkillss / limit)
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
      const skill = await Skills.findOne({where: {slug}})
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // update skill
  .put('/:skillsId', mustLogin, async ({user, body, params}, res) => {
    try {
      const UserId = user.id
      const skill = await Skills.findById(params.skillsId)

      // check permissions
      if (Skills.UserId != UserId) return res.status(401).end()
      else res.json(await skill.update(body))

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

      const revision =  await Revisions.create({
                          ...body,
                          UserId,
                          active: true,
                          id: RevisionId,
                          parentId: SkillId,
                        })
      const skill = await Skills.create({...body, RevisionId, slug, UserId})

      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })