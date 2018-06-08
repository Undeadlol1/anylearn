import assign from 'lodash/assign'
import { skillType } from './skill'
import { Skills } from '../../../data/models'
import {
    resolver,
    defaultListArgs,
} from 'graphql-sequelize'
import { relay } from 'graphql-sequelize'
import {
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from 'graphql'
/**
 * "Connection" is basically a way to do pagination in graphql.
 */
const skillsConnection = relay.sequelizeConnection({
    name: 'skillsConnection', // TODO
    nodeType: skillType,
    target: Skills, // Can be an association for parent related connections or a model for "anonymous" connections
    connectionFields: {
        total: {
            type: GraphQLInt,
            resolve: ({where}) => {
                /*
                 * We return a object containing the source, edges and more as the connection result
                 * You there for need to extract source from the usual source argument
                 */
                return Skills.count({where});
            }
        }
    },
    edgeFields: {
        wasCreatedByUser: {
            type: GraphQLBoolean,
            resolve: (edge) => {
                /*
                 * We attach the connection source to edges
                 */
                return edge.node.createdBy === edge.source.id;
            }
        }
    }
});

export default {
    // type: new GraphQLList(skillType),
    description: 'List of skills.',
    type: skillsConnection.connectionType,
    args: skillsConnection.connectionArgs,
    resolve: skillsConnection.resolve,
    // // Selector and pagination arguments.
    // // https://github.com/mickhansen/graphql-sequelize#defaultlistargs
    // args: assign(defaultListArgs()),
    // resolve: resolver(Skills),
}