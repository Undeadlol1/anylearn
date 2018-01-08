import 'babel-polyfill'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import generateUuid from 'uuid/v4'
import chai, { expect } from 'chai'
import users from 'server/data/fixtures/users'
import { Skills, Revisions, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.use(require('chai-properties'));
chai.should();

const   agent = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        name = "random name",
        slug = slugify(name),
        revisionsApi = '/api/revisions/'

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
        await agent
            .get('/api/revisions/123', )
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(res) {
                const { values, totalPages, currentPage } = res.body
                totalPages.should.eq(1)
                currentPage.should.eq(1)
                values.length.should.eq(0)
                values.should.be.a('array')
                // TODO: sorting tests
            })
            .catch(error => {throw new Error(ererror)})
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

    it('GET single revision', async function() {
        const user = await User.findOne({order: 'rand()'})
        const props = {
            name: 'd',
            text: 't',
            active: 1,
            image: null,
            UserId: user.id,
            parentId: 'penis',
            description: 'sde',
            id: generateUuid(),
        }

        await Revisions.create(props)
        await agent
        .get( '/api/revisions/revision/' + props.id )
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({body}) => {
            body.should.have.properties({
                ...props,
                previousRevision: null,
                User: {id: user.id}
            })
        })

    })

    // // TODO PUT test

    // // TODO create test for "mustLogin" function and this kind of tests will be obsolete
    // it('fail to POST if not authorized', function(done) { // TODO move this to previous function?
    //     user
    //         .post('/api/revisions')
    //         .send({ name: revision })
    //         .expect(401, done)
    // })

})