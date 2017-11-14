import isEmpty from 'lodash/isEmpty'
import { Map, List } from 'immutable'

const skillStructure = 	Map({
							id: '',
							url: '',
							type: '',
							UserId: '',
							SkillId: '',
							rating: '',
							provider: '',
							contentId: '',
						})

export const initialState = Map({
							error: '',
							skills: List(),
							loading: false,
							finishedLoading: true,
							dialogIsOpen: false,
							contentNotFound: false,
							searchIsActive: false, // TODO do i need this?
							searchedVideos: List(),
							...skillStructure.toJS()
						})

export default (state = initialState, {type, payload}) => {
	switch(type) {
		// case 'FETCHING_SKILL':
		// 	return state.merge({
		// 		loading: true,
		// 		finishedLoading: false,
		// 		contentNotFound: false,
		// 	})
		case 'RECIEVE_SKILL':
			return state
				.merge(payload)
				.updateIn(['skills'], arr => {
					return isEmpty(payload)
						? arr
						: arr.push(Map(payload))
				})
				.merge({
					loading: false,
					// finishedLoading: true,
					contentNotFound: isEmpty(payload),
				})
		case 'RECIEVE_SKILLS':
			return state
				.mergeDeep({
					...payload[0],
					skills: payload,
					loading: false,
					// finishedLoading: true,
					contentNotFound: isEmpty(payload),
				})
		case 'UPDATE_SKILL':
			return state.mergeDeep(payload)
		case 'TOGGLE_DIALOG':
			return state.set('dialogIsOpen', !state.get('dialogIsOpen'))
		case 'UNLOAD_SKILL':
			return state
				.merge(skillStructure)
				.merge({skills: List()})
				.mergeDeep({
					loading: false,
					// finishedLoading: false,
					contentNotFound: false,
				})
		// remove skill from skills list
		case 'REMOVE_SKILL':
			return state
				.merge({
					skills: state
							.get('skills')
							.filter(skill => skill.get('id') !== payload)
				})
		case 'RECIEVE_SEARCHED_VIDEOS':
			return state.merge({
				searchIsActive: false,
				searchedVideos: payload
			})
		default:
			return state
	}
}