import UUID from 'uuid/v4'
import slugify from 'slug'
import { expect } from 'chai'
import schema from '../index'
import { graphql } from 'graphql'
import chai, { assert } from 'chai'
import { Skills, Revisions } from '../../../data/models'
chai.use(require('chai-properties'))

const SkillId = UUID()
const RevisionId = UUID()
const name = 'Random name'

describe('Skills query', async () => {
    // Create skill and revision before running tests.
    before(async () => {
        await Revisions.create({
            id: RevisionId,
            active: true,
            UserId: 2323,
            name: 'Some name',
            parentId: SkillId,
            text: 'some text',
        })
        await Skills.create({
            name,
            RevisionId,
            id: SkillId,
            UserId: 2323,
            slug: slugify(name),
        })
    })
    // Clean up.
    after(async () => {
        await Skills.destroy({where: {id: SkillId}})
        await Revisions.destroy({where: {id: RevisionId}})
    })
    // Run query.
    it('is successful.', async () => {
        const query = `{
            skill(id: "${SkillId}") {
                id
                UserId
                revision {
                    active
                    parentId
                }
            }
        }`
        // Run query.
        const response = await graphql(schema, query)
        const { data: { skill }} = response
        // Verify results.
        assert.ok(skill, 'Skill was not found.');
        assert.equal(skill.id, SkillId, 'Wrong skill were returned.');
        // "Skill" object must include "revision" document.
        expect(skill.revision).to.have.properties(
            {
                // Make sure right revision is found.
                parentId: SkillId,
                // Included revision must be active.
                active: true,
            },
        )
    })
})