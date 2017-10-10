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