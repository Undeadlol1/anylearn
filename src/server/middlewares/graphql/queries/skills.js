import assign from 'lodash/assign'
import { skillType } from './skill'
import { GraphQLList } from 'graphql'
import { Skills } from '../../../data/models'
import {
    resolver,
    defaultListArgs,
} from 'graphql-sequelize'

export default {
    type: new GraphQLList(skillType),
    description: 'List of skills.',
    // Selector and pagination arguments.
    // https://github.com/mickhansen/graphql-sequelize#defaultlistargs
    args: assign(defaultListArgs()),
    resolve: resolver(Skills),
}