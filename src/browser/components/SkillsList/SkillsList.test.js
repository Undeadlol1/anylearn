import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { translate as t } from 'browser/containers/Translator'
import { SkillsList } from 'browser/components/SkillsList'
chai.should()
chai.use(chaiEnzyme())

describe('<SkillsList />', () => {

  const props = {}
  const wrapper = shallow(<SkillsList {...props} />)
  
  it('has <section>', () => {
    const el = wrapper.find('section')
    expect(el).to.have.length(1)
    expect(el).to.have.className('SkillsList')
  })

})