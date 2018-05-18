import { GraphQLObjectType } from 'graphql'
import {
    resolver,
    attributeFields,
    defaultArgs as attributesToArgs,
} from 'graphql-sequelize'
import assign from 'lodash/assign'
import { Skills } from '../../../data/models'

const description = "Skill works in a similar way as article in wikipedia."

const skillType = new GraphQLObjectType({
    description,
    name: 'skill',
    // Get fields from sequelize model.
    fields: assign(attributeFields(Skills, { commentToDescription: true })),
})
/**
 * Graphql type representing a skill object.
 * @export
 */
export { skillType }
/**
 * This is a full query interface for a Skill.
 * @export
 */
export default {
    description,
    type: skillType,
    resolve: resolver(Skills),
    // All of the models attributes are searchable fields.
    args: assign(attributesToArgs(Skills)),
}