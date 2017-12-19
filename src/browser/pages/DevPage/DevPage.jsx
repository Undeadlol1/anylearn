// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import RevisionsList from 'browser/components/RevisionsList'
import { translate as t } from 'browser/containers/Translator'

class DevPage extends PureComponent {
    render() {
		const { props } = this
		return 	<PageWrapper
					className='DevPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12} sm={6} md={3}>
								<RevisionsList SkillId={props.SkillId} />
							</Col>
						</Row>
					</Grid>
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