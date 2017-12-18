import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Icon from 'browser/components/Icon'
import { Row, Col } from 'react-styled-flexboxgrid'
import RaisedButton from 'material-ui/RaisedButton'
import LoginForm from 'browser/components/LoginForm'
import { translate } from 'browser/containers/Translator'
import { toggleLoginDialog } from 'browser/redux/actions/UserActions'

export class LoginDialog extends Component {

	static defaultProps = {
		open: false,
	}

	render() {
		const { open, toggleDialog } = this.props
		const iconStyle = {marginBottom: '1.2rem'}
		const iconColor = 'rgb(48, 48, 48)'
		return <Dialog
					open={open}
					className="LoginDialog"
					onRequestClose={toggleDialog}
					titleStyle={{ textAlign: 'center' }}
					title={translate('please_login')}
				>
					<Row className="LoginDialog__icons">
						<Col xs={12} sm={6}>
							<RaisedButton
								primary
								fullWidth
								label="vk.com"
								style={iconStyle}
								href="/api/auth/vkontakte"
								className="LoginDialog__icon"
								icon={<Icon name="vk" color={iconColor} />} />
						</Col>
						<Col xs={12} sm={6}>
							<RaisedButton
								primary
								fullWidth
								style={iconStyle}
								label="twitter.com"
								href="/api/auth/twitter"
								className="LoginDialog__icon"
								icon={<Icon name="twitter" color={iconColor} />} />
						</Col>
					</Row>
					{/* <Divider />
					<LoginForm /> */}
				</Dialog>
	}
}

LoginDialog.PropTypes = {
	open: PropTypes.bool.isRequired,
	toggleDialog: PropTypes.func.isRequired,
}

export const dispatchToProps = (dispatch, ownProps) => ({
	toggleDialog: () => dispatch(toggleLoginDialog()),
})

export default connect(
	({ user }) => ({ open: user.get('loginIsOpen') }),
	dispatchToProps
)(LoginDialog)