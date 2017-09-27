import React from 'react'
import  './UserCard.less'
import { message } from 'antd';
import * as tools from '../../../config/tools'
import * as api from '../../../config/api'


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
						<div data-tab-panel-0 className="am-tab-panel am-active tab">
							<div className="am-panel">
								<div className="panel-bd">
									<div data-am-widget="titlebar" className="am-titlebar am-titlebar-default" >
									    <h2 className="am-titlebar-title">基本信息</h2>
									</div>
									<ul className="am-list am-list-static">
									  	<li>姓名: <span> {this.state.userCard.userName}</span></li>
									  	<li>手机: <span> {this.state.userCard.phone}</span></li>
									  	<li>邮箱: <span> {this.state.userCard.email}</span></li>
									</ul>
								</div>
								
							</div>
						</div>
						<div data-tab-panel-1 className="am-tab-panel tab">
							
						</div>
						<div data-tab-panel-2 className="am-tab-panel tab">
							
						</div>
					</div>
				</div>
			</div>

		)
	}
}


export default UserCard