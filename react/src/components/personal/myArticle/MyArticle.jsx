import React from 'react'
import  './myArticle.less'
import { message } from 'antd';
import * as tools from '../../../config/tools'
import * as api from '../../../config/api'


class UserCard extends React.Component{
	constructor(args) {
		super()
		this.state={
			// userCard:[],
			// tab:0,
		}
	}
	changeTab(tab) {
		this.setState({
			//tab: tab
		})
	}
	// show(){
	// 	api.userCard().then((data)=>{
	// 		if (data.result === 'RC100') {
	// 			this.setState({
	// 				userCard:data.obj.data
	// 			})
	// 		}else{
	// 			message.error(data.errMsg, 3);
	// 		}
	// 	})
	// }
	componentWillMount() {
		//this.show()
	}
	render(){
		//console.log(this.state.tab === 0)
		return(
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
                    <ul className="am-tabs-nav am-cf nav">
					<li className="am-active">
						<a >已发布</a>
					</li>
					<li className="">
						<a >审核中</a>
					</li>
					<li className="">
						<a >未通过</a>
					</li>
				</ul>
                <div className="am-tabs-bd">
                   <div className="am-tabs-bd">    
                       <div className="am-panel">
							<div className="am-panel-bd">
								<a>
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
								</a>
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