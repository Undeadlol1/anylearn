import { mustLogin } from 'server/services/permissions'
import { SkilllsApi } from 'server/data/models'
import express from 'express'
import slugify from 'slug'

// routes
const router = express.Router()
const limit = 12

router

  // get all skills for index page
  .get('/:page?', async (req, res) => { // TODO make sure pagination works right
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalSkilllsApis = await SkilllsApi.count()
      const totalPages = Math.ceil(totalSkilllsApis / limit)
      const skills = await SkilllsApi.findAll({
        limit,
        offset,
        order: 'rand()',
      })
      res.json({ skills, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single skill by slug or name
  .get('/skill/:slug?', async ({params, query}, res) => {
    try {
      const slug = params.slug
      const name = query.name
      const skill = await SkilllsApi.findOne({
        where: {
          $or: [{slug}, {name}]
        }
      })
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // search for skill
  .get('/search/:name/:page?', async (req, res) => { // TODO make sure pagination works right
    try {
      const { page, name } = req.params
      if (!name) return res.boom.badRequest('invalid query')
      const offset = page ? limit * (page -1) : 0
      const where = {
                      name: { $like: '%' + name + '%' }
                    }
      const totalSkilllsApis = await SkilllsApi.count({ where })
      const totalPages = Math.round(totalSkilllsApis / limit)
      const skills = await SkilllsApi.findAll({
        limit,
        offset,
        where,
      }) || []
      res.json({ skills, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // create skill
  .post('/', mustLogin, async ({user, body: { name }}, res) => {
    try {
      const UserId = user.id
      const slug = slugify(name)
      const skill = await SkilllsApi.create({ UserId, name, slug }) // TODO move this in model definition?
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // create skill
  .post('/', mustLogin, async ({user, body: { name }}, res) => {
    try {
      const UserId = user.id
      const slug = slugify(name)
      const skill = await SkilllsApi.create({ UserId, name, slug }) // TODO move this in model definition?
      res.json(skill)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

export default router