import faker from 'faker'
import slugify from 'slug'
import casual from 'casual'
import generateUuid from 'uuid/v4'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import { actions } from 'browser/redux/skill/SkillActions'
import reducer, { initialState } from 'browser/redux/skill/SkillReducer'
chai.should()
chai.use(chaiImmutable)

describe('skill reducer', async () => {

  const skillId = casual.uuid
  const UserId = casual.uuid
  const RevisionId = casual.uuid
  const skillName = casual.title

  const User = {
    id: UserId,
    username: 'randomName',
  }

  const revision = {
    User,
    UserId,
    id: RevisionId,
    name: casual.title,
    text: JSON.stringify({}),
    description: faker.lorem.paragraphs(),
    active: casual.boolean,
    // TODO: do i need this now?
    image: faker.image.imageUrl(),
    parentId: skillId,
    previousId: casual.uuid,
    rating: '',
    // TODO:
    previousRevision: {},
  }

  const skills = {
    totalPages: 1,
    currentPage: 1,
    values: [
      {id: 1},
      {id: 2},
      {id: 3},
    ]
  }

  const revisions = {
    totalPages: 1,
    currentPage: 1,
    values: [{}, {}],
  }

  const threads = {
    totalPages: 1,
    currentPage: 1,
    values: [{}, {}],
  }

  const skill = {
    revision,
    revisions,
    skills,
    threads,
    RevisionId,
    revisions: [{name: 'first'}, {name: 'second'}],
    name: skillName,
    // TODO: this
    rating: '',
    id: skillId,
    slug: slugify(skillName),
    UserId: casual.integer(),
    image: faker.image.imageUrl(),
  }

  it('should have initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  it('should handle RECIEVE_SKILL action on initial state', async () => {
    const action = actions.recieveSkill(skill)
    const newState = reducer(undefined, action).toJS()
    expect(newState).to.have.property('id', skill.id)
    expect(newState.skills).to.deep.equal(skill.skills)
    expect(newState.revision).to.deep.equal(revision)
    expect(newState.revision.User.id).to.equal(User.id)
    expect(newState.revisions).to.deep.equal(skill.revisions)
    expect(newState.threads).to.deep.equal(skill.threads)
  })

  it('should handle RECIEVE_SKILLS action on initial state', () => {
    const action = actions.recieveSkills(skills)
    const newState = reducer(undefined, action).toJS()
    expect(newState.skills).to.deep.equal(skills)
  })

  it('should handle RECIEVE_QUESTIONS action on initial state', () => {
    const action = actions.recieveQuestions(threads)
    const newState = reducer(undefined, action).toJS()
    expect(newState.threads).to.deep.equal(threads)
  })

  it('should handle RECIEVE_REVISION action on initial state', () => {
    const action = actions.recieveRevision(revision)
    const newState = reducer(undefined, action).toJS()
    // simple id comparison because
    // unfinished user from UserReducer.test is breaking this test
    expect(newState.revision.id).to.deep.equal(revision.id)
  })

  it('should handle RECIEVE_REVISIONS action on initial state', () => {
    const action = actions.recieveRevisions(revisions)
    const newState = reducer(undefined, action).toJS()
    expect(newState.revisions).to.deep.equal(revisions)
  })

  it('should handle TOGGLE_DIALOG action on initial state', async () => {
    const newState = reducer(undefined, actions.toggleDialog(true))
    expect(newState).to.have.property('dialogIsOpen', true)
  })

  it('should handle UNLOAD_SKILL action', () => {
    const action = actions.unloadSkill()
    const newState = reducer(undefined, action).toJS()
    expect(newState).to.deep.equal(initialState.toJS())
  })

  it('should handle CHANGE_TAB action', () => {
    const action = actions.changeTab(2)
    const newState = reducer(undefined, action).toJS()
    expect(newState.currentTab).to.eq(2)
  })

  // it('should handle REMOVE_SKILL action', () => {
  //   const action = actions.recieveSkills(skills)
  //   // state containing active skill and skills list
  //   const initialState = reducer(undefined, action).merge(skill)
  //   const newState = reducer(initialState, actions.removeSkill(1))
  //   expect(newState.get('skills').toJS())
  //     .to.have.length(2)
  //     .and.not.contain({id: 1})
  // })

})