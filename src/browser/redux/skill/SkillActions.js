import selectn from 'selectn'
import { stringify } from 'query-string'
import { createAction, createActions } from 'redux-actions'
import { checkStatus, parseJSON, headersAndBody } from'browser/redux/actions/actionHelpers'


const skillsUrl = process.env.API_URL + 'skills/'
const revisionsUrl = process.env.API_URL + 'revisions/'

export const actions = createActions({
  UNLOAD_SKILL: () => null,
  REMOVE_SKILL: id => id,
  TOGGLE_DIALOG: () => null,
  RECIEVE_SKILL: node => node,
  RECIEVE_SKILLS: nodes => nodes,
  RECIEVE_REVISIONS: revisions => revisions,
//   UPDATE_SKILL: object => object,
// TODO: ?????
  TOGGLE_SKILL_FETCHING: boolean => boolean,
  FETCHING_ERROR: reason => reason,
})

/**
 * create a skill
 * @param {object} payload content url
 */
export const insertSkill = payload => (dispatch, getState) => {
	return fetch(skillsUrl, headersAndBody(payload, 'POST'))
		.then(checkStatus)
		.then(parseJSON)
		.then(response => {
			// dispatch(actions.toggleDialog())
			return dispatch(actions.recieveSkill(response))
		})
}

/**
 * update a skill
 * @param {object} payload content url
 */
export const updateSkill = payload => (dispatch, getState) => {
	return fetch(skillsUrl + payload.parentId, headersAndBody(payload, 'PUT'))
		.then(checkStatus)
		.then(parseJSON)
		.then(response => {
			return dispatch(actions.recieveSkill(response))
		})
}

/**
 * fetch skill using skill slug
 * @param {string} slug skill slug
 */
export const fetchSkill = slug => (dispatch, getState) => {
	// const state = getState()
	// const skillSlug = slug || state.skill.get('slug')

	// dispatch(actions.fetchingSkill())

	return fetch(
		skillsUrl + 'skill/' + slug,
		// { credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => dispatch(actions.recieveSkill((data))))
		.catch(err => console.error('fetchskill failed!', err))
}

/**
 * fetch skills
 * @param {number} page skill page (optional)
 */
export const fetchSkills = (page = 1) => (dispatch, getState) => {

	// dispatch(actions.fetchingSkill())

	return fetch(
		skillsUrl + page,
		// { credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => dispatch(actions.recieveSkills((data))))
		.catch(err => console.error('fetchskills failed!', err))
}

/**
 * fetch revisions on pagination click
 * @param {string} parentId
 * @param {number} page revisions page (optional)
 */
export const fetchRevisions = (parentId, page = 1) => (dispatch, getState) => {
	console.log('evisionsUrl + parentId + \'/\' + page: ', revisionsUrl + parentId + '/' + page);
	return fetch(revisionsUrl + parentId + '/' + page)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => dispatch(actions.recieveRevisions((data))))
		.catch(err => console.error('fetchskills failed!', err))
}
