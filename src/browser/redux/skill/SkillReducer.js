import isEmpty from 'lodash/isEmpty'
import { Map, List, fromJS } from 'immutable'
import { emptyUserObject } from 'browser/redux/reducers/UserReducer'
const revisionStructure = 	Map({
								id: '',
								name: '',
								text: '',
								description: '',
								UserId: '',
								active: '',
								image: '',
								parentId: '',
								previousId: '',
								rating: '',
								User: emptyUserObject,
								previousRevision: Map({}),
							})

const skillStructure = 	Map({
							id: '',
							name: '',
							slug: '',
							image: '',
							UserId: '',
							rating: '',
							RevisionId: '',
							revisions: List(),
							revision: revisionStructure,
						})

export const initialState = Map({
							error: '',
							skills: List(),
							loading: false,
							dialogIsOpen: false,
							...skillStructure.toJS()
						})

export default (state = initialState, {type, payload}) => {
	switch(type) {
		case 'RECIEVE_SKILL':
			return state
				.merge(payload)
				.merge({loading: false})
		case 'RECIEVE_SKILLS':
		return state
				.mergeDeep({
					// TODO: 'values' instead of 'skills'
					skills: payload.skills,
					loading: false,
				})
		case 'TOGGLE_DIALOG':
			return state.set('dialogIsOpen', !state.get('dialogIsOpen'))
		case 'UNLOAD_SKILL':
			return state
				.merge(skillStructure)
				.merge({skills: List()})
				.mergeDeep({loading: false,})
		// remove skill from skills list
		// case 'REMOVE_SKILL':
		// 	return state
		// 		.merge({
		// 			skills: state
		// 					.get('skills')
		// 					.filter(skill => skill.get('id') !== payload)
		// 		})
		default:
			return state
	}
}