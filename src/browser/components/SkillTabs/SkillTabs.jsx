import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Row, Col } from 'react-styled-flexboxgrid'
import { actions } from 'browser/redux/skill/SkillActions'
import { translate as t, detectLocale } from 'browser/containers/Translator'
import { ContentState, convertFromHTML, convertToRaw, convertFromRaw, EditorState } from 'draft-js'

class SkillTabs extends Component {
	render() {
		const {props} = this
		const className = cls(props.className, "SkillTabs")
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		const tabsClassNames = cls('SkillTabs__tabs', props.readOnly && 'SkillTabs__editor-readOnly')
		console.log('props.currentTab: ', props.currentTab);
		return 	<Row className={className}>
					<Col xs={12}>
						<Paper zDepth={3}>
							<article>
								<Tabs className={tabsClassNames} onChange={props.changeTab} value={props.currentTab}>
									{
										tabNames.map((name, index) =>
											<Tab className="SkillTabs__tab" label={name} value={index} key={index}>
												<Editor
													readOnly={props.readOnly}
													toolbarHidden={props.readOnly}
													localization={{locale: detectLocale()}}
													initialContentState={props.text['stage' + index]}
													onChange={props.onChange && props.onChange.bind(this, index)}
												/>
											</Tab>
										)
									}
								</Tabs>
							</article>
						</Paper>
					</Col>
				</Row>
	}
}

SkillTabs.defaultProps = {
	readOnly: true,
}

SkillTabs.PropTypes = {
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	text: PropTypes.object.isRequired,
	changeTab: PropTypes.func.isRequired,
	currentTab: PropTypes.number.isRequired,
}

export { SkillTabs }
export default connect(
	// stateToProps
	(state, ownProps) => ({
		...ownProps,
		currentTab: state.skill.get('currentTab'), 
	 }),
	// dispatchToProps
    (dispatch, ownProps) => ({
		changeTab: value => {
			dispatch(actions.changeTab(value))
		}
	})
)(SkillTabs)