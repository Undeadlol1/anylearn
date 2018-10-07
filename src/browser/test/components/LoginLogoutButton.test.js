import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import store from 'browser/redux/store'
import chai, { expect, assert } from 'chai'
import { translate } from 'browser/containers/Translator'
import { LoginLogoutButton, dispatchToProps } from 'browser/components/LoginLogoutButton'
chai.should()
chai.use(chaiEnzyme())

describe('<LoginLogoutButton />', () => {
    // Commonly used code to render component for testing.
    function createWrapper(modifiers) {
        const props =   {
                            logout: () => {},
                            toggleDialog: () => {},
                        }
        const newProps = {...props, ...modifiers}
        return shallow(<LoginLogoutButton {...newProps} />)
    }
    /**
     * Test default behaviour.
     * By default component must:
     * be a <RaisedButton />
     * must have a "login" label text
     * fire a "toggleDialog" function on click.
     */
    describe('default behaviour', () => {
        const toggleDialog = sinon.spy()
        const wrapper = createWrapper({toggleDialog})
        // Test component structure.
        it('has <RaisedButton />', () => {
            const props = wrapper.props()
            assert(wrapper.type(), 'is <RaisedButton />')
            assert(props.label == translate('login'), 'has label')
            assert(typeof props.onClick == 'function', 'has onClick')
            assert(wrapper.hasClass('LoginLogoutButton'), 'has className')
        })
        // Test click functionality.
        it('simulates click', () => {
            wrapper.simulate('click')
            assert(toggleDialog.calledOnce, 'calls toggleDialog()')
        })
    })
    /**
     * Test {inline: true} behaviour.
     * It must be the same as previous test except
     * component should be displayed inline.
     */
    describe('inline behaviour', () => {
        const toggleDialog = sinon.spy()
        const wrapper = createWrapper({inline: true, toggleDialog})
        const props = wrapper.props()
        // Test component structure.
        it('has <span>', () => {
            assert(wrapper.type(), 'is <span>')
            assert(typeof props.style == 'object', 'no style')
            assert(wrapper.text() == translate('login'), 'no text')
            assert(typeof props.onClick == 'function', 'no onClick')
            assert(wrapper.hasClass('LoginLogoutButton'), 'no className')
        })
        // Test click functionality.
        it('simulates click', () => {
            wrapper.simulate('click')
            assert(toggleDialog.calledOnce, 'calls toggleDialog()')
        })
    })
    /**
     * If user is logged in, component must:
     * have "logout" label text
     * fire "logout()" function on click.
     */
    describe('user logged in behaviour:', () => {
        const logout = sinon.spy()
        const wrapper = createWrapper({
            logout,
            // Pass down some dummy user data to a component
            // to simulate currently logged in user.
            data: { viewer: {id: 123},
        }})
        // Test label text.
        it('has proper text', () => {
            expect(wrapper.props().label).to.eql(translate('logout'))
        })
        // Test function call.
        it('dispatches actions', () => {
            wrapper.simulate('click')
            assert(logout.calledOnce, 'calls toggleDialog()')
        })
    })

})