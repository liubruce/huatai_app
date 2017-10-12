import React from 'react'
import {browserHistory} from 'react-router'
// import * as tool from '../../config/tools'
class Title extends React.Component {
	constructor(args) {
		super()
		this.state = {
			title:''
		}
	}
	componentWillMount() {
		let pathname = this.props.pathname;
		let title:'标题';
		if (pathname.indexOf('/StoryLine') !== -1) {
			title='故事线'
		}
		if (pathname.indexOf('/PersonalCenter') !== -1) {
			title='我的名片'
		}
		if (pathname.indexOf('/MyArticle') !== -1) {
			title='我的蜂行圈'
		}
		if (pathname.indexOf('/ArticleDetail') !== -1) {
			title='课程详情'
		}
		if (pathname.indexOf('/NewsCenter') !== -1) {
			title='任务中心'
		}
		if (pathname.indexOf('/Dynamic') !== -1) {
			title='动态'
		}
		if (pathname.indexOf('/Collector') !== -1) {
			title='收藏夹'
		}
		if (pathname.indexOf('/Library') !== -1) {
			title='图书馆'
		}
		if (pathname.indexOf('/PointShop') !== -1) {
			title='积分商城'
		}
		if (pathname.indexOf('/PointDetail') !== -1) {
			title='积分详情'
		}
		if (pathname.indexOf('/Set') !== -1) {
			title='设置'
		}
		if (pathname.indexOf('/CourseTop') !== -1) {
			title='点击榜'
		}
		if (pathname.indexOf('/StudentTop') !== -1) {
			title='学霸榜'
		}
		if (pathname.indexOf('/courseDetail') !== -1) {
			title='课程详情'
		}
		if (pathname.indexOf('/ArticleDetail') !== -1) {
			title='文章详情'
		}
		
		
		this.setState({
			title
		})
	}
	render(){
		return(
					<header className="header">
		            	<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
		            	<h1>{this.state.title}</h1>
		            </header>
			)
	}
}
export default Title;