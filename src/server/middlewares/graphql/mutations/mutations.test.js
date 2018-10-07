import UUID from 'uuid/v4'
import { expect } from 'chai'
import schema from '../index'
import Promise from 'bluebird'
import { graphql } from 'graphql'
import chai, { assert } from 'chai'
import randomstring from 'randomstring'
import { User, Forums } from '../../../data/models'
chai.use(require('chai-properties'))
/**
 * Run tests for various mutations.
 */
describe('Mutations:', () => {
    /**
     * Prepare constants.
     */
    // Id of an ordinary, non-admin user.
    const UserId = UUID(),
            // Administrator is a user with "id" === 1.
            admin = { id: 1 },
            forumNname = 'This is a test',
            payload = { name: forumNname }
    /**
     * Destroy non-admin user after running tests.
     */
    after(async () => await User.destroy({where: {id: UserId}}))
    /**
     * Verify that "cretateForum" works properly.
     */
    describe('createForum returns', () => {
        // Prevent unlogged users to create forums.
        it('error if user is not logged in.', async () => {
            // Run query and get results.
            const { data, errors } = await createForumRequest({})
            expect(data.forum).to.be.null
            expect(errors).to.have.length(1)
            expect(errors[0].message).to.equal('You must be logged in to do this.')
        })
        // Only administrators can create forums.
        it('error if user is not an admin.', async () => {
            // Run query with ordinary user in context.
            const { data, errors } = await createForumRequest({id: UserId})
            expect(data.forum).to.be.null
            expect(errors).to.have.length(1)
            expect(errors[0].message).to.equal('You must be an admin to do this.')
        })
        // Verify that mutation returns created forum if everything is all right.
        it('created document.', async () => {
            // Run query and get results.
            const { data, errors } = await createForumRequest(admin)
            // Verify results.
            expect(errors).to.be.undefined
            // Make sure forum was inserted into database.
            const createdForum = await Forums.findOne({where: payload})
            expect(createdForum).to.be.a('object', 'forum should be created')
            expect(createdForum).to.have.properties(data.forum)
            // Make sure response has proper data.
            expect(data.forum).to.have.properties({
                UserId: 1,
                name: payload.name,
            })
        })
        /**
         * Input validation tests.
         */
        describe('error if', () => {
            // Run queries with different values and make sure there is a proper error message for it.
            it('argument validation failed', async () => {
                await Promise.each(
                    [
                        // Make sure duplicate forums cannot be created.
                        { value: forumNname, message: 'Forum already exists.' },
                        { value: undefined, message: 'Name is required.' },
                        { value: '', message: 'Name is required.' },
                        { value: ' ', message: 'Name is required.'},
                        // Make sure repeated whitespace is ignored.
                        { value: '  12    3    ', message: 'Name must be between 5 and 100 characters long.' },
                        { value: '123', message: 'Name must be between 5 and 100 characters long.' },
                        { value: randomstring.generate(101), message: 'Name must be between 5 and 100 characters long.' },
                    ],
                    async ({ value, message }) => {
                        const { errors, data } = await graphql(
                            schema,
                            `mutation {
                                forum: createForum(name: "${value}") {
                                    id
                                    name
                                    slug
                                    UserId
                                }
                            }`,
                            null,
                            { user: admin }
                        )
                        assert.isNull(data.forum, 'Forum was created.');
                        expect(errors[0].message).to.eq(message)
                    }
                )
            })
        })
    })
})
/**
 * Exectute request to create forum.
 * This function is an absctraction to make code cleaner.
 * @param {Object} user Sets currently logged in user.
 * @param {sString} name Mutation argument.
 * @returns {Promise} Graphql response.
 */
function createForumRequest(user, name = 'This is a test') {
    return graphql(
        schema,
        `mutation {
            forum: createForum(name: "${name}") {
                id
                name
                slug
                UserId
            }
        }`,
        null, {
            user
        }
    )
}