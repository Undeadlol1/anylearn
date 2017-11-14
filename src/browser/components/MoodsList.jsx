import { fetchMoods } from 'browser/redux/actions/MoodActions'
import Pagination from 'react-ultimate-pagination-material-ui'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { translate } from 'browser/containers/Translator'
import { Row, Col } from 'react-styled-flexboxgrid'
import Link from 'react-router/lib/Link'
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import selectn from 'selectn'
import Loading from 'browser/components/Loading'

const itemStyles = {
	marginBottom: '1rem'
}

export class MoodsList extends Component {

	renderItems = () => {
		const { props } = this
		if(props.moods.size) {
			return props.moods.map( mood => {
					const nodeContent = mood.get('image')
					const src = nodeContent
								? nodeContent
								: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
					return	<Col className="MoodsList__item" style={itemStyles} xs={12} sm={6} md={4} lg={4} key={mood.get('id')}>
								<Paper zDepth={5}>
									<Link to={`/mood/${mood.get('slug')}`}>
										<Card>
											<CardMedia overlay={<CardTitle title={mood.get('name')} />}>
												<img alt={mood.get('name') + translate('things_image')} src={src} height="600" width="400" />
											</CardMedia>
										</Card>
									</Link>
								</Paper>
							</Col>
			})
		}
		else return	<Col xs={12} className={'MoodsList__empty'}>
						<b>
							<i>{translate('list_is_empty')}...</i>
						</b>
					</Col>
	}

	render() {
		const { props } = this
		if (props.loading) return <Loading />
		return  <section className="MoodsList">
					<Row>
						{this.renderItems()}
					</Row>
					<Row>
						<div className='MoodsList__pagination-wrapper'>
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
									className='MoodsList__pagination'
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

MoodsList.propTypes = {
  moods: PropTypes.object.isRequired,
  selector: PropTypes.string,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
}

MoodsList.defaultProps = {
	moods: fromJS([
		{
			id: 1,
			name: 'Верстка веб-сайтов',
			// image: 'https://wiki.selfhtml.org/images/thumb/7/78/HTML-CSS-JS.svg/400px-HTML-CSS-JS.svg.png',
			image: 'http://www.doclicksolutions.com/img/web_training.png',
		},
		{
			id: 2,
			name: 'Front-end разработка',
			image: 'https://camo.githubusercontent.com/41f5aa64e0930a781b0962898b4aff4db06f9560/68747470733a2f2f63646e2e7261776769742e636f6d2f7368616e6e6f6e6d6f656c6c65722f66726f6e742d656e642d6c6f676f2f6d61737465722f6578706f7274732f66726f6e742d656e642d6c6f676f2d636f6c6f722e737667',
		},
		{
			id: 3,
			name: 'Meteor',
			image: 'https://d14xs1qewsqjcd.cloudfront.net/assets/og-image-logo.png',
		}
	]),
	totalPages: 0,
	currentPage: 0,
}

export default connect(
	// stateToProps
	({mood}, ownProps) => ({
		loading: mood.get('loading'),
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({
		changePage(page) {
			dispatch(fetchMoods(ownProps.selector, page))
		}
    })
)(MoodsList)
