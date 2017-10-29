import React from 'react'
import  './UserCard.less'
import { message,Spin } from 'antd';
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {browserHistory} from 'react-router'
let  Wechat = window.WeChat || navigator.WeChat;
class Card extends React.Component{
	constructor(args) {
		super()
	}
	render(){
		let userCard=this.props.userCard;
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
								  	<li>入职时间<span>{userCard.entryTime}</span></li>
								  	<li>所在地区<span>{userCard.region}</span></li>
								  	<li>职务<span>{userCard.jobName}</span></li>
								  	<li>分公司<span>{userCard.branceOffice}</span></li>
								  	<li>营业部<span>{userCard.businessDept}</span></li>
								  	<li>营业组<span>{userCard.businessGroup}</span></li>
								</ul>
							</div>
							<div className="panel-bd">
								<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
								    <h2 className="am-titlebar-title">个人说明</h2>
								</div>
								<div className="user-word">
									{userCard.seifInformation}
								</div>
							</div>
						</div>
			</div>
		)
	}
}
class GrowingUp extends React.Component{
	constructor(args) {
		super()
	}
	render(){
		let userCard=this.props.userCard;
		return(
        <div className="am-panel">
				<div className="czjl">
					<ul>
						<li><span className="time">2016/08/06</span><span className="icon-czjl"></span>加入华泰</li>
						<li><span className="time">2016/08/06</span><span className="icon-czjl"></span>加入华泰</li>
						<li><span className="time">2016/08/06</span><span className="icon-czjl"></span>加入华泰</li>
						<li><span className="time">2016/08/06</span><span className="icon-czjl"></span>加入华泰</li>
						<li><span className="time">2016/08/06</span><span className="icon-czjl"></span>加入华泰</li>
					</ul>
				</div>
		</div>
		)
	}
}
class HonoraryCert  extends React.Component{
	constructor(args) {
		super()
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
							<li style={{ width: '100px', marginLeft: "20px", float: "left", display: "block" }}>
								<img src={require('../../../style/images/zs.png')} />
								<p style={{ textAlign: 'center' }}>荣誉证书名称</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="panel-bd">
					<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
						<h2 className="am-titlebar-title">蜂行荣誉</h2>
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
					userCard:data.user
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
		Wechat.share({
			text: "This is just a plain string",
			scene: Wechat.Scene.TIMELINE // share to Timeline
		}, function() {
			alert("Success");
		}, function(reason) {
			alert("Failed: " + reason);
		});
	}
	componentDidMount() {
		console.log('navigator.WeChat' + JSON.stringify(Wechat));
		console.log('window.weChat' + JSON.stringify(Wechat));
		document.addEventListener("deviceready", function() {
			Wechat.isInstalled(function(installed) {
				alert("WeChat installed: " + (installed ? "Yes" : "No"));
			}, function(reason) {
				alert("Failed: " + reason);
			});
		}, false);
	}
	render(){
		let user = this.state.userCard;
		return(
			<div>
			{tool.isIOS?<div className='ios-header' ></div>:null}
	          <header className="header">
	             <a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
	             <div className="user-name-share">
	             	<img alt='head' src={tool.getFile(user.headPath)} />{user.userRealName}
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
                   <Spin spinning={this.state.loading} tip="加载列表中...">
					<div className="am-tabs-bd">
						{
							this.state.tab===0?<Card userCard={this.state.userCard}/>:(this.state.tab===1?<GrowingUp/>:<HonoraryCert Honor2List={this.state.Honor2List}/>)
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