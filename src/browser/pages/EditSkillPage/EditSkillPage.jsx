// dependencies
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Editor } from 'react-draft-wysiwyg'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { EditorState, ContentState, convertFromHTML, convertToRaw, convertFromRaw  } from 'draft-js'
// project files
import Loading from 'browser/components/Loading'
import SkillTabs from 'browser/components/SkillTabs'
import PageWrapper from 'browser/components/PageWrapper'
import { updateSkill } from 'browser/redux/skill/SkillActions'
import { WysiwygEditor } from 'browser/components/WysiwygEditor'
import { translate as t, detectLocale } from 'browser/containers/Translator'

const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]

class EditSkillPage extends PureComponent {

	state = {
		name: '',
		nameError: '',
		description: '',
		descriptionError: '',
		image: '',
		imageError: '',
		pristine: true,
		validating: false,
		tabs: null, // TODO comment
		editor0: '',
		editor1: '',
		editor2: '',
		editor3: '',
	}

	componentDidMount() {
		this.setState({
			tabs: this.renderTabs()
		})
	}

	onNameChange = (event, name) => {
		if (name.length == 0) this.setState({ nameError: t('cannot_be_empty') })
		this.setState({
			name,
			pristine: false,
			nameError: this.props.UserId ? '' : t('please_login')
		})
	}

	onLogoChange = (event, image) => this.setState({image})

	onDescriptionChange = (event, description) => this.setState({description})

	// TODO submit is activated before tabs are visited (on pressing enter key)
	handleSubmit = event => {
		console.log('handleSubmit!!');
		event.preventDefault()
		const { state, props } = this
		const { editor0, editor1, editor2, editor3 } = state

		const originalText = props.text
		const newText = JSON.stringify({
			stage0: editor0 || originalText.stage0,
			stage1: editor1 || originalText.stage1,
			stage2: editor2 || originalText.stage2,
			stage3: editor3 || originalText.stage3,
		})

		return props
			.updateSkill({
				text: newText,
				name: state.name,
				image: state.image,
				parentId: props.SkillId,
				previousId: props.previousId,
				description: state.description,
			})
			.then(({payload}) => {
				console.log('payload: ', payload);
				return props.router.push('/skill/' + payload.slug)
			})
	}

	onEditorChange = (editorIndex, contentState) => {
		this.setState({
			pristine: false,
			['editor' + editorIndex]: contentState,
		})
	}

	// currently obsolete
	renderTabs = () => {
		// TODO: add json parsing in reducer?
		const { text } = this.props
		return 	<Tabs className="EditSkillPage__tabs">
					{
						tabNames.map((name, index) =>
							<Tab label={name} key={index}>
								<Editor
									localization={{locale: detectLocale()}}
									initialContentState={text['stage' + index]}
									onChange={this.onEditorChange.bind(this, index)}
								/>
							</Tab>
						)
					}
				</Tabs>
	}

    render() {
		const { props, state } = this
		return 	<PageWrapper
					image={props.image}
					className='EditSkillPage'
					title={`Редактировать навык "${props.name}"`}
				>
					<form onSubmit={this.handleSubmit}>
						<SkillTabs
							readOnly={false}
							text={props.text}
							onChange={this.onEditorChange}
							className="EdtiSkillPage__tabs" />
						{/* {this.state.tabs} */}
						<TextField
							fullWidth
							required
							name="name"
							value={state.name}
							errorText={state.nameError}
							onChange={this.onNameChange}
							disabled={state.validating}
							hintText={t('change_name')} />
						<TextField
							rows={2}
							fullWidth
							multiLine={true}
							name="description"
							value={state.description}
							errorText={state.descriptionError}
							onChange={this.onDescriptionChange}
							disabled={state.validating}
							hintText={t('description_not_required')} />
						{/* <TextField
							fullWidth
							type="url"
							name="image"
							value={state.image}
							errorText={state.imageError}
							onChange={this.onLogoChange}
							disabled={state.validating}
							hintText={t('skill_logo_not_required')} /> */}
						<center>
							<RaisedButton
								type="submit"
								primary={true}
								label={t('submit')}
								disabled={Boolean(state.pristine || state.nameError || state.imageError)} />
						</center>
					</form>
				</PageWrapper>
    }
}

EditSkillPage.defaultProps = {
	// skill: fromJS({})
}

EditSkillPage.propTypes = {
	// skill: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	text: PropTypes.object.isRequired,
	UserId: PropTypes.number.isRequired,
	SkillId: PropTypes.string.isRequired,
	previousId: PropTypes.string.isRequired,
}

export { EditSkillPage }

export default
connect(
	(state, ownProps) => ({
		...ownProps,
		UserId: state.user.get('id'),
		name: state.skill.get('name'),
		image: state.user.get('image'),
		SkillId: state.skill.get('id'),
		previousId: state.skill.getIn(['revision', 'id']),
		text: JSON.parse(state.skill.getIn(['revision', 'text'])),
	}),
    (dispatch, ownProps) => ({
		updateSkill: payload => dispatch(updateSkill(payload))
	})
)(EditSkillPage)