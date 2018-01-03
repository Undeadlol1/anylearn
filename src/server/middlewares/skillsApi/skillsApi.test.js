import 'babel-polyfill'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import assertArrays from 'chai-arrays'
import chai, { assert, expect } from 'chai'
import users from 'server/data/fixtures/users'
import { loginUser } from 'server/test/middlewares/authApi.test'
import { Skills, Revisions, User, Local } from 'server/data/models'
chai.use(assertArrays);
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        name = "random name 1234 ;;;",
        slug = slugify(name),
        image = '/some.jpg',
        text  = JSON.stringify({
            stage0: '',
            stage1: '',
            stage2: '',
            stage3: '',
        })

/**
 * @param {object} body request body
 * @param {string} skillId route param
 * @param {number} status response status code
 */
async function makePutRequest(body, skillId, status) {
    const username = users[1].username
    const password = users[1].password
    const agent = await loginUser(username, password)
    const skill = await Skills.findOne({order: 'rand()'})
    return await agent
        .put('/api/skills/' + skillId )
        .send(body)
        .expect('Content-Type', /json/)
        .expect(status)
        .then(res => res.body)
}

export default describe('/skills API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()
    })


    describe('GET skills', function() {

        it('without "page" param', function(done) {
            request(server)
                .get('/api/skills/')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    const { body } = res
                    if (err) return done(err)
                    body.values.should.be.a('array')
                    body.values.should.have.length(1)
                    body.totalPages.should.equal(1)
                    body.currentPage.should.equal(1)
                    done()
                })
        })

        it('with "page" params', function(done) {
            request(server)
                .get('/api/skills/' + 2)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    const { body } = res
                    if (err) return done(err)
                    body.values.should.be.a('array')
                    body.values.should.have.length(0)
                    body.totalPages.should.equal(1)
                    body.currentPage.should.equal(2)
                    done()
                })
        })

    })


    it('POST skill', async function() {
        const user =    await User
                            .findOne({
                                raw: true,
                                nest: true,
                                include: [{
                                    model: Local,
                                    where: {username},
                                }],
                            })
        const agent =   await loginUser(username, password)
        const skill =   await agent
                            .post('/api/skills')
                            .send({text, name, image})
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((res) => res.body)
        const revision = await Revisions.findById(skill.RevisionId)
        // skill structure
        skill.slug.should.be.equal(slug)
        skill.name.should.be.equal(name)
        skill.UserId.should.be.equal(user.id)
        skill.RevisionId.should.be.equal(revision.id)
        // revision structure
        assert(revision.active)
        assert(!revision.previousId)
        revision.text.should.be.equal(text)
        revision.UserId.should.be.equal(user.id)
        revision.parentId.should.be.equal(skill.id)
        revision.name.should.be.equal('initial_revision')
    })

    it('POST skill fails if data already exists', async function() {
        const agent = await loginUser(username, password)
        await agent
            .post('/api/skills')
            .send({text, name, image})
            .expect('Content-Type', /json/)
            .expect(409)
            .then(({body}) => {
                expect(body).to.deep.eq({statusText: 'skill already exists'})
            })
    })

    it('GET single skill', async function() {
        return user
        .get('/api/skills/skill/' + slug )
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
            const { body, body: {revisions, revision} } = res
            body.name.should.be.equal(name)
            body.slug.should.be.equal(slug)
            revision.id.should.be.an('string')
            // TODO comment
            revisions.totalPages.should.eq(1)
            revisions.currentPage.should.eq(1)
            revisions.values.should.be.an('array')
            revisions.values.should.be.sorted(
                (prev, next) => prev.createdAt < next.createdAt
            )
        })
    })

    it('PUT skill', async function() {
        const username = users[1].username
        const password = users[1].password
        const revisioName = 'Edititng test'
        const user =    await User
                            .findOne({
                                include: [{
                                    model: Local,
                                    where: {username},
                                }],
                                raw: true,
                                nest: true,
                            })        
        const newText = JSON.stringify({
            stage0: 'one',
            stage1: 'two',
            stage2: 'three',
            stage3: 'four',
        })
        const skill =   await Skills.findOne({order: 'rand()'})        
        const res   =   await makePutRequest({
                            image: "",
                            text: newText,
                            description: "",
                            name: revisioName,
                        }, skill.id, 200)
        const oldRevision = await Revisions.findById(skill.RevisionId)
        const newRevision = await Revisions.findById(res.RevisionId)
        // there must only one "active" revision
        Revisions
        .findAll({where: {
            active: true,
            parentId: skill.id,
        }})
        .then(activeRevisions => {
            activeRevisions.should.have.length(1)
            activeRevisions[0].id.should.not.eq(oldRevision.id)
        })
        // there must be two revisions now
        Revisions
        .findAll({where: {parentId: skill.id}})
        .then(revisions => revisions.should.have.length(2))

        const { revision, revisions } = res
        // TODO: delete Skills.RevisionId (make migration and delete from code)
        // res.RevisionId.should.be.equal(newRevision.id)
        /* skill structure */
        res.id.should.be.eq(skill.id)
        res.name.should.be.eq(skill.name)
        // UserId must not change
        skill.UserId.should.be.eq(skill.UserId)
        /* revision structure */
        assert(revision.active)
        revision.text.should.be.eq(newText)
        revision.UserId.should.be.eq(user.id)
        revision.name.should.be.eq(revisioName)
        revision.id.should.be.eq(newRevision.id)
        revision.parentId.should.be.eq(skill.id)
        revision.User.id.should.eq(revision.UserId)
        // we need to set "previousId" to easily find difference after edit
        revision.previousId.should.eq(oldRevision.id)
        /* revisions structure */
        revisions.totalPages.should.eq(1)
        revisions.currentPage.should.eq(1)
        revisions.values.should.be.an('array')
        revisions.values.should.have.length(2)
        revisions.values.map(rev => rev.parentId.should.eq(skill.id))
    })

    it('fail to PUT if text is not changed', async function() {
        const skill = await Skills.findOne({order: 'rand()'})
        const oldRevision = await Revisions.findById(skill.RevisionId)        
        await makePutRequest({
            name: 'new revision',
            text: oldRevision.text,
        }, skill.id, 409)
        .then(({statusText}) => assert(statusText, 'text is the same'))
    })

    it('fail to POST if not authorized', async function() {
        await user.post('/api/skills').send({}).expect(401)
    })

    it('fail to PUT if not authorized', async function() {
        await user.put('/api/skills/randomId').send({}).expect(401)
    })

})