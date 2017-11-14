import slugify from 'slug'
import { Router } from 'express'
import { Votes } from 'server/data/models'
import { mustLogin } from 'server/services/permissions'

const limit = 12

export default Router()

  // get all votes
  .get('/:page?', async (req, res) => {
    try {
      const page = req.params.page
      const offset = page ? limit * (page -1) : 0
      const totalVotess = await Votes.count()
      const totalPages = Math.ceil(totalVotess / limit)
      const votes = await Votes.findAll({
        limit,
        offset,
      })
      res.json({ votes, totalPages })
    }
    catch (error) {
      console.log(error);
      res.status(500).end(error)
    }
  })

  // get single vote
  .get('/vote/:votesId', async ({params}, res) => {
    try {
      const vote = await Votes.findById(params.votesId)
      res.json(vote)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // update vote
  .put('/:votesId', mustLogin, async ({user, body, params}, res) => {
    try {
      const UserId = user.id
      const vote = await Votes.findById(params.votesId)

      // check permissions
      if (Votes.UserId != UserId) return res.status(401).end()
      else res.json(await vote.update(body))

    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })

  // create vote
  .post('/', mustLogin, async ({user, body}, res) => {
    try {
      const UserId = user.id
      const vote = await Votes.create({...body, UserId})
      res.json(vote)
    } catch (error) {
      console.log(error)
      res.status(500).end(error)
    }
  })