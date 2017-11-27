// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { convertFromRaw } from 'draft-js'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'

// TODO: redux, loading of data, difference rendering

// TODO: tests

// FIXME: what if there is no previous revision?

// var DraftDiff = require('draft-js-diff');
// var DiffEditor = DraftDiff.DiffEditor;

class RevisionPage extends PureComponent {
    render() {
		const { props } = this
		const text = JSON.parse(props.revision.get('text'))
		const plainText = convertFromRaw(text.stage0).getPlainText();
		console.log('plainText: ', plainText);
		return 	<PageWrapper
					className='RevisionPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								{plainText}
								{/* <DiffEditor before={<h1>hi</h1>}
											after={<h1>ho</h1>}/>, */}
							</Col>
						</Row>
					</Grid>
				</PageWrapper>
    }
}

// TODO: props
RevisionPage.propTypes = {
	// prop: PropTypes.object,
}

export { RevisionPage }

export default
connect(
	(state, ownProps) => ({
		revision: state.skill.get('revision'),
		...ownProps
	}),
)(RevisionPage)