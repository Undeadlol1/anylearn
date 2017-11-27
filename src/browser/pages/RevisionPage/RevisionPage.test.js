import React from 'react'
import sinon from 'sinon'
import { fromJS } from 'immutable'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { RevisionPage } from 'browser/pages/RevisionPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<RevisionPage />', () => {
  // const props = {
  //                 revision: fromJS({
  //                   text: JSON.stringify({})
  //                 })
  //               }
  // const wrapper = shallow(<RevisionPage {...props} />)

  // it('has className and tagName', () => {
  //   expect(wrapper).to.have.className('RevisionPage')
  //   expect(wrapper.type().name).to.eq('PageWrapper')
  // })

  // it('has <Grid>', () => {
  //   expect(wrapper.find('Styled(Grid)')).to.have.length(1);
  // })

  // it('has <Row>', () => {
  //   expect(wrapper.find('Styled(Row)')).to.have.length(1);
  // })

  // it('failes the test', () => {
  //   assert(false)
  // })

})