import 'babel-polyfill'
import chai from 'chai'
import slugify from 'slug'
import request from 'supertest'
import server from 'src/server'
import users from 'src/server/data/fixtures/users'
import { SkilllsApi, User } from 'src/server/data/models'
import { loginUser } from 'src/server/test/middlewares/authApi.test'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        skilllsSkilllsApi = "random name",
        slug = slugify(skilllsSkilllsApi)

export default describe('/skilllsApis API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    // clean up
    after(function() {
        SkilllsApi.destroy({where: { name: skilllsSkilllsApi }})
    })

    it('POST skilllsApi', async function() {
        const agent = await loginUser(username, password)
        await agent.post('/api/skilllsApis')
            .send({ name: skilllsSkilllsApi })
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

    it('GET skilllsApis', function(done) {
        request(server)
            .get('/api/skilllsApis')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.skilllsApis.should.be.a('array')
                done()
            });
    })

    it('GET single skilllsApi', function(done) {
        user
            .get('/api/skilllsApis/skilllsApi/' + slug )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.name.should.be.equal(skilllsSkilllsApi)
                done()
            });
    })

    it('GET /search skilllsApis', function(done) {
        user
            .get('/api/skilllsApis/search/' + 'something' )
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.skilllsApis.should.be.a('array')
                done()
            });
    })
    // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
        user
            .post('/api/skilllsApis')
            .send({ name: skilllsSkilllsApi })
            .expect(401, done)
    })

})