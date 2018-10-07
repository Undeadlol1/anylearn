import get from 'lodash/get'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import classNames from 'classnames'
import extend from 'lodash/assignIn'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'
import { getCurrentUser, logoutUser } from '../graphql'
import { translate } from 'browser/containers/Translator'
import {
	toggleLoginDialog,
	logoutCurrentUser,
} from 'browser/redux/actions/UserActions'
/**
 * Conditionally render 'login' or 'logout' button.
 * On 'login' click the dialog is shown
 * which asks user for their credentials.
 * On 'logout' click user is logged out.
 * Component can be used as inline text or as a block button.
 * @export
 */
export class LoginLogoutButton extends Component {
	/**
	 * Props are self-explanatory.
	 */
	static propTypes = {
		// Should component be inline or not.
		inline: PropTypes.bool,
		// Id of a current user.
		UserId: PropTypes.number,
		// Apollo "logout" mutation.
		logout: PropTypes.func.isRequired,
		// Toggle dialog which prompts user to login.
		// This is a redux action.
		toggleDialog: PropTypes.func.isRequired,
	}

	render() {
		const { className, logout, toggleDialog, inline } = this.props
		const UserId = get(this.props, 'data.viewer.id')
		const label = translate(UserId ? "logout" : "login")
		const inlineStyles = {display: 'block', textAlign: "center"}

		const properties = extend(
			{
				onClick: UserId ? logout : toggleDialog,
				className: classNames('LoginLogoutButton', className),
			},
			// use <RaisedButton /> or <span> if 'inline' is specified
			// span needs special styles and RaisedButton needs 'label'
			inline ? {style: inlineStyles} : { label },
		)
		if (inline) return <span {...properties}>{label}</span>
		else return <RaisedButton {...properties} />
	}
}
/**
 * Map redux state to component properties.
 */
export const stateToProps = (state, ownProps) => ({
	...ownProps,
})
/**
 * Pass down "toggleSidebar" redux action.
 */
export const dispatchToProps = (dispatch, ownProps) => ({
	toggleDialog: () => dispatch(toggleLoginDialog()),
})
/**
 * Add graphql mutation functionality to a component.
 * Mutation logs out current user and then updates apollo cache.
 * @param {Object} ownProps
 */
const withMutation = ownProps => {
	/**
	 * Update apollo cache to remove current user object.
	 * @param {Object} cache Apollo cache.
	 * @param {Object} response Mutation response.
	 */
	function update(cache, response) {
		return cache.writeQuery({
			query: getCurrentUser,
			data: { viewer: null }
		})
	}
	return <Mutation mutation={logoutUser} update={update}>
		{
			(logout, props) => {
				const properties = {
					...props,
					...ownProps,
					logout,
				}
				return <LoginLogoutButton {...properties} />
			}
		}
	</Mutation>
}
/**
 * Fetch current user via apollo-graphql.
 */
const withQuery = props => (
	<Query query={getCurrentUser}>
		{({ data, error, loading }) => {
			const properties = { data, error, loading, ...props }
			return withMutation(properties)
		}}
	</Query>
)
/**
 * LoginLogoutButton button wrapped in redux and Apollo.
 * @exports
 */
export default connect(stateToProps, dispatchToProps)(withQuery)