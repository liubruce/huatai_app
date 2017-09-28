import React from 'react'
import  './myArticle.less'
import { message } from 'antd';
import * as tools from '../../../config/tools' 
import {Link} from 'react-router'
class UserCard extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:1,
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
		})
	}
	componentWillMount() {
	}
	render(){
		return(
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
                    <ul className="am-tabs-nav am-cf nav">
					<li className={this.state.tab===1?'am-active':null} onClick={()=>this.changeTab(1)}>
						<a >已发布</a>
					</li>
					<li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
						<a >审核中</a>
					</li>
					<li className={this.state.tab===3?'am-active':null} onClick={()=>this.changeTab(3)}>
						<a >未通过</a>
					</li>
				</ul>
                <div className="am-tabs-bd">
                   <div className="am-tabs-bd">    
                       <div className="am-panel">
							<div className="am-panel-bd">
								<Link to='/App/
								/ArticleDetail'>
									<article className="am-article">
									  	<div className="am-article-hd">
									   		<h1 className="am-article-title">如何用保险保障自己的一生？</h1>
									  	</div>
									  	<div className="am-article-bd">
									    	<p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
									    	<ul className="am-avg-sm-3 am-thumbnails">
												<li><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></li>
												<li><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></li>
												<li><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></li>
											</ul>
									  	</div>
									</article>
								</Link>
								<p className="like">2017.06.18  15:50</p>
							</div>
                            </div>
						</div>
                </div>
				</div>
			</div>

		)
	}
}


export default UserCard