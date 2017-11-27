import cx from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import React, { PureComponent } from 'react'
import MoodsList from 'browser/components/MoodsList'
import { translate as t } from 'browser/containers/Translator'

export class MoodTabs extends PureComponent {
	static propTypes = {
		new: PropTypes.object.isRequired,
		random: PropTypes.object.isRequired,
		popular: PropTypes.object.isRequired,
	}
	render() {
		const { props } = this
		const classNames = cx('MoodTabs', props.className)
		return <MoodsList
					selector="popular"
					// TODO this is a problem
					skills={props.skills}
					totalPages={props.popular.get('totalPages')}
					currentPage={props.popular.get('currentPage')} />
		// return 	<Tabs className={classNames}>
		// 			<Tab label={t('popular')}>
		// 				<MoodsList
		// 					selector="popular"
		// 					// TODO this is a problem
		// 					skills={props.skills}
		// 					totalPages={props.popular.get('totalPages')}
		// 					currentPage={props.popular.get('currentPage')} />
		// 			</Tab>
		// 			 <Tab label={t('new')}>
		// 				<MoodsList
		// 					selector="new"
		// 					// TODO this is a problem
		// 					skills={props.skills}
		// 					totalPages={props.new.get('totalPages')}
		// 					currentPage={props.new.get('currentPage')} />
		// 			</Tab>
		// 			<Tab label={t('random')}>
		// 				<MoodsList
		// 					selector="random"
		// 					// TODO this is a problem
		// 					skills={props.skills}
		// 					totalPages={props.random.get('totalPages')}
		// 					currentPage={props.random.get('currentPage')} />
		// 			</Tab>
		// 		</Tabs>
	}
}

export default connect(
	// state to props
	({ skill, mood }, ownProps) => {
		return {
			skills: skill.get('skills'),
			new: mood.get('new'),
			random: mood.get('random'),
			popular: mood.get('popular'),
			...ownProps
		}
	}
)(MoodTabs)