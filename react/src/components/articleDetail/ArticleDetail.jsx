import React from 'react'
import  './ArticleDetail.less'
import { message } from 'antd';
import * as tools from '../../config/tools' 


class ArticleDetail extends React.Component{
	constructor(args){
		super()
		this.state={
		}
	}
	render(){
		return(
			<div className="warpper">
				<div className="am-panel article-details">
					<article className="am-article">
					  	<div className="am-article-hd">
					   		<h1 className="am-article-title">如何用保险保障自己的一生？</h1>
					   		<p className="like">2017.06.18 15:50</p>
					  	</div>
					  	<div className="am-article-bd">
					    	<p className="am-article-lead">希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
					    	<p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
					    	<p className="am-article-lead">希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
					    	<p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
					    	<p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
					    	<ul className="am-avg-sm-3 am-thumbnails">
								<li><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></li>
								<li><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></li>
								<li><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></li>
							</ul>
					  	</div>
					</article>
				</div>
			</div>


		)
	}

}
export default ArticleDetail