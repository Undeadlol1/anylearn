import slugify from 'slug'
import { Router } from 'express'
import { Threads, User } from 'server/data/models'
import validations from './threadsApi.validations'
import { createPagination } from '../../services/utils'
import { mustLogin } from 'server/services/permissions'
import { handleValidationErrors } from '../../services/errors'
import { matchedData, sanitize } from 'express-validator/filter'
/**
 * Threads work similarly to threads in a forum.
 * They are basically a container for comments.
 * This is a basic CRUD API for them.
 * @exports
 */
export default Router()
  /*
    Get single thread by slug.
  */
  .get('/thread/:slug',
    // validations
    validations.getOne,
    // handle validation errors
    handleValidationErrors,
    async (req, res) => {
      try {
        // Get sanitized data.
        const params = matchedData(req)
        // Create the thread.
        const thread = await Threads.findOne({
          raw: true,
          nest: true,
          include: [User],
          where: { slug: params.slug },
        })
        // Respond with created thread.
        res.json(thread)
      } catch (error) {
        console.log(error)
        res.status(500).end(error.message)
      }
  })
  /*
    Get threads by parentId.
    Response with paginated results.
  */
  .get('/:parentId/:page?',
    // sanitising
    sanitize(['parentId', 'page']).trim(),
    // validations
    validations.get,
    // handle validation errors
    handleValidationErrors,
    async (req, res) => {
      try {
        const params = matchedData(req)
        res.json(
          await getThreads(params.parentId, params.page)
        )
      }
      catch (error) {
        console.log(error);
        res.status(500).end(error)
      }
  })
  /*
    Update thread.
  */
  .put('/:threadsId',
    // permissions
    mustLogin,
    // sanitising
    sanitize(['threadsId', 'text']).trim(),
    // validations
    validations.put,
    // handle validation errors
    handleValidationErrors,
    // handle route
    async (req, res) => {
      try {
        // Prepare data.
        const UserId = req.user.id,
              bodyData = matchedData(req, { locations: ['body'] }),
              {threadsId} = matchedData(req, { locations: ['params'] }),
              thread = await Threads.findById(threadsId)
        // Send error if thread doesn't exist.
        if (!thread) return res.status(204).end()
        // Check permissions.
        // Only an owner can update a thread.
        if (thread.UserId != UserId) res.status(403).end()
        else res.json(await thread.update(bodyData))

      } catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
  })
  /*
    Create thread.
  */
  .post('/',
    // permissions
    mustLogin,
    // sanitising
    sanitize(['parentId', 'name', 'text']).trim(),
    // validations
    validations.post,
    // handle errors
    handleValidationErrors,
    // handle route
    async (req, res) => {
      try {
        const payload = matchedData(req)
        res.json(
          await Threads.create({
            ...payload,
            UserId: req.user.id,
            slug: slugify(payload.name),
          })
        )
      }
      catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
  })

  /**
   * Get paginated threads by parentId
   * @param {String} parentId parent UUID
   * @param {Number} [currentPage=1] page number
   * @export
   */
  export async function getThreads(parentId, currentPage = 1) {
    return await createPagination({
      limit: 12,
      model: Threads,
      page: currentPage,
      where: {
        parentId,
      },
    })
  }