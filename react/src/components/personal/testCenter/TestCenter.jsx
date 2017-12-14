import React from 'react'
import './testCenter.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import { message, Spin } from 'antd'
import { hashHistory,Link } from 'react-router';
import { Modal } from 'antd';
const confirm = Modal.confirm;
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
	componentDidMount() {
		if (this.state.tab === 1) {
			tool.addScroll(this,this.unreadInformationlist.bind(this));
		} else {
			tool.addScroll(this,this.readInformationlist.bind(this));
		}
   }
	unreadInformationlist() {
		tool.loading(this, true);
		api.unreadInformationlist({pageno:this.state.pageNo}).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					testList: this.state.testList.concat(data.informationList),
					totalPage:data.total
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
	readInformationlist() {
		tool.loading(this, true);
		api.readInformationlist({pageno:this.state.pageNo}).then((data) => {
			tool.loading(this, false)
			if (data.result === 'RC100') {
				this.setState({
					testList: this.state.testList.concat(data.informationList),
					totalPage:data.total
				})
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.loading(this, false)
			tool.reject(res);
		})
	}
	componentWillMount() {
		if (this.state.tab === 1) {
			this.unreadInformationlist();
		} else {
			this.readInformationlist();
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab,
			testList:[]
		}, () => {
			if (tab === 1) {
				this.unreadInformationlist();
			} else {
				this.readInformationlist();
			}
		})
	}
	clickMe(item, flag) {
		if(item.isOutOfDate===0){
              confirm({
				title: '是否测试开始',
				content: '',
				onOk() {
					let index = item.inforURL.indexOf("/TestPaper");
					let arr = flag ? item.inforURL.substring(index) : "/RandomPaper" + item.inforURL.substring(index + 10);
					hashHistory.push('/App/Course' + arr);
				},
				onCancel() {},
		     });
		}else{
			message.warning('该消息已下架', 3);
		}
	}
	Details(id) {
		api.viewmessage(id).then((data) => {
			if (data.result === 'RC100') {} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}
	componentWillUnmount() {
       tool.removeScroll();
    }
	render(){
		return(
			<div className="warpper">
			 <Spin spinning={this.state.loading}>
				<div style={{minHeight:'300px'}} data-am-widget="tabs" className="am-tabs am-tabs-default">
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
                                      <div key={index} className="am-panel msg-list"  onClick={()=>this.Details(item.informationId)}>
										<div className="read-sta"><i className="fa fa-envelope"></i></div>
										<div className="msg-cont">
											<p className="msg-title">{item.informationTitle}</p>
											<p className="msg-info">{item.informationNote}</p>
											{/*{item.isExam === 1 || item.isOtherExam === 1?<a>已答题</a>:null}*/}
											{item.isExam === 1 &&item.informationType === '1'?<Link to={`/App/Course/Answerhistory/${item.inforURL.substr(item.inforURL.indexOf('TestPaper/')+10)}/2`} style={{marginLeft:'14px'}}>查看答题历史</Link>:null}
											{
												item.informationType === '1' && item.isExam === 0 ?
												<a onClick={()=>this.clickMe(item,true)} style={{cursor:"pointer"}}>任务地址</a>:null
                                             }
											{
												item.informationType === '2' && item.isOtherExam === 0 ?
												<a onClick={()=>this.clickMe(item,false)} style={{cursor:"pointer"}}>随机答题</a>:null
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