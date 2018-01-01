import React from 'react'
import sinon from 'sinon'
import faker from 'faker'
import casual from 'casual'
import slugify from 'slug'
import { fromJS } from 'immutable'
import chaiEnzyme from 'chai-enzyme'
import { convertFromRaw } from 'draft-js'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { SkillPage } from 'browser/pages/SkillPage'
import { createEmptyRevisionText } from 'shared/helpers'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<SkillPage />', () => {
  const name = casual.title
  const props = {
                  name,
                  // threads: [],
                  SkillId: casual.uuid,
                  slug: slugify(name),
                  location: {pathname: 'some'},
                  text: createEmptyRevisionText(),
                  userImage: faker.image.imageUrl(),
                }
  const wrapper = shallow(<SkillPage {...props} />)

  it('has <PageWrapper>', () => {
    const el = wrapper.first()
    const description = convertFromRaw(props.text.stage0).getFirstBlock().get('text')
    expect(el.name()).to.eq('PageWrapper')
    expect(el).to.have.className('SkillPage')
    expect(el).to.have.props({
      description,
      image: props.image,
      className: 'SkillPage',
      title: `Обучение навыку "${name}"`,
    })
  })

  it('has <CommentsList>', () => {
    const list = wrapper.find('Connect(CommentsList)')
    expect(list).to.exist
  })
  // it('has <CreateThreadForm>', () => {
  //   const el = wrapper.find('ReduxForm')
  //   expect(el).to.exist
  //   expect(el).to.have.prop('parentId', props.SkillId)
  // })

  // it('has <ThreadsList>', () => {
  //   const el = wrapper.find('Connect(ThreadsList)')
  //   expect(el).to.exist
  //   expect(el).to.have.prop('threads', props.threads)
  // })

  // it('has <Row>', () => {
  //   expect(wrapper.find('Styled(Row)')).to.have.length(1);
  // })

  // it('failes the test', () => {
  //   assert(false)
  // })

})