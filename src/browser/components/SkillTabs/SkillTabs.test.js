import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { createEmptyRevisionText } from 'shared/helpers'
import { SkillTabs } from 'browser/components/SkillTabs'
import { translate as t } from 'browser/containers/Translator'
import { convertFromHTML, convertToRaw, ContentState } from 'draft-js'
chai.should()
chai.use(chaiEnzyme())

describe('<SkillTabs />', () => {

  const text = createEmptyRevisionText()
  const props = {text}
  const wrapper = shallow(<SkillTabs {...props} />)
  const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
  const tabs = wrapper.find('Tab')

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

  it('has <Tabs> container', () => {
    const el = wrapper.find('Tabs')
    expect(el).to.exist
    expect(el).to.have.className('SkillTabs__tabs')
  })

  it("has 4 <Tab>'s", () => {
    expect(tabs).to.have.length(4)
    tabs.map((tab, index) => {
      const editor = tab.find('t')
      expect(tab).to.have.props({
        label: tabNames[index],
        className: 'SkillTabs__tab',
      })
      expect(editor).to.exist
    })
  })

  // describe("handles 'readOnly' prop", () => {
  //   it('which is true by default',  () => {
  //     expect(wrapper.instance().props.readOnly).to.be.true
  //     tabs.forEach(tab => {
  //       const editor = tab.find('t')
  //       expect(editor).to.have.className('SkillTabs__editor SkillTabs__editor-readOnly')
  //     })
  //   })

  //   it('removes "-readOnly" className if prop is false', () => {
  //     const wrapper =
  //     tabs.forEach(tab => {
  //       const editor = tab.find('t')
  //       expect(editor).to.have.className('SkillTabs__editor')
  //     })
  //   })
  // })
})