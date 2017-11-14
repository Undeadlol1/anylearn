import nock from 'nock'
import isArray from 'lodash/isArray'
import thunk from 'redux-thunk'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import configureMockStore from 'redux-mock-store'
import { createAction, createActions } from 'redux-actions'
import { initialState } from 'browser/redux/Skill/SkillReducer'
import { updateSkill, toggleLoginDialog, logoutCurrentSkill, fetchCurrentSkill, fetchSkill, actions } from 'browser/redux/Skill/SkillActions'
chai.should();
chai.use(chaiImmutable);

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// TODO add API_PREFIX instead of API_URL?
const { URL, API_URL } = process.env
const authApi = '/api/auth/'
const skillsApi = '/api/skills/'
const skill = {skillname: 'misha', id: 1}
/**
 * test async action by intercepting http call
 * and cheking if expected redux actions have been called
 * @param {string} url request url
 * @param {function} action action to call
 * @param {any} param action param
 * @param {array} result expected actions
 * @param {string} [method='get'] request method
 * @returns
 */
function mockRequest(url, action, param, result, method = 'get') {
    // TODO rework this url (last character '/' was causing unmathing of url)
    // create request interceptor
    nock('http://127.0.0.1:3000')[method](url).reply(200, skill)
    const store = mockStore()
    return store
      // call redux action
      .dispatch(action(param))
      // compare called actions with expected result
      .then(() => expect(store.getActions()).to.deep.equal(result))
}

describe('SkillActions', () => {

  afterEach(() => nock.cleanAll())


  it('fetchCurrentSkill calls fetchingSkill and recieveCurrentSkill', async () => {
    const expectedActions = [
                              actions.fetchingSkill(),
                              actions.recieveCurrentSkill(skill)
                            ]
    await mockRequest(authApi + 'current_skill', fetchCurrentSkill, undefined, expectedActions)
  })

  it('logoutCurrentSkill calls removeCurrentSkill', async () => {
    const expectedActions = [actions.removeCurrentSkill()]
    await mockRequest(authApi + 'logout', logoutCurrentSkill, undefined, expectedActions)
  })

  it('fetchSkill calls fetchingSkill and recieveFetchedSkill', async () => {
    const { skillname } = skill
    const expectedActions = [
                              actions.fetchingSkill(),
                              actions.recieveFetchedSkill(skill)
                            ]
    await mockRequest(skillsApi + 'skill/' + skillname, fetchSkill, skillname, expectedActions)
  })


  it('updateSkill calls recieveCurrentSkill', async () => {
    const { skillname } = skill
    const expectedActions = [actions.recieveCurrentSkill(skill)]
    await mockRequest(
      skillsApi + 'skill/' + skillname,
      updateSkill,
      skillname,
      expectedActions,
      'put'
    )
  })

  describe('toggleLoginDialog', () => {
    it('toggles with argument', () => {
      const store = mockStore({skill: initialState})
      const expectedActions = [actions.toggleLoginDialog(true)]
      store.dispatch(toggleLoginDialog(true))
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
    it('toggles without argument', () => {
      const store = mockStore({skill: initialState})
      const expectedActions = [actions.toggleLoginDialog(true)]
      store.dispatch(toggleLoginDialog())
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})