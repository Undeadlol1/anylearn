// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { convertFromRaw } from 'draft-js'
import nl2br from 'react-newline-to-break'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'

const JsDiff = require('diff');

// TODO: redux, loading of data, difference rendering

// TODO: tests

// FIXME: what if there is no previous revision?

// var DraftDiff = require('draft-js-diff');
// var DiffEditor = DraftDiff.DiffEditor;

class RevisionPage extends PureComponent {

	createMarkup = (first, second) => {
		const __html = JsDiff
						.diffTrimmedLines(first, second)
						.map(function(part, index) {
							console.log('part: ', part);
							  // added == 'green', removed == 'red', else == ''
							  const color = part.added ? 'green' : part.removed ? 'red' : ''
							  // do not return untouched bits
							//   if (!color) return null
							  return 	`<div key=${index} style="background-color: ${color};">
											${part.value}
										</div>`
						})
						.join('')
		return 	{__html}
	}

    render() {
		const { props } = this
		const newText = JSON.parse(props.revision.get('text'))
		const origionalText = JSON.parse(props.previousRevision.get('text'))
		const plainNewText = convertFromRaw(newText.stage0).getPlainText().replace(/↵/g, '<br />');
		const plainOriginalText = convertFromRaw(origionalText.stage0).getPlainText().replace(/↵/g, '<br />');
		console.log('props.revision.toJS(): ', props.revision.toJS());
		// props.get('previousRevision')/
		console.log('props.get(\'previousRevision\'): ', props.revision.get('previousRevision'));
		// console.log('plainText: ', plainText);
		return 	<div className="row card-panel white-text">
					<div dangerouslySetInnerHTML={this.createMarkup(plainOriginalText, plainNewText)} className="col s12"></div>
				</div>
		return 	<PageWrapper
					className='RevisionPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								{/* {
									plainOriginalText && plainNewText
									? 	<DiffEditor
											after={plainNewText}
											before={plainOriginalText}
										/>
									: null
								} */}
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
	(state, ownProps) => {
		const revision = state.skill.get('revision')
		const previousRevision = revision.get('previousRevision')
		return {
			revision,
			previousRevision,
			...ownProps
		}
	},
)(RevisionPage)