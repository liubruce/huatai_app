import React from 'react'
import  './myArticle.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
import {Link,browserHistory} from 'react-router'
class UserCard extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:'',
			 essayList:[]
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
		},()=>{
			this.myEssayList();
		})
	}
	myEssayList(){
       api.myEssayList({pageno:1,checkState:this.state.tab}).then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				//essayList:data.essayList?data.essayList:[]
				essayList:tool.getObject(10)
			})
		} else {
			message.error(data.errMsg, 3);
		}
		}, (res) => {
		tool.reject(res);
		})
	}
	componentWillMount() {
		this.myEssayList();
	}
	render(){
		return(
			<div> 
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                   <div className="search" style={{left: '71px'}}>
					<i className="fa fa-search" />
					<input 
							// defaultValue={`userCode: ${tool.user!==null?tool.user.userCode:'null'}`} 
							type="text" placeholder="搜索" />
					</div>
					<div className="header-right"><Link to='/App/PubArticle' style={{fontSize:'14px',marginRight:'15px'}}>发布</Link></div>
                 </header>
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
                    <ul className="am-tabs-nav am-cf nav">
					<li className={this.state.tab===''?'am-active':null} onClick={()=>this.changeTab('')}>
						<a >已发布</a>
					</li>
					<li className={this.state.tab===3?'am-active':null} onClick={()=>this.changeTab(3)}>
						<a >审核中</a>
					</li>
					<li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
						<a >未通过</a>
					</li>
				</ul>
                <div className="am-tabs-bd">
                   <div className="am-tabs-bd">    
								{
									this.state.essayList.map((item,index)=>{
										return(
										<div  key={index} className="am-panel">
											<div className="am-panel-bd">
												{
													item.checkState===2||item.checkState==='2'?
													<Link  to={'/App/PubArticle/'+item.essayId} className="edit"><i className="fa fa-edit"></i></Link>
													:<Link  to={'/App/PubArticle/1'} className="edit"><i className="fa fa-edit"></i></Link>
												}
												<Link to={`/App/PersonalCenter/ArticleDetail/${item.essayId}`}>
														<article className="am-article">
															<div className="am-article-hd">
																<h1 className="am-article-title">{item.essayTitle}</h1>
															</div>
															<div className="am-article-bd">
																<p className="am-article-lead">{item.essayNote}</p>
																<ul className="am-avg-sm-3 am-thumbnails">
																	{/*{
																		item.essayPhotos.map((item,index)=>{
																			<li><img src={item.essayPhotoPath} /></li>
																		})
																	}*/}
																	<li><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></li>
																	<li><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></li>
																	<li><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></li>
																</ul>
															</div>
														</article>
													</Link>
								                 <p className="like">{tool.formatTimestamp(item.createTime)}</p>
												 <p className="evaluate">审核意见：{item.auditOpinion}</p>
									         </div>
										  </div>
										)
									})
								}
                            </div>
                </div>
				</div>
			</div>
      </div>
		)
	}
}


export default UserCard