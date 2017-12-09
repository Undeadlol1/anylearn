import slugify from 'slug'
import { Router } from 'express'
import { Revisions } from 'server/data/models'
import { mustLogin } from 'server/services/permissions'

const limit = 10

export async function getRevisions(parentId, page) {
  const offset = page ? limit * (page -1) : 0
  const totalRevisionss = await Revisions.count({where: {parentId}})
  const totalPages = Math.ceil(totalRevisionss / limit) || 1
  const currentPage = Number(page) || 1

  const values = await Revisions.findAll({
    limit,
    offset,
    where: {parentId},
  })
  return { values, totalPages, currentPage }
}

export default Router()

  // get all revisions
  .get('/:parentId/:page?', async (req, res) => {
    try {
      const {page, parentId} = req.params
      res.json(await getRevisions(parentId, page))
      // const {page, parentId} = req.params
      // const offset = page ? limit * (page -1) : 0
      // const totalRevisionss = await Revisions.count({where: {parentId}})
      // const totalPages = Math.ceil(totalRevisionss / limit) || 1
      // const currentPage = Number(page) || 1

      // const values = await Revisions.findAll({
      //   limit,
      //   offset,
      //   where: {parentId},
      // })
      // res.json({ values, totalPages, currentPage })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single revision
  .get('/revision/:revisionsId', async ({params}, res) => {
    try {
      const revision = await Revisions.findById(params.revisionsId)
      const previousRevision = await Revisions.findById(revision.previousId)
      revision.dataValues.previousRevision = previousRevision
      res.json(revision)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // update revision
  .put('/:revisionsId', mustLogin, async ({user, body, params}, res) => {
    try {
      const UserId = user.id
      const revision = await Revisions.findById(params.revisionsId)

      // check permissions
      if (Revisions.UserId != UserId) return res.status(401).end()
      else res.json(await revision.update(body))

    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // create revision
  .post('/', mustLogin, async ({user, body}, res) => {
    try {
      if (!body.previousId) throw new Error('previousId can\'t be null')
      const UserId = user.id
      const revision = await Revisions.create({...body, UserId})
      res.json(revision)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })