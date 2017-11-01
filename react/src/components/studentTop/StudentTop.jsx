import React from 'react'
import  './studentTop.less'
import { message , Spin } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import  Switch , { Case, Default } from 'react-switch-case';

class StudentTop extends React.Component{
	constructor(args) {
		super()
		this.state = {
			topType:'week',
			pageno:1,
			studentTopList:[],
			loading:false
		}
	}
	componentWillMount() {
		this.show();
	}
	show() {
		tool.loading(this, true);
		let body = {
			topType: this.state.topType,
			pageno: this.state.pageno
		}
		api.studenttop(body).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					studentTopList:data.studentTopList
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
	changeTab(type){
		this.setState({
			topType:type
		},()=>{
			this.show();
		})
	}
	render(){
		return(
		<div className="warpper">
		<Spin spinning={this.state.loading} tip="加载列表中...">
			<div data-am-widget="tabs" className="am-tabs am-tabs-default">
				<ul className="am-tabs-nav am-cf nav">
					<li onClick={()=>this.changeTab('day')} className={this.state.topType==='day'?'am-active':''}>
						<a>日榜</a>
					</li>
					<li onClick={()=>this.changeTab('week')} className={this.state.topType==='week'?'am-active':''}>
						<a>周榜</a>
					</li>
					<li onClick={()=>this.changeTab('month')} className={this.state.topType==='month'?'am-active':''}>
						<a>月榜</a>
					</li>
				</ul>
				<div className='top-panel'>
					<div className="am-tab-panel tab">
					   {this.state.studentTopList.map((item,index)=>{
					   	return(
					   		<div key={index} className="am-panel rank-list">
							    <img className='head_img' src={tool.getFile(item.headPath)} onError={(e) => tool.headImageError(e)} alt='img' />
							    <div className="rank-info">
							    	<p>{item.userRealName}    {item.vipGradName}</p>
							    	<span>{item.branchOffice}</span>
							    </div>
							     <Switch condition={index+1}>
							        <Case value={1}><div className="rank-icon rank-icon-1"></div></Case>
							        <Case value={2}><div className="rank-icon rank-icon-2"></div></Case>
							        <Case value={3}><div className="rank-icon rank-icon-3"></div></Case>
							        <Default><div className="rank-icon">{index+1}</div></Default>
							    </Switch>
						    </div>
					   		)
					   })}
					</div>
				</div>
			</div>
			</Spin>
		</div>
		)
	}

}
export default StudentTop