import { mustLogin } from 'server/services/permissions'
import { RevisionsApi } from 'server/data/models'
import express from 'express'
import slugify from 'slug'

// routes
const router = express.Router()
const limit = 12

router

  // get all revisionsApis for index page
  .get('/:page?', async (req, res) => { // TODO make sure pagination works right
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalRevisionsApis = await RevisionsApi.count()
      const totalPages = Math.ceil(totalRevisionsApis / limit)
      const revisionsApis = await RevisionsApi.findAll({
        limit,
        offset,
        order: 'rand()',
      })
      res.json({ revisionsApis, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single revisionsApi by slug or name
  .get('/revisionsApi/:slug?', async ({params, query}, res) => {
    try {
      const slug = params.slug
      const name = query.name
      const revisionsApi = await RevisionsApi.findOne({
        where: {
          $or: [{slug}, {name}]
        }
      })
      res.json(revisionsApi)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // search for revisionsApi
  .get('/search/:name/:page?', async (req, res) => { // TODO make sure pagination works right
    try {
      const { page, name } = req.params
      if (!name) return res.boom.badRequest('invalid query')
      const offset = page ? limit * (page -1) : 0
      const where = {
                      name: { $like: '%' + name + '%' }
                    }
      const totalRevisionsApis = await RevisionsApi.count({ where })
      const totalPages = Math.round(totalRevisionsApis / limit)
      const revisionsApis = await RevisionsApi.findAll({
        limit,
        offset,
        where,
      }) || []
      res.json({ revisionsApis, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // create revisionsApi
  .post('/', mustLogin, async ({user, body: { name }}, res) => {
    try {
      const UserId = user.id
      const slug = slugify(name)
      const revisionsApi = await RevisionsApi.create({ UserId, name, slug }) // TODO move this in model definition?
      res.json(revisionsApi)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // create revisionsApi
  .post('/', mustLogin, async ({user, body: { name }}, res) => {
    try {
      const UserId = user.id
      const slug = slugify(name)
      const revisionsApi = await RevisionsApi.create({ UserId, name, slug }) // TODO move this in model definition?
      res.json(revisionsApi)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

export default router