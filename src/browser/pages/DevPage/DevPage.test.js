import React from 'react'
import sinon from 'sinon'
import generateUuid from 'uuid/v4'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { DevPage } from 'browser/pages/DevPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<DevPage />', () => {
  const props = {
                    SkillId: generateUuid()
                }
  const wrapper = shallow(<DevPage {...props} />)

  it('has className and tagName', () => {
    expect(wrapper).to.have.className('DevPage')
    expect(wrapper.type().name).to.eq('PageWrapper')
  })

  it('has <Row>', () => {
    expect(wrapper.find('Styled(Row)')).to.exist
  })

  it('has <Col>', () => {
    const el = wrapper.find('Styled(Col)')
    expect(el).to.exist
    expect(el).to.have.props({
      xs: 12,
      sm: 6,
      md: 4,
    })
  })

  it('has <RevisionsList>', () => {
    const list = wrapper.find('Connect(RevisionsList)')
    expect(list).to.exist
    expect(list).to.have.prop('SkillId', props.SkillId)
  })

  it('has <CommentsList>', () => {
    const list = wrapper.find('Connect(CommentsList)')
    expect(list).to.exist
  })

})