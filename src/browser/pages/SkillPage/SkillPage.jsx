// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Link from 'react-router/lib/Link'
import { Tabs, Tab } from 'material-ui/Tabs'
import React, { PureComponent } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import ListIcon from 'material-ui/svg-icons/action/view-list'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { ContentState, convertFromHTML, convertToRaw, convertFromRaw, EditorState } from 'draft-js'
// project files
import SkillTabs from 'browser/components/SkillTabs'
import SocialLike from 'browser/components/SocialLike'
import PageWrapper from 'browser/components/PageWrapper'
import ThreadsList from 'browser/components/ThreadsList'
import CommentsList from 'browser/components/CommentsList'
import { translate as t } from 'browser/containers/Translator'
import { fetchQuestions } from 'browser/redux/skill/SkillActions'
import CreateThreadFormOrButton from 'browser/components/CreateThreadFormOrButton'

class SkillPage extends PureComponent {
	render() {
		const { props } = this
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		const likeOptions = {type: "mini", verb: 1, height: 30, page_id: props.SkillId}
		const description = convertFromRaw(props.text.stage0).getFirstBlock().get('text')
		return 	<PageWrapper
					image={props.image}
					className='SkillPage'
					loading={props.loading}
					description={description}
					title={`Обучение навыку "${props.name}"`}
				>
					{/* TOP BUTTONS */}
					<Row>
						<Col xs={12} className="SkillPage__buttons">
							<SocialLike options={likeOptions} className="SkillPage__button--left" />
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
						</Col>
					</Row>
					{/* TITLE AND IMAGE */}
					<Row>
						<Col xs={12}>
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
					<SkillTabs
						readOnly={true}
						text={props.text}
						className="SkillPage__tabs"
					/>
					{/* USER QUESTIONS */}
					<CreateThreadFormOrButton
						parentId={props.SkillId}
						label={t('ask_a_question')}
						title={t('ask_a_question')}
					/>
					<b className="SkillPage__questionsTitle">
						{`${t('questions')}:`}
					</b>
					<ThreadsList
						threads={props.threads}
						parentId={props.SkillId}
						onChange={fetchQuestions}
					/>
					{/* FLOATING EDIT BUTTON */}
					<Link
						title={t('edit')}
						to={`/skill/${props.slug}/edit`}
						className="SkillPage__edit-button"
					>
						<FloatingActionButton secondary={true}>
							<EditIcon />
						</FloatingActionButton>
					</Link>
				</PageWrapper>
    }
}

SkillPage.propTypes = {
	name: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	text: PropTypes.object.isRequired,
	image: PropTypes.string.isRequired,
	// threads: PropTypes.object.isRequired,
	SkillId: PropTypes.string.isRequired,
}

export { SkillPage }

export default
connect(
	({skill}, ownProps) => ({
		...ownProps,
		name: skill.get('name'),
		slug: skill.get('slug'),
		SkillId: skill.get('id'),
		image: skill.get('image'),
		threads: skill.get('threads'),
		text: JSON.parse(skill.getIn(['revision', 'text'])),
	}),
)(SkillPage)