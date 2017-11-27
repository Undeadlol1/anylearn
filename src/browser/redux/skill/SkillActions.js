import selectn from 'selectn'
import { stringify } from 'query-string'
import { createAction, createActions } from 'redux-actions'
import { checkStatus, parseJSON, headersAndBody } from'browser/redux/actions/actionHelpers'


const skillsUrl = process.env.API_URL + 'skills/'

export const actions = createActions({
  UNLOAD_SKILL: () => null,
  REMOVE_SKILL: id => id,
  TOGGLE_DIALOG: () => null,
  RECIEVE_SKILL: node => node,
  RECIEVE_SKILLS: nodes => nodes,
  UPDATE_SKILL: object => object,
  TOGGLE_SKILL_FETCHING: boolean => boolean,
  FETCHING_ERROR: reason => reason,
  RECIEVE_SEARCHED_VIDEOS: videos => videos,
})

/**
 * create a skill
 * @param {object} payload content url
 */
export const insertSkill = payload => (dispatch, getState) => {
	return fetch(skillsUrl, headersAndBody(payload))
		.then(checkStatus)
		.then(parseJSON)
		.then(function(response) {
			dispatch(actions.toggleDialog())
			return dispatch(actions.recieveSkill(response))
		})
}

/**
 * update a skill
 * @param {object} payload content url
 */
export const updateSkill = payload => (dispatch, getState) => {
	console.log('updateSkill!!!');
	// console.log('payload: ', payload);
	return fetch(skillsUrl + payload.parentId, headersAndBody(payload, 'PUT'))
		.then(checkStatus)
		.then(parseJSON)
		.then(response => dispatch(actions.recieveSkill(response)))
}

/**
 * fetch skill using skill slug
 * @param {string} slug skill slug
 */
export const fetchSkill = slug => (dispatch, getState) => {
	const state = getState()
	const skillSlug = slug || state.skill.get('slug')

	// dispatch(actions.fetchingSkill())

	return fetch(
		skillsUrl + 'skill/' + skillSlug,
		{ credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => {
			// console.log('data: ', data);
			return dispatch(actions.recieveSkill((data)))
		})
		.catch(err => console.error('fetchskill failed!', err))
}

/**
 * fetch skills using skill slug
 * @param {string} slug skill slug (optional)
 */
export const fetchSkills = slug => (dispatch, getState) => {
	console.log('fetchSkills: ');
	const state = getState()
	const skillSlug = slug || state.skill.get('slug')

	// dispatch(actions.fetchingSkill())

	return fetch(
		skillsUrl, //+ skillSlug,
		{ credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => {
			console.log('done fetching.')
			return dispatch(actions.recieveSkills((data)))
		})
		.catch(err => console.error('fetchskill failed!', err))
}