import { fetchMoods } from 'browser/redux/actions/MoodActions'
import Pagination from 'react-ultimate-pagination-material-ui'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { translate } from 'browser/containers/Translator'
import { Row, Col } from 'react-styled-flexboxgrid'
import Loading from 'browser/components/Loading'
import Link from 'react-router/lib/Link'
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import selectn from 'selectn'

const itemStyles = {
	marginBottom: '1rem'
}

export class SkillsList extends Component {

	renderItems = () => {
		const { props } = this
		console.log('props.skills: ', props.skills.toJS());
		if(props.skills.size) {
			return props.skills.map( skill => {
				console.log('skill', skill)
				const src = skill.get('image')
							? skill.get('image')
							: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
				return	<Col className="SkillsList__item" style={itemStyles} xs={12} sm={6} md={4} lg={3} key={skill.get('id')}>
							<Paper zDepth={5}>
								<Link to={`/skill/${skill.get('slug')}`}>
									<Card>
										<CardMedia overlay={<CardTitle title={skill.get('name')} />}>
											<img alt={skill.get('name') + translate('things_image')} src={src} />
										</CardMedia>
									</Card>
								</Link>
							</Paper>
						</Col>
			})
		}
		else return	<Col xs={12} className={'SkillsList__empty'}>
						<b>
							<i>{translate('list_is_empty')}...</i>
						</b>
					</Col>
	}

	render() {
		const { props } = this
		if (props.loading) return <Loading />
		return  <section className="SkillsList">
					<Row>
						{this.renderItems()}
					</Row>
					<Row>
						<div className='SkillsList__pagination-wrapper'>
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
									className='SkillsList__pagination'
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

SkillsList.propTypes = {
  skills: PropTypes.object.isRequired,
  selector: PropTypes.string,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
}

SkillsList.defaultProps = {
	skills: List(),
	totalPages: 0,
	currentPage: 0,
}

export default connect(
	// stateToProps
	({skill}, ownProps) => ({
		loading: skill.get('loading'),
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({
		changePage(page) {
			dispatch(fetchMoods(ownProps.selector, page))
		}
    })
)(SkillsList)
