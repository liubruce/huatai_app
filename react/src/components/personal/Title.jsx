import React from 'react'
import {browserHistory} from 'react-router'
import { message} from 'antd';
// import * as tool from '../../config/tools'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
class Title extends React.Component {
	constructor(args) {
		super()
		this.state = {
			title:'',
		}
	}
	componentWillReceiveProps(nextProps) {
		this.checkUrl(nextProps.pathname)
	}
	componentWillMount() {
		this.checkUrl(this.props.pathname)
	}
	checkUrl(pathname) {
		let title:'标题',channelId=localStorage.getItem('channelId');
		if (pathname.indexOf('/StoryLine') !== -1) {
			title=(channelId==='4'?'星行世界':'蜂行世界')
		}
		if (pathname.indexOf('/PersonalCenter') !== -1) {
			title='我的名片'
		}
		if (pathname.indexOf('/MyArticle') !== -1) {
			title=(channelId==='4'?'我的星行圈':'我的蜂行圈')
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
		if (pathname.indexOf('/AnswerOnline') !== -1) {
			title='在线答题'
		}
		if (pathname.indexOf('/EditUser') !== -1) {
			title='编辑'
		}
		if (pathname.indexOf('/StoryDetails') !== -1) {
			title=(channelId==='4'?'星行世界':'蜂行世界')
		}
		if (pathname.indexOf('/IntegralRules') !== -1) {
			title='积分规则'
		}
		if (pathname.indexOf('/MyPDF') !== -1) {
			title='在线查看'
		}
		// if (pathname.indexOf('/Mydirect') !== -1) {
		// 	title='我的私信'
		// }
		if (pathname.indexOf('/TestPaper') !== -1) {
			title='在线测试'
		}
		if (pathname.indexOf('/RandomPaper') !== -1) {
			title='随机考试'
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