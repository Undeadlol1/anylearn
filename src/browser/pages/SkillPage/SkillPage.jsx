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
		const { props } = this
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		const description = convertFromRaw(props.text.stage0).getFirstBlock().get('text')
		return 	<PageWrapper
					title={props.name}
					image={props.image}
					className='SkillPage'
					loading={props.loading}
					description={description}
				>
					{/* TOP BUTTONS */}
					<Row>
						<Col xs={12} className="SkillPage__buttons">
							<Link
								to={`/skill/${props.slug}/dev`}
								className="SkillPage__button--right"
							>
								<RaisedButton
									primary
									icon={<ListIcon />}
									label={t('for_teachers')}
								/>
							</Link>
							{/* <Link
							className="SkillPage__button--right"
							to={`/skill/${props.slug}/edit`}
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
							to={`/skill/${props.slug}/edit`}
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
							<h1>{props.name}</h1>
							{
								props.image && <img
									src={props.image}
									className="SkillPage__logo"
									alt={props.name + t('things_image')}
								/>
							}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<Paper>
								<article>
									<Tabs className="SkillPage__tabs">
										{
											tabNames.map((name, index) => 
												<Tab className="SkillPage__tab" label={name} key={index}>
													<Editor
														readOnly={true}
														toolbarHidden={true}
														editorState={EditorState.createWithContent(convertFromRaw(props.text['stage' + index]))}
													/>
												</Tab>
											)
										}
									</Tabs>
								</article>
							</Paper>
						</Col>
					</Row>
				</PageWrapper>
    }
}

SkillPage.propTypes = {
	name: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	text: PropTypes.object.isRequired,
	image: PropTypes.string.isRequired,
}

export { SkillPage }

export default
connect(
	({skill}, ownProps) => ({
		...ownProps,
		name: skill.get('name'),
		slug: skill.get('slug'),
		image: skill.get('image'),
		text: JSON.parse(skill.getIn(['revision', 'text'])),		
	}),
)(SkillPage)