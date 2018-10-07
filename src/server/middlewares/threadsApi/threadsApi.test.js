import 'babel-polyfill'
import slugify from 'slug'
import request from 'supertest'
import Promise from 'bluebird'
import server from 'server/server'
import generateUuid from 'uuid/v4'
import chai, {expect, assert} from 'chai'
import users from 'server/data/fixtures/users'
import { Threads, Forums, User } from 'server/data/models'
import { loginUser } from 'server/test/middlewares/authApi.test'
chai.should()
chai.use(require('chai-properties'))
// Prepare constants.
const   agent = request(server),
        username = users[0].username,
        password = users[0].password,
        name = "random name",
        text = "some text",
        slug = slugify(name),
        forumId = generateUuid() // random id

export default describe('/threads API', function() {
    // Kill supertest server in watch mode to avoid errors.
    before(async () => await server.close())
    // Clean up.
    after(async () => await Threads.destroy({where: { parentId: forumId }}))
    /**
     * POST test is intentionally first one.
     * Rest of the tests depend on created thread.
     */
    it('POST thread', async function() {
        const user = await loginUser(username, password)
        const differentId = generateUuid()
        await user
            .post('/api/threads')
            .send({
                name,
                text,
                id: differentId,
                parentId: forumId,
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async ({body}) => {
                // check response fields
                body.should.have.properties({
                    name,
                    slug,
                    parentId: forumId
                })
                // POST body must not override default properties.
                body.id.should.not.eq(differentId)
            })
            .catch(error => { throw error})
    })
    /**
     * GET must return paginated response.
     */
    it('GET threads', async function() {
        await agent
            .get('/api/threads/' + forumId)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(({body}) => {
                body.totalPages.should.eq(1)
                body.currentPage.should.eq(1)
                body.values.should.be.a('array')
                body.values.should.have.length(1)
            })
    })
    /**
     * Make sure endpoint responses with proper
     * thread object on singular GET request.
     */
    it('GET single thread', async () => {
        await agent
            .get('/api/threads/thread/' + slug )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                res.body.name.should.be.equal(name)
                // includes user object
                res.body.User.id.should.be.defined
            })
    })
    /**
     * Test updating of thread.
     * Only the owner of a thread can update it.
     * Make sure user cannot update "id" of a thread.
     */
    it('PUT thread', async function() {
        const oldThread = await Threads.findOne({where: {parentId: forumId}})
        const user = await loginUser(username, password)
        const newText = 'some new name'
        const newId = generateUuid()
        await user
            .put('/api/threads/' + oldThread.id)
            .send({id: newId, text: newText})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async ({body}) => {
                const updatedThread = await Threads.findById(oldThread.id)
                // make sure response has updated document
                body.id.should.eq(updatedThread.id)
                // make sure user cannot update "id" property
                // NOTE: move this to a different test?
                body.id.should.not.eq(newId)
                // make sure response contains updated data
                body.text.should.eq(updatedThread.text)
                // make sure document is updated in database
                expect(updatedThread).to.have.property("text", newText)
                expect(updatedThread).to.not.have.property("id", newId)
            })
            .catch(error => {throw error})
    })
    /*
        FAILURE TESTS
        (The error messages and test names are self - explanatory)
    */
    describe('fails to PUT if', () => {
        it('id was not provided', async () => await agent.put('/api/threads').expect(404))
        it('user is not logged in', async () => await agent.put('/api/threads/id').expect(401))
        it('user is diffrent', async () => {
            const thread = await Threads.findOne({where: {parentId: forumId}})
            const user = await loginUser(users[1].username, users[1].password)
            await user.put('/api/threads/' + thread.id).send({name, text}).expect(403)
        })
        it('thread does not exist', async () => {
            const user = await loginUser(username, password)
            await user
                .put('/api/threads/' + generateUuid()) // <- proper but non existing document ID
                .send({name, text}) // proper payload
                .expect(204) // 'No Content' status code
        })
        // Run PUT requests with different values and make sure there is a proper error message for it.
        it('property validation failed', async () => {
            const user = await loginUser(username, password)
            await Promise.each(
                [
                    { property: 'text', value: undefined, error: 'Is required' },
                    { property: 'text', value: '', error: 'Text should be atleast 5 characters long' },
                    { property: 'text', value: ' ', error: 'Text should be atleast 5 characters long' },
                ],
                async ({ property, value, error }) => {
                    return await user
                        .put('/api/threads/' + generateUuid())
                        .send({ [property]: value })
                        .expect(422)
                        .expect('Content-Type', /json/)
                        .then(({ body }) => expect(body.errors[property].msg).to.eq(error))
                        .catch(error => { throw error })
                }
            )
        })
    })

    describe('fails to POST if', () => {
        // Only logged in users can create threads.
        it('if user is logged in', async () => await agent.post('/api/threads').expect(401))
        // Run POST requests with different values and make sure there is a proper error message for it.
        it('property validation failed', async () => {
            const user = await loginUser(username, password)
            await Promise.each(
                [
                    { property: 'name', value: undefined, error: 'Name is required' },
                    { property: 'name', value: '', error: 'Name must be between 5 and 100 characters long' },
                    { property: 'name', value: ' ', error: 'Name must be between 5 and 100 characters long' },
                    { property: 'text', value: undefined, error: 'Text is required' },
                    { property: 'text', value: '', error: 'Text should be atleast 5 characters long' },
                    { property: 'text', value: ' ', error: 'Text should be atleast 5 characters long' },
                    { property: 'parentId', value: undefined, error: 'Parent id is required' },
                    { property: 'parentId', value: '', error: 'Parent id is not valid UUID' },
                    { property: 'parentId', value: ' ', error: 'Parent id is not valid UUID' }
                ],
                async ({ property, value, error }) => {
                    return await user
                        .post('/api/threads')
                        .send({ [property]: value })
                        .expect(422)
                        .expect('Content-Type', /json/)
                        .then(({ body }) => {
                            expect(body.errors[property].msg).to.eq(error)
                        })
                        .catch(error => { throw error })
                }
            )
        })
    })
})