import React from 'react'
import  './myArticle.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
class MyArticle extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:5,
			 essayList:[],
			 score:0,
			 loading:false,
             totalPage:1,
             pageNo:1,
			 searchValue:''
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab,
			pageNo:1
		},()=>{
			this.myEssayList();
		})
	}
	action(essayId,recordType){
		let body = {
			essayId,
			recordType
		};
		api.operateessay(body).then((data) => {
			if (data.result === 'RC100') {
				this.myEssayList();
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	click(item){
		if (item.goodEssay !== '1') {
			this.action(item.essayId,1);
			return;
		}
		this.setState({
			now_item: item
		})
	}
	myEssayList(flag){
		tool.loading(this, true);
       api.myEssayList({pageno:this.state.pageNo,checkState:this.state.tab,essayTitle:this.state.searchValue}).then((data) => {
		if (data.result === 'RC100') {

			this.setState({
				essayList:flag?this.state.essayList.concat(data.essayList):data.essayList,
				totalPage:data.totalPage
				//essayList:tool.getObject(10)
			})
		} else {
			message.error(data.errMsg, 3);
		}
		tool.loading(this, false);
		}, (res) => {
		tool.reject(res);
		tool.loading(this, false);
		})
	}
	ok(essayId) {
		let body = {
			essayId: this.state.now_item.essayId
		}
		api.cashessay(body).then((data) => {
			if (data.result === 'RC100') {
				hashHistory.push(`/App/PersonalCenter/ArticleDetail/${essayId}`);
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	componentWillMount() {
		this.myEssayList();
	}
	componentWillUnmount() {
      tool.removeScroll();
    }
	changeValue(e){
      this.setState({
		  searchValue:e.target.value
	  })
	}
	submit(e){
		e.preventDefault();
		this.setState({
           pageNo:1,
		},()=>{
			this.myEssayList();
		})
	}
	render(){
		return(
			<div> 
				<form onSubmit={(e)=>this.submit(e)} >
				{tool.isIOS?<div className='ios-header' ></div>:null}
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                   <div className="search" style={{left: '71px'}}>
					<i className="fa fa-search" />
					<input value={this.state.searchValue} onChange={this.changeValue.bind(this)} type="text" placeholder="搜索" />
					</div>
					<div className="header-right"><Link to='/App/PersonalCenter/PubArticle' style={{fontSize:'14px',marginRight:'15px'}}>发布</Link></div>
                 </header>
				 </form>
			<div className="warpper">
			<Spin spinning={this.state.loading} tip="加载列表中...">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
                    <ul className="am-tabs-nav am-cf nav">
					<li className={this.state.tab===5?'am-active':null} onClick={()=>this.changeTab(5)}>
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
													:null
												}
												<Link onClick={()=>this.click(item)}>
														<article className="am-article">
															<div className="am-article-hd">
																<h1 className="am-article-title">{item.essayTitle}</h1>
															</div>
															<div className="am-article-bd">
																<p className="am-article-lead">{item.essayNote?tool.subString(item.essayNote,30):'没有文字'}</p>
																<ul className="am-avg-sm-3 am-thumbnails">
																	{
																		item.essayPhotos.map((item,index)=>{
																			return(
																				<li key={index} ><img alt='test' src={tool.getFile(item.essayPhotoPath)} /></li>
																				)
																		})
																	}
																	{/*<li><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></li>
																	<li><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></li>
																	<li><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></li>*/}
																</ul>
															</div>
														</article>
													</Link>
								                 <p className="like">{tool.formatTimestamp(item.createTime)}</p>
												 {
													 this.state.tab===2?
													 <p className="evaluate">审核意见：{item.auditOpinion}</p>:null
												 }
												 
									         </div>

                                           <div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirm">
       <div className="am-modal-dialog">
         <div className="am-modal-hd">温馨提示</div>
         <div className="am-modal-bd">
           兑换将需要{item.exchangeIntegral}积分，您的当前积分为{this.state.score}，是否继续？
										  </div>
         <div className="am-modal-footer">
           <span className="am-modal-btn" data-am-modal-cancel>取消</span>
           <span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok(item.essayId)}>确定</span>
         </div>
        </div>
       </div>

										  </div>
										)
									})
								}
                            </div>
                </div>
				</div>
				</Spin>
			</div>
      </div>
		)
	}
}


export default MyArticle