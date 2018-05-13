// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import { Col } from 'react-styled-flexboxgrid'
import { checkForImageUrl } from 'shared/parsers'
import RaisedButton from 'material-ui/RaisedButton'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
// project files
import SkillTabs from 'browser/components/SkillTabs'
import PageWrapper from 'browser/components/PageWrapper'
import { togglePageLoading } from 'browser/redux/ui/UiActions'
import { translate as t } from 'browser/containers/Translator'
import { insertSkill } from 'browser/redux/skill/SkillActions'
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
		const imageError = image && !checkForImageUrl(image) && t('something_wrong_with_this_url')
		this.setState({image, imageError})
	}

	// TODO submit is activated before tabs are visited (on pressing enter key)
	handleSubmit = event => {
		console.log('SUBMIT IS CALLED!!');
		event.preventDefault()
		const { state, props } = this
		const { editor0, editor1, editor2, editor3 } = state
		const 	firstHtml = convertFromHTML(first),
				secondHtml = convertFromHTML(second),
				thirdHtml = convertFromHTML(third),
				fourthHtml = convertFromHTML(fourth)
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
		this.setState({validating: true})
		props.toggleLoading(true)
		return props
			.insertSkill(payload)
			.then(({payload}) => {
				props.toggleLoading(false)
				props.router.push('/skill/' + payload.slug)
			})
			// catch errors and depending on error status set error message
			.catch(error => {
				console.log('error: ', error);

				let nameError = ""
				switch (error.status) {
					case 409:
						nameError = t('skill_already_exists')
						break;
					case 401:
						nameError = t('please_login')
						break;
					default:
						nameError = t('error_occured')
				}

				props.toggleLoading(false)
				this.setState({
					nameError,
					validating: false,
				})
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
					loading={props.loading}
					className='CreateSkillPage'
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
							&& !state.imageError
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
		insertSkill: payload => dispatch(insertSkill(payload)),
		toggleLoading: boolean => dispatch(togglePageLoading(boolean)),
	})
)(CreateSkillPage)