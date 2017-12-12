import { fetchRevisions } from 'browser/redux/skill/SkillActions'
import Pagination from 'react-ultimate-pagination-material-ui'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { translate } from 'browser/containers/Translator'
import { Row, Col } from 'react-styled-flexboxgrid'
import {List, ListItem} from 'material-ui/List'
import Link from 'react-router/lib/Link'
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import Loading from 'browser/components/Loading'
import selectn from 'selectn'

export class RevisionsList extends Component {

	renderItems = () => {
		const { props } = this
		if(selectn('revisions.size', props)) {
			return props.revisions.map( revision => {
				const id = revision.get('id')
				return	<Link
							key={id}
							to={`/skill/${props.skillSlug}/revision/${id}`}
							className="RevisionsList__item"
						>
							<ListItem
								primaryText={revision.get('name')}
							/>
						</Link>
			})
		}
		else return	<ListItem
						className={'RevisionsList__empty'}
						primaryText={<b>
										<i>{translate('list_is_empty')}...</i>
									</b>}
					/>
	}

	render() {
		const { props } = this
		if (props.loading) return <Loading />
		return  <section className="RevisionsList">
					<Row>
						<List>
							{this.renderItems()}
						</List>
					</Row>
					<Row>
						<div className='RevisionsList__pagination-wrapper'>
							{/*Created UltimatePagination component has the following interface:

								currentPage: number - current page number
								totalPages: number - total number of pages
								boundaryPagesRange: number, optional, default: 1 - number of always visible pages at the beginning and end
								siblingPagesRange: number, optional, default: 1 - number of always visible pages before and after the current one
								hideEllipsis: bool, optional, default: false - boolean flag to hide ellipsis
								hidePreviousAndNextPageLinks: bool, optional, default: false - boolean flag to hide previous and next page links
								hideFirstAndLastPageLink: bool, optional, default: false - boolean flag to hide first and last page links
								onChange: function - callback that will be called with new page when it should be changed by user interaction (optional)*/}
							{
								props.totalPages > 1
								? <Pagination
									style={{ margin: '0 auto' }}
									className='RevisionsList__pagination'
									onChange={props.changePage}
									currentPage={props.currentPage}
									totalPages={props.totalPages}
									hidePreviousAndNextPageLinks={true}
									hideFirstAndLastPageLink={true} />
								: null
							}
						</div>
					</Row>
				</section>
	}
}

RevisionsList.propTypes = {
  skillSlug: PropTypes.string.isRequired,
  revisions: PropTypes.object.isRequired,
  selector: PropTypes.string,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  SkillId: PropTypes.string.isRequired,
}

RevisionsList.defaultProps = {
	totalPages: 0,
	currentPage: 0,
}

export default connect(
	// stateToProps
	({skill}, ownProps) => {
		// use "fromJS" to avoid bugs
		// (on server side deep object property might be plain object instead of immutable Map)
		// this might get fixed in fututre (see: store.js)
		const revisions = fromJS(skill.get('revisions'))
		return {
			skillSlug: skill.get('slug'),
			loading: skill.get('loading'),
			revisions: revisions.get('values'),
			totalPages: revisions.get('totalPages'),
			currentPage: revisions.get('currentPage'),
			...ownProps
		}
	},
	// dispatchToProps
    (dispatch, ownProps) => ({
		changePage(page) {
			console.log('ownProps: ', ownProps);
			dispatch(fetchRevisions(ownProps.SkillId, page))
		}
    })
)(RevisionsList)
