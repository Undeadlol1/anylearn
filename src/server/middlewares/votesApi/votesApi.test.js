import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { Votes, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        vote = "random name",
        slug = slugify(vote)

export default describe('/votes API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        Votes.destroy({where: { name: vote }})
    })

    // it('POST vote', async function() {
    //     const agent = await loginUser(username, password)
    //     await agent.post('/api/votes')
    //         .send({ name: vote })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then(function(res) {
    //             return res.body.slug.should.be.equal(slug)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //             throw new Error(error)
    //         })
    // })

    // it('GET votes', function(done) {
    //     request(server)
    //         .get('/api/votes')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.votes.should.be.a('array')
    //             done()
    //         });
    // })

    // it('GET single vote', function(done) {
    //     user
    //         .get('/api/votes/vote/' + slug )
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.name.should.be.equal(vote)
    //             done()
    //         });
    // })

    // // TODO PUT test

    // // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    // it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
    //     user
    //         .post('/api/votes')
    //         .send({ name: vote })
    //         .expect(401, done)
    // })

})