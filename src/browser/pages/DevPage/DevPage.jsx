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
						{/* <Row> */}
							{/* <Col xs={12}> */}
								<RevisionsList />
							{/* </Col> */}
						{/* </Row> */}
					</Grid>
				</PageWrapper>
    }
}

DevPage.propTypes = {
	// prop: PropTypes.object,
}

export { DevPage }

export default
connect(
	(state, ownProps) => ({
		// prop: state.mood.get('moods'),
		...ownProps
	}),
)(DevPage)