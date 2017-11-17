// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import { Tabs, Tab } from 'material-ui/Tabs'
import React, { PureComponent } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { ContentState, convertFromHTML, convertToRaw, convertFromRaw, EditorState } from 'draft-js'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

class SkillPage extends PureComponent {
	render() {
		const 	{ props } = this,
		{ skill } = props
		const text = JSON.parse(skill.getIn(['revision', 'text']))
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		return 	<PageWrapper
					className='SkillPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								<Link
									to={`/skill/${skill.get('slug')}/edit`}
								>
									<RaisedButton
										primary
										label={t('edit')}
										icon={<EditIcon />}
									/>
								</Link>
							</Col>
							<Col xs={12}>
								<center><h1>{skill.get('name')}</h1></center>
								{/* TODO "alt" attribute */}
								<center><img src={skill.get('image')} /></center>
							</Col>
							<Col xs={12}>
								<Tabs>
									{
										tabNames.map((name, index) => {
											return <Tab label={name} key={index}>
														<Editor
															readOnly={true}
															toolbarHidden={true}
															editorState={EditorState.createWithContent(convertFromRaw(text['stage' + index]))}
														/>
													</Tab>
										})
									}
								</Tabs>
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