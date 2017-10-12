import React from 'react'
import  './UserCard.less'
import { message } from 'antd';
import * as tools from '../../../config/tools'
import * as api from '../../../config/api'
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
								  	<li>姓名<span>{userCard.userName}</span></li>
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
								  	<li>职务<span>{userCard.job}</span></li>
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
		let userCard=this.props.userCard;
		return(
        <div className="am-panel user-info-list">
				<div style={{borderBottom: '1px solid #E2EEFB'}}>
					<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
						<h2 className="am-titlebar-title">荣誉证书</h2>
					</div>
					<div className="am-slider am-slider-carousel" id="img-slider">
						<ul className="am-slides" style={{padding: '0 20px 10px'}}>
							<li>
								<img src={require('../../../style/images/zs.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>荣誉证书名称</p>
							</li>
							<li>
								<img src={require('../../../style/images/zs.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>荣誉证书名称</p>
							</li>
							<li>
								<img src={require('../../../style/images/zs.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>荣誉证书名称</p>
							</li>
							<li>
								<img src={require('../../../style/images/zs.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>荣誉证书名称</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="panel-bd">
					<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
						<h2 className="am-titlebar-title">蜂行荣誉</h2>
					</div>
					<div className="am-slider am-slider-carousel" id="img-slider-1">
						<ul className="am-slides" style={{padding: '0 20px 10px'}}>
							<li>
								<img src={require('../../../style/images/hz.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>首次登录</p>
							</li>
							<li>
								<img src={require('../../../style/images/hz.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>等级名称达成</p>
							</li>
							<li>
								<img src={require('../../../style/images/hz.png')} />
								<p style={{width: '100%',textAlign: 'center'}}>等级名称达成</p>
							</li>
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
			tab:0,
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
		})
	}
	show(){
		api.userCard().then((data)=>{
			if (data.result === 'RC100') {

				this.setState({
					userCard:data.obj.data
				})
			}else{
				message.error(data.errMsg, 3);
			}
		})
	}
	componentWillMount() {
		this.show()
	}
	render(){
		return(
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

					<div className="am-tabs-bd">
						{
							this.state.tab===0?<Card userCard={this.state.userCard}/>:(this.state.tab===1?<GrowingUp/>:<HonoraryCert/>)
						}
					</div>
				</div>
			</div>

		)
	}
}


export default UserCard