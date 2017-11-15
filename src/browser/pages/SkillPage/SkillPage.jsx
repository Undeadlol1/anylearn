// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'

class SkillPage extends PureComponent {
    render() {
		const 	{ props } = this,
				{ skill } = props
		return 	<PageWrapper
					className='SkillPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								<center><h1>{skill.get('name')}</h1></center>
								{/* TODO "alt" attribute */}
								<center><img src={skill.get('image')} /></center>
							</Col>
						</Row>
					</Grid>
				</PageWrapper>
    }
}

SkillPage.propTypes = {
	skill: PropTypes.object,
}

export { SkillPage }

export default
connect(
	(state, ownProps) => ({
		skill: state.skill,
		...ownProps
	}),
)(SkillPage)