import cls from 'classnames'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
// import { VK, Comments } from 'react-vk'
import React, { Component } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { translate as t } from 'browser/containers/Translator'

class CommentsList extends Component {
	componentDidMount() {
		if (process.env.BROWSER) {
			console.log('componentDidMount browser');
			VK.init({
				onlyWidgets: true,
				apiId: process.env.VK_ID,
			})
			// window.url
			console.log('window.url: ', window.URL);
			window.location.href
			console.log('window.location.href : ', window.location.href );
			VK.Widgets.Comments(
				'vk_comments',
				{
					pageUrl: window.location.href,
				},
				window.location.href
			)
		}
	}
	render() {
		const {props} = this
		const className = cls(props.className, "CommentsList")
		return 	<Row className={className}>
					<Col xs={12}>
						<Paper zDepth={3}>
							{
								process.env.BROWSER
								&&
								<div id="vk_comments"></div>
								// && 	<VK apiId={Number(process.env.VK_ID)}>
								// 		<Comments />
								// 		{/* onNewComment={() => console.log('1')}  */}
								// 	</VK>
							}
						</Paper>
					</Col>
				</Row>
	}
}

CommentsList.PropTypes = {}

export { CommentsList }
export default connect(
	// stateToProps
	(state, ownProps) => ({ ...ownProps }),
	// dispatchToProps
    (dispatch, ownProps) => ({})
)(CommentsList)