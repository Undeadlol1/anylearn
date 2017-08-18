// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Editor } from 'react-draft-wysiwyg'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { translate as t } from 'browser/containers/Translator'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
// project files
import Loading from 'browser/components/Loading'
import PageWrapper from 'browser/components/PageWrapper'
import { first, second, third, fourth } from 'browser/templates'
import { WysiwygEditor } from 'browser/components/WysiwygEditor'

const defaultTexts = [first, second, third, fourth]
const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]

class CreateSkillPage extends PureComponent {

	state = {
		name: '',
		nameError: '',
		logo: '',
		logoError: '',
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
		this.setState({name})
	}

	onLogoChange = (event, logo) => {
		this.setState({logo})
	}

	// TODO submit is activated before tabs are visited (on pressing enter key)
	handleSubmit = event => {
		event.preventDefault()
		console.log('SUBMIT IS CALLED!!');
		const { state, props } = this
		const payload = {
			name: state.name,
			logo: state.logo,
			stage0: state.editor0 || convertFromHTML(first),
			stage1: state.editor1 || convertFromHTML(second),
			stage2: state.editor2 || convertFromHTML(third),
			stage3: state.editor3 || convertFromHTML(fourth),
		}
	}

	onEditorStateChange = (editorIndex, contentState) => {
		this.setState({
			['editor' + editorIndex]: contentState
		})
	}

	renderTabs = () => {
		const tabs = tabNames.map((tab, index) => {
			return <Tab label={tabNames[index]} key={index}>
						<WysiwygEditor defaultState={defaultTexts[index]} onChange={this.onEditorStateChange.bind(this, index)} />
					</Tab>
		})
		return 	<Tabs className="CreateSkillPage__tabs">
					{tabs}
				</Tabs>
	}

    render() {
		const { props, state } = this
		return 	<PageWrapper
					className='CreateSkillPage'
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
								hintText={t('skill_name')} />
							<TextField
								fullWidth
								type="url"
								name="logo"
								value={state.logo}
								errorText={state.logoError}
								onChange={this.onLogoChange}
								disabled={state.validating}
								hintText={t('skill_logo_not_required')} />
							{this.state.tabs}
							<center><RaisedButton type="submit" label={t('submit')} /></center>
						</form>
					</Grid>
				</PageWrapper>
    }
}

CreateSkillPage.propTypes = {
	// prop: PropTypes.object,
}

export { CreateSkillPage }

export default
connect(
	(state, ownProps) => ({
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({})
)(CreateSkillPage)