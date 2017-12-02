import 'babel-polyfill'
import slugify from 'slug'
import request from 'supertest'
import server from 'server/server'
import chai, { assert, expect } from 'chai'
import users from 'server/data/fixtures/users'
import { loginUser } from 'server/test/middlewares/authApi.test'
import { Skills, Revisions, User, Local } from 'server/data/models'
chai.should();

const   user = request.agent(server),
        username = users[0].username,
        password = users[0].password,
        name = "random name",
        slug = slugify(name),
        image = '/some.jpg',
        text  = JSON.stringify({
            stage0: '',
            stage1: '',
            stage2: '',
            stage3: '',
        })

export default describe('/skills API', function() {

    before(async function() {
        // TODO add logout? to test proper user login?
        // Kill supertest server in watch mode to avoid errors
        server.close()

    })

    it('POST skill', async function() {
        const user =    await User
                            .findOne({
                                include: [{
                                    model: Local,
                                    where: {username},
                                }],
                                raw: true,
                                nest: true,
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


    it('GET skills', function(done) {
        request(server)
            .get('/api/skills')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                const { body } = res
                if (err) return done(err)
                body.skills.should.be.a('array')
                body.totalPages.should.equal(1)
                done()
            })
    })


    it('GET single skill', async function() {
        return user
        .get('/api/skills/skill/' + slug )
        .expect('Content-Type', /json/)
        .expect(200)
        .then(function(res) {
            const { body } = res
            body.name.should.be.equal(name)
            body.slug.should.be.equal(slug)
            body.revisions.should.be.an('array')
            body.revision.id.should.be.an('string')
        })
    })

    // // TODO PUT test
    it('PUT skill', async function() {
        const username = users[1].username
        const password = users[1].password
        const user =    await User
                            .findOne({
                                include: [{
                                    model: Local,
                                    where: {username},
                                }],
                                raw: true,
                                nest: true,
                            })
        const agent =   await loginUser(username, password)
        const skill =   await Skills.findOne({order: 'rand()'})
        const newText = JSON.stringify({
            stage0: 'one',
            stage1: 'two',
            stage2: 'three',
            stage3: 'four',
        })
        const revisioName = 'Edititng test'
        const res   =   await agent
                            .put('/api/skills/' + skill.id )
                            .send({
                                image: "",
                                text: newText,
                                description: "",
                                name: revisioName,
                            })
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((res) => res.body)
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
        res.id.should.be.equal(skill.id)
        // TODO: delete Skills.RevisionId (make migration and delete from code)
        // res.RevisionId.should.be.equal(newRevision.id)
        /* skill structure */
        skill.id.should.be.eq(skill.id)
        skill.name.should.be.eq(skill.name)
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
        revisions.should.be.an('array')
        revisions.should.have.length(2)
        revisions.map(rev => rev.parentId.should.eq(skill.id))
    })

    it('fail to POST if not authorized', async function() {
        await user.post('/api/skills').send({}).expect(401)
    })

    it('fail to PUT if not authorized', async function() {
        await user.put('/api/skills/randomId').send({}).expect(401)
    })

})