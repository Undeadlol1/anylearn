import React from 'react'
import sinon from 'sinon'
import generateUuid from 'uuid/v4'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { AboutPage } from 'browser/pages/AboutPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())
chai.use(require('chai-properties'))

describe('<AboutPage />', () => {
  const props = {}
  const wrapper = shallow(<AboutPage {...props} />)
  /*
   * Common page properties.
   */
  it('has className and tagName', () => {
    expect(wrapper).to.have.className('AboutPage')
    expect(wrapper.type().name).to.eq('PageWrapper')
  })
  /*
   * Header tests.
   */
  describe('header', () => {
    const header = wrapper.find('.AboutPage__header')
    const row = header.find('Styled(Row)')
    const col = header.find('Styled(Col)')
    /*
     * Page must have proper grid configuration.
     */
    it('has <Row> and <Col>', () => {
      expect(row).to.exist
      expect(col).to.exist
      // Make sure column has proper width values.
      expect(col.props()).to.have.properties({
        xs: 12,
        md: 12,
        lg: 6,
        lgOffset: 3,
      })
    })
    /*
     * Page must have a header text.
     */
    it('has <h1>', () => {
      const el = header.find('h1')
      expect(el).to.exist
      expect(el).to.have.text(translate('about_us'))
      expect(el).to.have.className('AboutPage__title')
    })
  })
})