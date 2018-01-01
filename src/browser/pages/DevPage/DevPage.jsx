// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import CommentsList from 'browser/components/CommentsList'
import RevisionsList from 'browser/components/RevisionsList'
import { translate as t } from 'browser/containers/Translator'

class DevPage extends PureComponent {
    render() {
		const { props } = this
		return 	<PageWrapper className='DevPage'>
					<Row>
						<Col xs={12} sm={6} md={4}>
							<RevisionsList SkillId={props.SkillId} />
						</Col>
					</Row>
					{/* VK COMMENTS */}
					<CommentsList />
				</PageWrapper>
    }
}

DevPage.propTypes = {
	SkillId: PropTypes.string.isRequired,
}

export { DevPage }

export default
connect(
	(state, ownProps) => ({
		SkillId: state.skill.get('id'),
		...ownProps
	}),
)(DevPage)