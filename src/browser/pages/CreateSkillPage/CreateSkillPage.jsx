// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Editor } from 'react-draft-wysiwyg'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
// project files
import Loading from 'browser/components/Loading'
import SkillTabs from 'browser/components/SkillTabs'
import PageWrapper from 'browser/components/PageWrapper'
import { insertSkill } from 'browser/redux/skill/SkillActions'
import { translate as t } from 'browser/containers/Translator'
import { first, second, third, fourth } from 'browser/templates'
import { WysiwygEditor } from 'browser/components/WysiwygEditor'

const defaultTexts = [first, second, third, fourth]
const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]

class CreateSkillPage extends PureComponent {

	state = {
		name: '',
		nameError: '',
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
		this.setState({tabs: this.renderTabs()})
	}

	onNameChange = (event, name) => {
		if (name.length == 0) this.setState({ nameError: t('cannot_be_empty') })
		this.setState({
			name,
			pristine: false,
			nameError: this.props.UserId ? '' : t('please_login')
		})
	}

	onLogoChange = (event, image) => {
		this.setState({image})
	}

	// TODO submit is activated before tabs are visited (on pressing enter key)
	handleSubmit = event => {
		event.preventDefault()
		console.log('SUBMIT IS CALLED!!');
		const { state, props } = this
		const { editor0, editor1, editor2, editor3 } = state
		const 	firstHtml = convertFromHTML(first),
				secondHtml = convertFromHTML(second),
				thirdHtml = convertFromHTML(third),
				fourthHtml = convertFromHTML(fourth)
				// console.log('editor0: ', editor0);
				// console.log('editor1: ', editor1);
		const text = JSON.stringify({
			stage0: editor0 || convertToRaw(ContentState.createFromBlockArray(firstHtml.contentBlocks, firstHtml.entityMap)),
			stage1: editor1 || convertToRaw(ContentState.createFromBlockArray(secondHtml.contentBlocks, secondHtml.entityMap)),
			stage2: editor2 || convertToRaw(ContentState.createFromBlockArray(thirdHtml.contentBlocks, thirdHtml.entityMap)),
			stage3: editor3 || convertToRaw(ContentState.createFromBlockArray(fourthHtml.contentBlocks, fourthHtml.entityMap)),
		})
		const payload = {
			text,
			name: state.name,
			image: state.image,
		}
		// console.log('state', convertToRaw(payload.stage0))

		console.log('payload: ', payload);
		props
			.insertSkill(payload)
			.then(({payload}) => {
				console.log('payload: ', payload);
				console.log('then!')
				this.props.router.push('/skill/' + payload.slug)
			})
	}

	onEditorStateChange = (editorIndex, contentState) => {
		this.setState({
			pristine: false,
			['editor' + editorIndex]: contentState,
		})
	}

	// currently this is obsolete
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

	createText = () => {
		const text = {}
		tabNames.forEach((name, index) => {

			let defaultEditorState = EditorState.createEmpty()
			if (process.env.BROWSER) {
				console.log('createText: ');
				const blocksFromHTML = convertFromHTML(defaultTexts[index])
				// defaultEditorState = EditorState.createWithContent(
				defaultEditorState = convertToRaw(
					ContentState.createFromBlockArray(
						blocksFromHTML.contentBlocks,
						blocksFromHTML.entityMap
					)
				)
			}

			text['stage' + index] = defaultEditorState
		})
		return text
	}

    render() {
		const { props, state } = this
		return 	<PageWrapper
					className='CreateSkillPage'
					loading={props.loading}
				>
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
							name="image"
							value={state.image}
							errorText={state.imageError}
							onChange={this.onLogoChange}
							disabled={state.validating}
							hintText={t('skill_logo_not_required')} />
						{
							state.image
							&& 	<center>
									<Col xs={12} sm={6} md={4} lg={3}>
										<img
											src={state.image}
											alt={state.name + t('things_image')}
											className="CreateSkillPage__logo" />
									</Col>
								</center>
						}
						{
							process.env.BROWSER &&
							<SkillTabs
								readOnly={false}
								text={this.createText()}
								onChange={this.onEditorStateChange}
								className="EdtiSkillPage__tabs" />
						}
						{/* <Paper>
							{this.state.tabs}
						</Paper> */}
						<center>
							<RaisedButton
								type="submit"
								primary={true}
								label={t('submit')}
								className="CreateSkillPage__submit"
								disabled={Boolean(state.validating || state.pristine || state.nameError || state.imageError)} />
						</center>
					</form>
				</PageWrapper>
    }
}

CreateSkillPage.propTypes = {
	UserId: PropTypes.number,
}

export { CreateSkillPage }

export default
connect(
	(state, ownProps) => ({
		UserId: state.user.get('id'),
		...ownProps
	}),
    (dispatch, ownProps) => ({
		insertSkill: payload => dispatch(insertSkill(payload))
	})
)(CreateSkillPage)