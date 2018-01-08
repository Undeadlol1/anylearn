// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { diffTrimmedLines } from 'diff'
import Avatar from 'material-ui/Avatar'
import Link from 'react-router/lib/Link'
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

const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]

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
		const {props} = this
		const newText = JSON.parse(props.revision.get('text'))
		if (!props.previousRevision) return null
		const origionalText = JSON.parse(props.previousRevision.get('text'))
		return tabNames.map((name, index) => {
			const plainNewText = convertFromRaw(newText['stage' + index]).getPlainText()
			const plainOriginalText = convertFromRaw(origionalText['stage' + index]).getPlainText()
			return <Tab label={name} key={index}>
						<div dangerouslySetInnerHTML={this.createMarkup(plainOriginalText, plainNewText)} />
					</Tab>
		})
	}

    render() {
		const { props, props: {revision, user} } = this
		const name 	= 	props.name == 'initial_revision'
						? t('initial_revision')
						: props.name
		return 	<PageWrapper className='RevisionPage'>
					<Row>
						<Col xs={12} sm={8}>
							<h1 className="RevisionPage__title">{name}</h1>
							<p className="RevisionPage__description">{revision.get('description')}</p>
						</Col>
						<Col xs={12} sm={4} className="RevisionPage__user-container">
							<Link to={`users/${user.get('id')}`}>
								<i className="RevisionPage__username">
									{user.get('displayName')}
								</i>
								<Avatar
									src={user.get('image')}
									className="RevisionPage__avatar"
									// TODO: alt
									// alt={translate('your_avatar')}
								/>
							</Link>
						</Col>
					</Row>
					<Divider />
					<Row>
						<Col xs={12}>
							<Tabs className="RevisionPage__tabs">
								{
									this.renderTabs()
								}
							</Tabs>
							{/* <Paper zDepth={2}>
								<div dangerouslySetInnerHTML={this.createMarkup(plainOriginalText, plainNewText)} className="col s12"></div>
							</Paper> */}
						</Col>
					</Row>
				</PageWrapper>
    }
}

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

// TODO: props
RevisionPage.propTypes = {
	name: PropTypes.string,
	revision: PropTypes.object.isRequired,
}

export { RevisionPage }

export default
connect(
	(state, ownProps) => {
		const revision = state.skill.get('revision')
		return {
			revision,
			name: revision.get('name'),
			user: revision.get('User'),
			previousRevision: revision.get('previousRevision'),
			...ownProps
		}
	},
)(RevisionPage)