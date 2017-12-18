// dependencies
import PropTypes from 'prop-types'
import { VK, Like } from 'react-vk'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Link from 'react-router/lib/Link'
import { Tabs, Tab } from 'material-ui/Tabs'
import React, { PureComponent } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { ContentState, convertFromHTML, convertToRaw, convertFromRaw, EditorState } from 'draft-js'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import ListIcon from 'material-ui/svg-icons/action/view-list'
import { translate as t } from 'browser/containers/Translator'

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
						{/* TOP BUTTONS */}
						<Row>
							<Col xs={12} className="SkillPage__buttons">
								<Link
									className="SkillPage__button--left"
									to={`/skill/${skill.get('slug')}/dev`}
								>
									<RaisedButton
										primary
										label={t('discussion')}
										icon={<ListIcon />}
									/>
								</Link>
								{/* <Link
								className="SkillPage__button--right"
								to={`/skill/${skill.get('slug')}/edit`}
								>
								<RaisedButton
								primary
								label={t('edit')}
								icon={<EditIcon />}
								/>
								</Link> */}
							</Col>
						</Row>
						<Row>
							{/* FLOATING EDIT BUTTON */}
							<Link
								className="SkillPage__edit-button"
								to={`/skill/${skill.get('slug')}/edit`}
							>
								<FloatingActionButton secondary={true}>
									<EditIcon />
								</FloatingActionButton>
							</Link>
							<Col xs={12}>
								{/* <VK apiId={Number(process.env.VK_ID)}>
									<Like
										options={{type: "full", verb: 1}}
										onLike={quantity => console.log(quantity)}
									/>
								</VK> */}
								<h1>{skill.get('name')}</h1>
								<img
									src={skill.get('image')}
									className="SkillPage__logo"
									alt={skill.get('name') + t('things_image')}
								/>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<Paper>
									<article>
										<Tabs className="SkillPage__tabs">
											{
												tabNames.map((name, index) => {
													return <Tab className="SkillPage__tab" label={name} key={index}>
																<Editor
																	readOnly={true}
																	toolbarHidden={true}
																	editorState={EditorState.createWithContent(convertFromRaw(text['stage' + index]))}
																/>
															</Tab>
												})
											}
										</Tabs>
									</article>
								</Paper>
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