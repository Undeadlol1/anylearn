import React from 'react'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { DevPage } from 'browser/pages/DevPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<DevPage />', () => {
  const props = {
                  loading: false,
                  location: {pathname: 'some'},
                }
  const wrapper = shallow(<DevPage {...props} />)

  // it('has className and tagName', () => {
  //   expect(wrapper).to.have.className('DevPage')
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