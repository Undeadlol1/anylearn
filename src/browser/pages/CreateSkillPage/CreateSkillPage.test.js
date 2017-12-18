import React from 'react'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { translate } from 'browser/containers/Translator'
import { CreateSkillPage } from 'browser/pages/CreateSkillPage'
chai.should()
chai.use(chaiEnzyme())

describe('<CreateSkillPage />', () => {
  const props = {
                  loading: false,
                  location: {pathname: 'some'},
                }
  const wrapper = shallow(<CreateSkillPage {...props} />)

  it('has className and tagName', () => {
    expect(wrapper).to.have.className('CreateSkillPage')
    expect(wrapper.type().name).to.eq('PageWrapper')
  })

  it('has <Grid>', () => {
    expect(wrapper.find('Styled(Grid)')).to.have.length(1);
  })

  it('has <Tabs>', () => {
    expect(wrapper.find('Paper')).to.have.length(1);
    // expect(wrapper.find('Tab')).to.have.length(4);
  })

})