import React from 'react'
import  './UserCard.less'
import { message,Spin } from 'antd';
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {browserHistory} from 'react-router'
class Card extends React.Component{
	constructor(args) {
		super()
	}
	render(){
		let userCard=this.props.userCard;
		let jobInfo =this.props.jobInfo;
		return(
           <div data-tab-panel-0 className="am-tab-panel am-active tab">
						<div className="am-panel user-info-list">
							<div style={{borderBottom: '1px solid #E2EEFB'}}>
								<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
								    <h2 className="am-titlebar-title">基本信息</h2>
								</div>
								<ul className="am-list am-list-static">
								  	<li>姓名<span>{userCard.userRealName}</span></li>
								  	<li>手机<span>{userCard.phone}</span></li>
								  	<li>邮箱<span>{userCard.email}</span></li>
								</ul>
							</div>
							<div style={{borderBottom: '1px solid #E2EEFB'}}>
								<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
								    <h2 className="am-titlebar-title">工作信息</h2>
								</div>
								<ul className="am-list am-list-static">
								  	<li>入职时间<span>{jobInfo.enterDate}</span></li>
								  	<li>所在地区<span>{jobInfo.address}</span></li>
								  	<li>职务<span>{jobInfo.rankName}</span></li>
								  	<li>分公司<span>{jobInfo.manageComName}</span></li>
								  	<li>营业部<span>{jobInfo.departmentName}</span></li>
								  	<li>营业组<span>{jobInfo.sellComName}</span></li>
								</ul>
							</div>
							<div className="panel-bd">
								<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
								    <h2 className="am-titlebar-title">个人说明</h2>
								</div>
								<div className="user-word">
									{userCard.seifInformation !==undefined ? userCard.seifInformation:''}
								</div>
							</div>
						</div>
			</div>
		)
	}
}
class GrowingUp extends React.Component{
	constructor(args) {
		super();
		this.state={
			agentChangeList:[]
		}
	}
	getAgentchangeApp(){
		tool.loading(this, true);
		api.getAgentchangeApp().then((data)=>{
			if (data.result === 'RC100') {
				this.setState({
					agentChangeList:data.agentChangeList?data.agentChangeList:[]
				})
			}else{
				message.error(data.errMsg, 3);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
    })
	}
	componentWillMount() {
		this.getAgentchangeApp();
	}
	render(){
		//let userCard=this.props.userCard;
		return(
        <div className="am-panel">
				<div className="czjl">
					<ul>
						{
								this.state.agentChangeList.map((item,index)=>{
								return(
								<li key={index}><span className="time">{item.changeDate?item.changeDate.substr(0,4)+'-'+item.changeDate.substr(4,2)+'-'+item.changeDate.substr(6,2):''}</span><span className="icon-czjl"></span>{item.gradeName}</li>
								)
								})
						}
					</ul>
				</div>
		</div>
		)
	}
}
class HonoraryCert  extends React.Component{
	constructor(args) {
		super();
		this.state={
			HonorList:[],
			mdrt:'',
			star:''
		}
	}
    allCertificate(){
		 tool.loading(this,true);
		api.allCertificate({}).then((data)=>{
			if(data.result==='RC100'){
				this.setState({
					HonorList:data.mdreList?data.mdreList:[],
					mdrt:data.mdrt,
					star:data.star
				})
			}else{
				message.error(data.errMsg, 3);
			}
			tool.loading(this,false);
		}, (res) => {
			tool.loading(this,false);
			tool.reject(res);
		})
	}
	componentWillMount() {
		this.allCertificate();
		
	}
	render(){
		let Honor2List=this.props.Honor2List;
		return(
		
			<div className="am-panel user-info-list">
				<div style={{ borderBottom: '1px solid #E2EEFB' }}>
					<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
						<h2 className="am-titlebar-title">荣誉证书</h2>
					</div>
					<div className="am-slider am-slider-carousel" id="img-slider">
						<ul className="am-slides">
							{
								this.state.mdrt?
								<li style={{ width: '100px', marginLeft: "20px", float: "left", display: "block" }}>
									<img src={require('../../../style/images/zs.png')} alt='test'/>
									<p>{this.state.mdrt}</p>
								</li>:null
							}
							{
								this.state.star?
								<li style={{ width: '100px', marginLeft: "20px", float: "left", display: "block" }}>
									<img src={require('../../../style/images/zs.png')} alt='test'/>
									<p>{this.state.star}</p>
								</li>:null
							}
							{this.state.HonorList.map((item,index)=>{
											
											return(
												<li key={index} style={{ width: '100px', marginLeft: "20px", float: "left", display: "block" }}>
													<img src={require('../../../style/images/zs.png')} alt='test'/>
													<p>荣誉证书A证书名称</p>
												</li>
												)
							})}
						</ul>
					</div>
				</div>
				<div className="panel-bd">
					<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
						<h2 className="am-titlebar-title">{localStorage.getItem('channelId')==='4'?'星行荣誉':'蜂行荣誉'}</h2>
					</div>
					<div className="am-slider am-slider-carousel" id="img-slider-1">
						<ul className="am-slides">
							{Honor2List.map((item, index) => {
								return (
									<li key={index} style={{ width: '100px', marginLeft: "20px", float: "left", display: "block" }}>
										<img src={tool.getFile(item.honorBadge)} alt='test' />
										<p>{item.honorName}</p>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
						
		)
	}
}
class UserCard extends React.Component{
	constructor(args) {
		super()
		this.state={
			userCard:[],
			Honor2List:[],
			tab:0,
			jobInfo:[]
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
		})
	}
	show(){
		tool.loading(this, true);
		api.userCard().then((data)=>{
			if (data.result === 'RC100') {
				this.setState({
					userCard:data.user,
					jobInfo:data.obj.data
				})
			}else{
				message.error(data.errMsg, 3);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
    })
	}
	myHonor() {
		tool.loading(this, true);
		api.myHonor({}).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					Honor2List: data.allHonor ? data.allHonor : [],
					Honor2ListMy: data.myHonor ? data.myHonor : []
				}, () => {
					let myHonor = []
					for (let x of this.state.Honor2ListMy) {
						myHonor.push(x.honorId);
					}
					this.setState({
						Honor2ListMy: myHonor
					})
				})
			} else {
				message.error(data.errMsg, 3);
			}
			tool.loading(this, false);
		}, () => {
			tool.loading(this, false);
			message.error('请求失败', 3);
		})
	}
	componentWillMount() {
		this.show();
		this.myHonor();
	}
	shareWeiXin() {
		let text =localStorage.getItem("elearning_IP");
		// let text ='http://localhost:8888';
		text += '/AppShare';
		text = tool.url_format(text, '', '', '');

		if(tool.IsPC()){
			window.open(text);
			return;
		}
		navigator.Wechat.share({
			// text: text,
			message: {
                     title: "华泰个人名片分享",
                     description: this.state.userCard.userRealName,
                     media: {
                     type: window.Wechat.Type.WEBPAGE,
                     webpageUrl: text
					}
			},
			scene: navigator.Wechat.Scene.SESSION
		}, function() {
			navigator.notification.alert(
				'分享成功',
				() => {
					console.log('alert callback')
				},
				'提示',
				'OK'
			);
		}, function(reason) {
			navigator.notification.alert(
				"分享失败: " + reason,
				() => {
					console.log('alert callback')
				},
				'提示',
				'OK'
			);
		});
	}
	componentDidMount() {

	}
	render(){
		let user = this.state.userCard;
		return(
			<div>
			{tool.isIOS?<div className='ios-header' ></div>:null}
	          <header className="header">
	             <a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
	             <div className="user-name-share">
	             	<img alt='head' src={tool.getFile(user.headPath)} onError={(e) => tool.headImageError(e)} />{user.userRealName}
	             </div>
		     	<img onClick={()=>this.shareWeiXin()} alt='share' className='share-img' src={require('../../../style/images/share.png')}/>
		      </header>
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
					<ul className="am-tabs-nav am-cf nav">
						<li className={this.state.tab === 0 ?"am-active":''} >
							<a  onClick={()=>this.changeTab(0)}>个人名称</a>
						</li>
						<li className={this.state.tab === 1 ?"am-active":''}>
							<a  onClick={()=>this.changeTab(1)}>成长经历</a>
						</li>
						<li className={this.state.tab === 2 ?"am-active":''}>
							<a  onClick={()=>this.changeTab(2)}>荣誉证书</a>
						</li>
					</ul>
                   <Spin spinning={this.state.loading}>
					<div style={{minHeight:'300px'}} className="am-tabs-bd">
						{
							this.state.tab===0?<Card userCard={this.state.userCard} jobInfo={this.state.jobInfo}/>:(this.state.tab===1?<GrowingUp/>:<HonoraryCert Honor2List={this.state.Honor2List}/>)
						}
					</div>
				  </Spin>
				</div>
			</div>

			</div>

		)
	}
}


export default UserCard