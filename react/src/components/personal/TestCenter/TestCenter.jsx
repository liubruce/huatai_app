import React from 'react'
import {Link} from 'react-router'
import './testCenter.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
class TestCenter extends React.Component{
	constructor(args){
		super()
		this.state = {
           tab:1,
		   testList:tool.getObject(0),
		}
	}
	unreadInformationlist(){
		api.unreadInformationlist().then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				testList:data.informationList?data.informationList:[]
			})
		} else {
			message.error(data.errMsg, 3);
		}
		}, (res) => {
		tool.reject(res);
		})
	}
	readInformationlist(){
		api.readInformationlist().then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				testList:data.informationList?data.informationList:[]
			})
		} else {
			message.error(data.errMsg, 3);
		}
		}, (res) => {
		tool.reject(res);
		})
	}
	componentWillMount() {
		if(this.state.tab===1){
           this.unreadInformationlist();
		}else{
			this.readInformationlist();
		}
    }
	changeTab(tab) {
		this.setState({
			tab: tab
		},()=>{
		if(tab===1){
           this.unreadInformationlist();
		}else{
			this.readInformationlist();
		}
		})
	}
	render(){
		return(
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
					<ul className="am-tabs-nav am-cf nav">
					<li className={this.state.tab === 1 ?"am-active":''} onClick={()=>this.changeTab(1)}>
						<a >新任务</a>
					</li>
					<li className={this.state.tab === 2 ?"am-active":''} onClick={()=>this.changeTab(2)}>
						<a >已完成</a>
					</li>
				</ul>
				<div className="am-tabs-bd">
					<div data-tab-panel-0 className="am-tab-panel am-active tab">
                        {
							this.state.testList.map((item,index)=>{
								return(
                                      <div key={index} className="am-panel msg-list">
										<div className="read-sta"><i className="fa fa-envelope"></i></div>
										<div className="msg-cont">
											<p className="msg-title">{item.informationTitle}</p>
											<p className="msg-info">{item.informationNote}</p>
											<a>www.xxx.com/fengxing/#</a>
											<p className="time">{tool.formatTimestamp(item.createTime)}</p>
										</div>
						             </div>
								)
							})
						}
					</div>
				</div>
				</div>
			</div>
		)
	}

}


export default TestCenter