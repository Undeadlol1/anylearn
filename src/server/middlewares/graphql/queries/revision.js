// Dependencies.
import {
    resolver,
    defaultArgs,
    attributeFields,
} from 'graphql-sequelize'
import assign from 'lodash/assign'
import { GraphQLObjectType } from 'graphql'
import { Revisions } from '../../../data/models'
// Variables.
const description = `Revision represents change in a document.
 There can be multiple revisions but only one can be active at the time.
 Thats the one which is going to be seen by the user.`
/**
 * Graphql type representing a revision object.
 * @export
 */
export const revisionType = new GraphQLObjectType({
    description,
    name: 'revision',
    // Get fields from sequelize model.
    fields: assign(attributeFields(Revisions, { commentToDescription: true })),
})
/**
 * This is a full query interface for a revision.
 * @export
 */
export default {
    description,
    type: revisionType,
    resolve: resolver(Revisions),
    // All of the models attributes are searchable fields.
    args: assign(defaultArgs(Revisions)),
}