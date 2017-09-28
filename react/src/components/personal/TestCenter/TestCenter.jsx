import React from 'react'
import {Link} from 'react-router'
import './testCenter.less'
import * as tools from '../../../config/tools' 
class TestCenter extends React.Component{
	constructor(args){
		super()
		this.state = {
           tab:1,
		   testList:tools.getObject(10),
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
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
						<a >进行中</a>
					</li>
					<li className={this.state.tab === 3 ?"am-active":''} onClick={()=>this.changeTab(3)}>
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
											<p className="msg-title">华泰蜂行智能学习平台上线通知</p>
											<p className="msg-info">华泰蜂行智能学习平台与 2017年XX月XX日，XX时XX分XX秒正式上线。请点击如下连接下载安装。</p>
											<a>www.xxx.com/fengxing/#</a>
											<p className="time">2017.06.12  14:50</p>
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