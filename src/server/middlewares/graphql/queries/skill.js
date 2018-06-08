import {
    resolver,
    defaultArgs,
    attributeFields,
    defaultListArgs,
} from 'graphql-sequelize'
import assign from 'lodash/assign'
import { revisionType } from './revision'
import { GraphQLObjectType, GraphQLList } from 'graphql'
import { Skills, Revisions } from '../../../data/models'

const description = "Skill works in a similar way as an article in wikipedia."
/**
 * Graphql type representing a skill object.
 * @export
 */
export const skillType = new GraphQLObjectType({
    description,
    name: 'skill',
    fields: assign(
        // Get fields from sequelize model.
        attributeFields(Skills, {
            // Comments in model definition > graphql descriptions.
            commentToDescription: true,
        }),
        // Add extra fields.
        {
            revision: {
                type: revisionType,
                description: 'Current active revision document.',
                async resolve(skill, args) {
                    try {
                        // TODO: refactor to "skill.getRevision()"
                        return await Revisions.findOne({
                            where: {
                                active: true,
                                parentId: skill && skill.id,
                            },
                        })
                    } catch (err) {
                        throw err.message
                    }
                },
            },
            revisions: {
                description: 'Revisions of this skill.',
                args: defaultListArgs(Revisions),
                type: new GraphQLList(revisionType),
                resolve: resolver(Skills.hasMany(Revisions, {
                    sourceKey: 'id',
                    foreignKey: 'parentId',
                })),
            },
        },
    ),
})
/**
 * This is a full query interface for a Skill.
 * @export
 */
export default {
    description,
    type: skillType,
    resolve: resolver(Skills),
    // All of the models attributes are searchable fields.
    args: assign(defaultArgs(Skills)),
}