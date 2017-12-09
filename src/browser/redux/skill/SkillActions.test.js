import nock from 'nock'
import thunk from 'redux-thunk'
import chai, { expect } from 'chai'
import isArray from 'lodash/isArray'
import chaiImmutable from 'chai-immutable'
import configureMockStore from 'redux-mock-store'
import { createAction, createActions } from 'redux-actions'
import { initialState } from 'browser/redux/skill/SkillReducer'
import { updateSkill, insertSkill, fetchSkill, fetchSkills, fetchRevisions, actions } from 'browser/redux/skill/SkillActions'
chai.should();
chai.use(chaiImmutable);

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// TODO add API_PREFIX instead of API_URL?
const { URL, API_URL } = process.env
const authApi = '/api/auth/'
const skillsApi = '/api/skills/'
const revisionsApi = '/api/revisions/'
const skill = {id: 1, name: 'random name'}
const revisions = {
  totalPages: 1,
  currentPage: 1,
  values: [{}, {}],
}
// TODO: export this function from somewhere
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
function mockRequest(url, action, param, result, method = 'get', reply = skill) {
    // TODO rework this url (last character '/' was causing unmathing of url)
    // create request interceptor
    nock(URL)[method](url).reply(200, reply)
    const store = mockStore()
    return store
      // call redux action
      .dispatch(action(param))
      // compare called actions with expected result
      .then(() => expect(store.getActions()).to.deep.equal(result))
}

describe('SkillActions', () => {

  afterEach(() => nock.cleanAll())

  it('insertSkill calls recieveSkill', async () => {
    const expectedActions = [actions.recieveSkill(skill)]
    await mockRequest(skillsApi, insertSkill, undefined, expectedActions, 'post')
  })

  // it('fetchRevisions calls recieveRevisions', async () => {
  //   const expectedActions = [actions.recieveRevisions(revisions)]
  //   const url = URL + revisionsApi + '12345' + '/1'
  //   console.log('url: ', url);
  //   // console.log('expectedActions: ', expectedActions);
  //   nock(url).get().reply(200, revisions)
  //   const store = mockStore()
  //   await store
  //   // call redux action
  //   .dispatch(fetchRevisions('12345'))
  //   // compare called actions with expected result
  //   .then(() => expect(store.getActions()).to.deep.equal(expectedActions))
  //   // await mockRequest(revisionsApi, fetchRevisions, '12345', expectedActions, 'get', revisions)
  // })


  // it('fetchCurrentSkill calls fetchingSkill and recieveCurrentSkill', async () => {
  //   const expectedActions = [
  //                             actions.fetchingSkill(),
  //                             actions.recieveCurrentSkill(skill)
  //                           ]
  //   await mockRequest(authApi + 'current_skill', fetchCurrentSkill, undefined, expectedActions)
  // })

  // it('logoutCurrentSkill calls removeCurrentSkill', async () => {
  //   const expectedActions = [actions.removeCurrentSkill()]
  //   await mockRequest(authApi + 'logout', logoutCurrentSkill, undefined, expectedActions)
  // })

  // it('fetchSkill calls fetchingSkill and recieveFetchedSkill', async () => {
  //   const { skillname } = skill
  //   const expectedActions = [
  //                             actions.fetchingSkill(),
  //                             actions.recieveFetchedSkill(skill)
  //                           ]
  //   await mockRequest(skillsApi + 'skill/' + skillname, fetchSkill, skillname, expectedActions)
  // })


  // it('updateSkill calls recieveCurrentSkill', async () => {
  //   const { skillname } = skill
  //   const expectedActions = [actions.recieveCurrentSkill(skill)]
  //   await mockRequest(
  //     skillsApi + 'skill/' + skillname,
  //     updateSkill,
  //     skillname,
  //     expectedActions,
  //     'put'
  //   )
  // })

  // describe('toggleLoginDialog', () => {
  //   it('toggles with argument', () => {
  //     const store = mockStore({skill: initialState})
  //     const expectedActions = [actions.toggleLoginDialog(true)]
  //     store.dispatch(toggleLoginDialog(true))
  //     expect(store.getActions()).to.deep.equal(expectedActions)
  //   })
  //   it('toggles without argument', () => {
  //     const store = mockStore({skill: initialState})
  //     const expectedActions = [actions.toggleLoginDialog(true)]
  //     store.dispatch(toggleLoginDialog())
  //     expect(store.getActions()).to.deep.equal(expectedActions)
  //   })
  // })
})