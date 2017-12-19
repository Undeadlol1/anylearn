import React from 'react'
import selectn from 'selectn'
import PropTypes from 'prop-types'
import styles from 'browser/theme'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import NavBar from 'browser/components/NavBar'
import {VK, CommunityMessages} from 'react-vk'
import { Grid } from 'react-styled-flexboxgrid'
import Sidebar from 'browser/components/Sidebar'
import LoginDialog from 'browser/components/LoginDialog'
import PageLoading from 'browser/components/PageLoading'
import LoginLogoutButton from 'browser/components/LoginLogoutButton'
import { logoutCurrentUser } from 'browser/redux/actions/UserActions'

let timeout = null

@connect(
	({ user, global }, ownProps) => ({
		user,
		...ownProps,
		loginIsOpen: global.get('loginIsOpen'),
		headerIsShown: global.get('headerIsShown'),
	}),
	(dispatch, ownProps) => ({
		logout(event) {
			event.preventDefault()
			dispatch(logoutCurrentUser())
		}
    })
)
export default class Layout extends React.Component {
	static propTypes = {
		// main: PropTypes.node.isRequired,
		// nav: PropTypes.node
	}

	state = {
		hidden: false,
		// hidden: true,
	}

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	// componentDidMount() {
	// 	$('body').css('background-color', 'rgb(48, 48, 48)')
	// 	$('input[type=url]:focus:not([readonly])').css('box-shadow', 'none !important')
	// }

	showChildren = () => {
		clearInterval(timeout)
		// $('.Decision').show()
		this.setState({ hidden: false })
		timeout = setTimeout(() => {
			this.hideChildren()
		}, 2500);
	}

	hideChildren = () => {
		// $('.Decision').hide()
		this.setState({ hidden: true })
	}

	render() {
		const { logout, loginIsOpen, headerIsShown, ...rest } = this.props

		const currentPath = this.context.router.getCurrentPathname && this.context.router.getCurrentPathname()
		const location = selectn('router.location.pathname', this.context)
		const isMoodPage = location.includes('/mood/')
		const groupId = process.env.NODE_ENV
						== "production"
						? 157990291
						: 91039942

		// styles
		const 	baseStyles = 	{
									height: '100vh',
									minHeight: '100vh',
									fontFamily: 'sans-serif',
									color: styles.palette.textColor,
									backgroundColor: styles.palette.canvasColor,
								},
				headerStyles = 	{ // this is moved to navbar.scss
									// position: 'fixed',
									zIndex: '1',
									width: '100%'
								}

		return <div
					className='Layout'
					style={baseStyles}
					//onMouseOver={this.showChildren}
					//onMouseLeave={this.hideChildren}
					//onMouseMove={this.showChildren}
					//onTouchEnd={this.hideWhenIdle}
					//onMouseStop={this.checker} // this useed to be here already commented out
				>
					{!isMoodPage && <NavBar />}
					<main>
						{this.props.children}
					</main>
					<Sidebar />
					<LoginDialog />
					{/* global page loading indicator */}
					<PageLoading />
					<ReduxToastr position="top-left" progressBar />
					<VK apiId={Number(process.env.VK_ID)}>
						<CommunityMessages
							groupId={groupId}
							widgetPosition="left"
							options={{
								widgetPosition: 'left',
								disableButtonTooltip: 1,
								tooltipButtonText: 'Обратная связь',
								onCanNotWrite: reason => console.log(reason),
							}}
						/>
					</VK>
				</div>
	}
}
