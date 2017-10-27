import React from 'react'
import './testCenter.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin } from 'antd'
import {hashHistory} from 'react-router';
class TestCenter extends React.Component{
	constructor(args){
		super()
		this.state = {
           tab:1,
		   testList:tool.getObject(0),
		   loading:false,
           totalPage:1,
           pageNo:1,
		}
	}
	unreadInformationlist(){
		tool.loading(this, true);
		api.unreadInformationlist().then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				testList:data.informationList?data.informationList:[]
			})
		} else {
			message.error(data.errMsg, 3);
		}
		 tool.loading(this, false);		
		}, (res) => {
			tool.loading(this, false);	
		tool.reject(res);
		})
	}
	readInformationlist(){
		tool.loading(this, true);
		api.readInformationlist().then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				testList:data.informationList?data.informationList:[]
			})
		} else {
			message.error(data.errMsg, 3);
		}
		tool.loading(this, false)	
		}, (res) => {
		tool.loading(this, false)	
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
	clickMe(item){
		let index=item.inforURL.indexOf("/TestPaper");
        let arr=item.inforURL.substring(index);
		hashHistory.push('/App/Course'+arr);
	}
	render(){
		return(
			<div className="warpper">
			 <Spin spinning={this.state.loading} tip="加载列表中...">
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
											{
												item.informationType === '1' && item.isExam === 0 ?
												<a onClick={()=>this.clickMe(item)} style={{cursor:"pointer"}}>任务地址</a>:null
                                             }
											<p className="time">{tool.formatTimestamp(item.createTime)}</p>
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
		)
	}

}


export default TestCenter