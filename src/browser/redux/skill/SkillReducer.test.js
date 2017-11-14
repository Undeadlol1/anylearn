import chai, { expect } from 'chai'
import { Map, List } from 'immutable'
import chaiImmutable from 'chai-immutable'
import { actions } from 'browser/redux/Skill/SkillActions'
import reducer, { initialState } from 'browser/redux/Skill/SkillReducer'
chai.should()
chai.use(chaiImmutable)

describe('user reducer', async () => {

  const skill = {
    id: 1,
    UserId: 2,
    SkillId: 3,
    type: 'video',
    contentId: 123,
    url: 'google.com',
    rating: '1.32332300',
    provider: 'youtube',
    Decision: {},
  }

  const skills = [
    {id: 1},
    {id: 2},
    {id: 3},
  ]

  it('should have initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  it('should handle RECIEVE_SKILL action on initial state', async () => {
    const action = actions.recieveSkill(skill)
    const newState = reducer(undefined, action)
    expect(newState).to.have.property('id', skill.id)
    expect(newState).to.have.property('contentId', skill.contentId)
    expect(newState).to.have.property('loading', false)
  })

  it('should handle RECIEVE_SKILLS action on initial state', () => {
    const action = actions.recieveSkills(skills)
    const newState = reducer(undefined, action)
    expect(newState.get('skills').toJS()).to.deep.equal(skills)
  })

  it('should handle UPDATE_SKILL action', async () => {
    expect(
      reducer(undefined, actions.updateSkill(skill))
    )
    .to.have.property('id', skill.id)
  })

  it('should handle TOGGLE_DIALOG action on initial state', async () => {
    expect(
      reducer(undefined, actions.toggleDialog(true))
    )
    .to.have.property('dialogIsOpen', true)
  })

  it('should handle UNLOAD_SKILL action', () => {
    const action = actions.unloadSkill()
    const newState = reducer(undefined, action)
    expect(newState).to.equal(initialState)
  })

  it('should handle REMOVE_SKILL action', () => {
    const action = actions.recieveSkills(skills)
    // state containing active skill and skills list
    const initialState = reducer(undefined, action).merge(skill)
    const newState = reducer(initialState, actions.removeSkill(1))
    expect(newState.get('skills').toJS())
      .to.have.length(2)
      .and.not.contain({id: 1})
  })

  it('should handle RECIEVE_SEARCHED_VIDEOS action on initial state', () => {
    const action = actions.recieveSearchedVideos([])
    const newState = reducer(undefined, action)
    const expectedState = initialState.merge({
        searchedVideos: [],
        searchIsActive: false,
    })
    expect(newState).to.deep.eq(expectedState)
  })

})