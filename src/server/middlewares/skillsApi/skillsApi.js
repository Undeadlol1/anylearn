import slugify from 'slug'
import { Router } from 'express'
import { Skills } from 'server/data/models'
import { mustLogin } from 'server/services/permissions'

const limit = 12

export default Router()

  // get all skills
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalSkillss = await Skills.count()
      const totalPages = Math.ceil(totalSkillss / limit)
      const skills = await Skills.findAll({
        limit,
        offset,
      })
      res.json({ skills, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single skill
  .get('/skill/:skillsId', async ({params}, res) => {
    try {
      const skill = await Skills.findById(params.skillsId)
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
    try {
      const UserId = user.id
      const skill = await Skills.create({...body, UserId})
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })