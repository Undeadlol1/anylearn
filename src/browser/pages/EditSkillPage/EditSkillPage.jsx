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
import PageWrapper from 'browser/components/PageWrapper'
import { updateSkill } from 'browser/redux/skill/SkillActions'
import { translate as t } from 'browser/containers/Translator'
import { WysiwygEditor } from 'browser/components/WysiwygEditor'

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

		const originalText = JSON.parse(this.props.skill.getIn(['revision', 'text']))
		const newText = JSON.stringify({
			stage0: editor0 || originalText.stage0,
			stage1: editor1 || originalText.stage1,
			stage2: editor2 || originalText.stage2,
			stage3: editor3 || originalText.stage3,
		})
		const payload = {
			text: newText,
			name: state.name,
			image: state.image,
			previousId: props.previousId,
			description: state.description,
			parentId: props.skill.get('id'),
		}

		props
			.updateSkill(payload)
			.then(({payload}) => {
				console.log('payload: ', payload);
				return this.props.router.push('/skill/' + payload.slug)
			})
	}

	onEditorChange = (editorIndex, contentState) => {
		this.setState({
			pristine: false,
			['editor' + editorIndex]: contentState,
		})
	}

	renderTabs = () => {
		// TODO add json parsing in reducer?
		const text = JSON.parse(this.props.skill.getIn(['revision', 'text']))
		const tabs = tabNames.map((name, index) =>
			<Tab label={name} key={index}>
				<Editor
					initialContentState={text['stage' + 0]}
					onChange={this.onEditorChange.bind(this, index)}
				/>
			</Tab>
		)
		return 	<Tabs className="EditSkillPage__tabs">
					{tabs}
				</Tabs>
	}

    render() {
		const { props, state } = this
		return 	<PageWrapper
					className='EditSkillPage'
					loading={props.loading}
				>
					<Grid fluid>
						<form onSubmit={this.handleSubmit}>
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
							<TextField
								fullWidth
								type="url"
								name="image"
								value={state.image}
								errorText={state.imageError}
								onChange={this.onLogoChange}
								disabled={state.validating}
								hintText={t('skill_logo_not_required')} />
							{this.state.tabs}
							<center>
								<RaisedButton
									type="submit"
									primary={true}
									label={t('submit')}
									disabled={Boolean(state.pristine || state.nameError || state.imageError)} />
							</center>
						</form>
					</Grid>
				</PageWrapper>
    }
}

EditSkillPage.defaultProps = {
	skill: fromJS({})
}

EditSkillPage.propTypes = {
	UserId: PropTypes.number,
	skill: PropTypes.object.isRequired,
	previousId: PropTypes.string.isRequired,
}

export { EditSkillPage }

export default
connect(
	(state, ownProps) => ({
		skill: state.skill,
		UserId: state.user.get('id'),
		previousId: state.skill.getIn(['revision', 'id']),
		...ownProps
	}),
    (dispatch, ownProps) => ({
		updateSkill: payload => dispatch(updateSkill(payload))
	})
)(EditSkillPage)