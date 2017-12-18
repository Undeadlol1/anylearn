import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { SkillTabs } from 'browser/components/SkillTabs'
import { translate as t } from 'browser/containers/Translator'
import { convertFromHTML, convertToRaw, ContentState } from 'draft-js'
chai.should()
chai.use(chaiEnzyme())

describe('<SkillTabs />', () => {

  const emptyRawData = convertToRaw(ContentState.createFromText('<span>test</span>'))
  const props = {
    readOnly: true,
    text: {
      stage0: emptyRawData,
      stage1: emptyRawData,
      stage2: emptyRawData,
      stage3: emptyRawData,
    }
  }
  const wrapper = shallow(<SkillTabs {...props} />)
  // console.log('wrapper: ', wrapper.debug());
  const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]  

  it('has <Row>', () => {
    const el = wrapper.find('Styled(Row)')
    expect(el).to.exist
    expect(el).to.have.className('SkillTabs')
  })

  it('has <Col>', () => {
    const el = wrapper.find('Styled(Col)')
    expect(el).to.exist
    expect(el).to.have.prop('xs', 12)
  })

  it('has <Paper> and <article>', () => {
    const el = wrapper.find('Paper')
    expect(el).to.exist
    expect(el.props().zDepth).to.eq(5)
    expect(el.find('article')).to.exist
  })

  it('has <Tabs>', () => {
    const el = wrapper.find('Tabs')
    expect(el).to.exist
    expect(el).to.have.className('SkillTabs__tabs')
  })

  it("has 4 <Tab>'s", () => {
    const tabs = wrapper.find('Tab')
    expect(tabs).to.have.length(4)
    tabs.map((tab, index) => {
      expect(tab).to.have.props({
        label: tabNames[index],
        className: 'SkillTabs__tab',
      })
    })
  })
})