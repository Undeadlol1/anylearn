import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { Skills, Revisions, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   agent = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        name = "random name",
        slug = slugify(name)

export default describe('/revisions API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    // after(function() {
    //     Revisions.destroy({where: { name }})
    // })

    it('GET revisions', async function() {
        const skill =   await Skills.findOne({
                            where: {},
                            order: 'rand()',
                        })
        console.log('skill: ', skill);
        await agent
            .get('/api/revisions/123', )
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(res) {
                console.log('res: ', res.body);
                res.body.totalPages.should.eq(1)
                res.body.currentPage.should.eq(1)
                res.body.values.length.should.eq(0)
                res.body.values.should.be.a('array')
            })
            .catch(error => {throw new Error(error)})
    })

    // it('POST revision', async function() {
    //     const agent = await loginUser(username, password)
    //     await agent.post('/api/revisions')
    //         .send({ name: revision })
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

    // it('GET single revision', function(done) {
    //     user
    //         .get('/api/revisions/revision/' + slug )
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             res.body.name.should.be.equal(revision)
    //             done()
    //         });
    // })

    // // TODO PUT test

    // // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    // it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
    //     user
    //         .post('/api/revisions')
    //         .send({ name: revision })
    //         .expect(401, done)
    // })

})