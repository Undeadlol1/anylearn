import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Row, Col } from 'react-styled-flexboxgrid'
import { translate as t, detectLocale } from 'browser/containers/Translator'
import { ContentState, convertFromHTML, convertToRaw, convertFromRaw, EditorState } from 'draft-js'

class SkillTabs extends Component {
	render() {
		const {props} = this
		const className = cls(props.className, "SkillTabs")
		const tabNames = [t('novice'), t('scholar'), t('trainee'), t('master')]
		const tabsClassNames = cls('SkillTabs__tabs', props.readOnly && 'SkillTabs__editor-readOnly')
		return 	<Row className={className}>
					<Col xs={12}>
						<Paper zDepth={5}>
							<article>
								<Tabs className={tabsClassNames}>
									{
										tabNames.map((name, index) =>
											<Tab className="SkillTabs__tab" label={name} key={index}>
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
}

export { SkillTabs }
export default connect(
	// stateToProps
	(state, ownProps) => ({ ...ownProps }),
	// dispatchToProps
    (dispatch, ownProps) => ({})
)(SkillTabs)