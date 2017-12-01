// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { diffTrimmedLines } from 'diff'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import nl2br from 'react-newline-to-break'
import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'

// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'

// TODO: full text instead of single stage
// TODO: proper styling

// TODO: redux, loading of data, difference rendering

// TODO: tests

// FIXME: what if there is no previous revision?

var DraftDiff = require('draft-js-diff');
var DiffEditor = DraftDiff.DiffEditor;

class RevisionPage extends PureComponent {

	createMarkup = (first, second) => {
		const __html = 	diffTrimmedLines(first, second)
						.map(function(part, index) {
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

	renderTabs = () => {
		return
	}

    render() {
		const { props } = this
		const newText = JSON.parse(props.revision.get('text'))
		const origionalText = JSON.parse(props.previousRevision.get('text'))
		const plainNewText = convertFromRaw(newText.stage0).getPlainText()
		// .replace(/↵/g, '<br />')
		const plainOriginalText = convertFromRaw(origionalText.stage0).getPlainText()
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		// .replace(/↵/g, '<br />')
		// console.log('props.revision.toJS(): ', props.revision.toJS());
		// props.get('previousRevision')/
		// console.log('props.get(\'previousRevision\'): ', props.revision.get('previousRevision'));
		// console.log('plainText: ', plainText);
		console.log('EditorState.createWithContent(convertFromRaw(newText.stage0)): ', EditorState.createWithContent(convertFromRaw(newText.stage0)));
		console.log('ContentState.createFromText(plainNewText): ', ContentState.createFromText(plainNewText));
		return 	<PageWrapper
					className='RevisionPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={8}>
								<h1>{props.revision.get('name')}</h1>
								<p>{props.revision.get('description')}</p>
								{/* <div className="row card-panel white-text"> */}
								{/* </div> */}
								{/* {
									plainOriginalText && plainNewText
									? 	<DiffEditor
											after={ContentState.createFromText(plainNewText)}
											before={ContentState.createFromText(plainOriginalText)}
										/>
									// ? 	<DiffEditor
									// 		after={EditorState.createWithContent(convertFromRaw(newText.stage0))}
									// 		before={EditorState.createWithContent(convertFromRaw(origionalText.stage0))}
									// 	/>
									: null
								} */}
							</Col>
							<Col xs={4}>
								<h1>
									{props.user.get('displayName')}
									<Avatar
										className="RevisionPage__avatar"
										// TODO: alt
										// alt={translate('your_avatar')}
										src={props.user.get('image')}
									/>
								</h1>
								{/* TODO alt */}

							</Col>
						</Row>
						<Divider />
						<Row>
							<Col xs={12}>
								<Tabs>
									{
										tabNames.map((name, index) => {
											const plainNewText = convertFromRaw(newText['stage' + index]).getPlainText()
											const plainOriginalText = convertFromRaw(origionalText['stage' + index]).getPlainText()
											return <Tab label={name} key={index}>
														<div dangerouslySetInnerHTML={this.createMarkup(plainOriginalText, plainNewText)} />
													</Tab>
										})
									}
								</Tabs>
								{/* <Paper zDepth={2}>
									<div dangerouslySetInnerHTML={this.createMarkup(plainOriginalText, plainNewText)} className="col s12"></div>
								</Paper> */}
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
		const user = revision.get('User')
		return {
			user,
			revision,
			previousRevision,
			...ownProps
		}
	},
)(RevisionPage)