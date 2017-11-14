import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import users from 'server/data/fixtures/users'
import { Revisions, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        revision = "random name",
        slug = slugify(revision)

export default describe('/revisions API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        Revisions.destroy({where: { name: revision }})
    })

    it('POST revision', async function() {
        const agent = await loginUser(username, password)
        await agent.post('/api/revisions')
            .send({ name: revision })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(res) {
                return res.body.slug.should.be.equal(slug)
            })
            .catch(error => {
                console.error(error)
                throw new Error(error)
            })
    })

    it('GET revisions', function(done) {
        request(server)
            .get('/api/revisions')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.revisions.should.be.a('array')
                done()
            });
    })

    it('GET single revision', function(done) {
        user
            .get('/api/revisions/revision/' + slug )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.name.should.be.equal(revision)
                done()
            });
    })

    // TODO PUT test

    // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
        user
            .post('/api/revisions')
            .send({ name: revision })
            .expect(401, done)
    })

})