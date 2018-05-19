import isEmpty from 'lodash/isEmpty'
import { Map, List, fromJS } from 'immutable'
import { emptyUserObject } from 'browser/redux/reducers/UserReducer'

const revisionStructure = 	{
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
								previousRevision: {},
							}

const skillStructure = 	{
							id: '',
							name: '',
							slug: '',
							image: '',
							UserId: '',
							rating: '',
							RevisionId: '',
							revisions: {
								totalPages: 0,
								currentPage: 0,
								values:  [],
							},
							revision: revisionStructure,
						}

export const initialState = fromJS({
							error: '',
							skills: {
								totalPages: 0,
								currentPage: 0,
								values:  [],
							},
							threads: {
								totalPages: 0,
								currentPage: 0,
								values:  [],
							},
							currentTab: 0,
							loading: false,
							dialogIsOpen: false,
							...skillStructure,
						})

export default (state = initialState, {type, payload}) => {
	switch(type) {
		case 'RECIEVE_SKILL':
			return state
				.merge(payload)
				.merge({loading: false})
		case 'RECIEVE_SKILLS':
			return state
					.merge({
						loading: false,
						skills: payload,
					})
		case 'RECIEVE_REVISION':
			return state.mergeDeep({revision: payload})
		// initial revisions are recieved in 'skill' object,
		// later data is used for pagination change
		case 'RECIEVE_REVISIONS':
			return state.merge({revisions: payload})
		case 'RECIEVE_QUESTIONS':
			return state.merge({threads: payload})
		case 'TOGGLE_DIALOG':
			return state.set('dialogIsOpen', !state.get('dialogIsOpen'))
		case 'UNLOAD_SKILL':
			return state
				.merge(skillStructure)
				// .merge({skills: List()})
				.mergeDeep({loading: false,})
		// TODO: move this to ui reducer?
		// change tab of skill tabs
		case 'CHANGE_TAB':
			return state.set('currentTab', payload)
		default:
			return state
	}
}