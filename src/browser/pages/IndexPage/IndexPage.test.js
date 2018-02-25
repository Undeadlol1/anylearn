import React from 'react'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { IndexPage } from 'browser/pages/IndexPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<IndexPage />', () => {
  const props = {}
  const wrapper = shallow(<IndexPage {...props} />)

  it('has className and tagName', () => {
    expect(wrapper).to.have.className('IndexPage')
    expect(wrapper.type().name).to.eq('PageWrapper')
  })

  // it('has <WelcomeCard>', () => {
  //   expect(wrapper.find('withCookies(WelcomeCard)')).to.exist
  // });

  it('has <MoodsInsert>', () => {
    // TODO 'ReduxForm' does not seems right
    expect(wrapper.find('ReduxForm')).to.exist
  });

  it('has <MoodTabs>', () => {
    expect(wrapper.find('Connect(MoodTabs)')).to.exist
  });

})