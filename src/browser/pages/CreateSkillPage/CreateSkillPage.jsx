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
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
// project files
import Loading from 'browser/components/Loading'
import PageWrapper from 'browser/components/PageWrapper'
import { first, second, third, fourth } from 'browser/templates'

const defaultTexts = [first, second, third, fourth]
// anylearn specific
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
		// if (logo.length == 0) this.setState({ logoError: t('cannot_be_empty') })
		this.setState({logo})
	}

	handleSubmit = event => {
		event.preventDefault()
		console.log('SUBMIT IS CALLED!!');
		// TODO submit is activated before tabs are visited (on pressing enter key)
	}

	onEditorStateChange = some => {
		console.log('some: ', some._immutable.toJS());

	}

	renderTabs = () => {
		const tabs = tabNames.map((tab, index) => {
			let defaultState
			if (process.env.BROWSER) {
				const blocksFromHTML = convertFromHTML(defaultTexts[index])
				defaultState = process.env.BROWSER ?
								EditorState.createWithContent(ContentState.createFromBlockArray(
									blocksFromHTML.contentBlocks,
									blocksFromHTML.entityMap
								))
							: undefined
			}
			return <Tab label={tabNames[index]} key={index}>
						<Editor
							defaultEditorState={defaultState}
							onEditorStateChange={this.onEditorStateChange}
						/>
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
								autoFocus
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
)(CreateSkillPage)