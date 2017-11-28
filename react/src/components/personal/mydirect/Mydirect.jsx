import React from 'react'
import  './mydirect.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
class Mydirect extends React.Component{
	constructor(args) {
		super()
		this.state={
			 loading:false,
             totalPage:1,
             pageNo:1,
			 privateLetterRusult:[],
			 privateletterId:''
		}
	}
	componentDidMount() {
       tool.addScroll(this,this.addresseePrivateLetter.bind(this));
    } 
	addresseePrivateLetter(flag){
		tool.loading(this, true);
       api.addresseePrivateLetter({start:this.state.pageNo,userType:'学员'}).then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				privateLetterRusult:flag?this.state.privateLetterRusult.concat(data.privateLetterRusult):data.privateLetterRusult,
				totalPage:data.totalPage
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
	delletter(Id){
		tool.loading(this,true);
		api.delletter({privateletterId:Id}).then((data)=>{
			if(data.result === 'RC100'){
				this.setState({
                    pageNo:1,
				},()=>{
                   this.addresseePrivateLetter();
				})
			}else{
				message.error(data.errMsg, 3);
			}
			tool.loading(this,false);
		},(res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	componentWillMount() {
		this.addresseePrivateLetter();
	}
	componentWillUnmount() {
      tool.removeScroll();
    }
	routers(id){
		let data = {infoSuccess:false}
			let path = {
				pathname:"/App/MydirectDetails/" + id,
				state: data
			}
			hashHistory.push(path)
	}
	refresh(){
		this.setState({
          pageNo:1
		},()=>{
			this.addresseePrivateLetter()
		})
	}
	render(){
		return(
			<div> 
                <header className="header">
                    <a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                    <h1>我的私信</h1>
                    <span className="refresh"  onClick={()=>this.refresh()}></span>
		        </header>
                <div className="warpper">
					<Spin spinning={this.state.loading}>
						{this.state.privateLetterRusult.map((item,index)=>{
							return(
								<div  key={index} className="am-panel talk-lists">
											
												<div>
												<Link  onClick={()=>{this.routers(item.privateletterId)}}>
													<div className="talk-pepole">
														<div className="name-time">
															<p>和{item.userRealName}对话</p>
															<span>{tool.formatTimestamp(item.createTime)}</span>
														</div>
													</div>
													<div className="talk-cont"><p>{tool.subString(item.privateletterNote,25)}</p></div>
													{
															item.operationState === '1'?
															<div className="no-read">未读</div>:<span style={{background:'#fff'}}></span>
													}
												</Link>
												<i className="fa fa-close" style={{position:'absolute',right:'10px',top:'10px'}} data-am-modal="{target: '#my-confirm'}" onClick={()=>{this.setState({privateletterId:item.privateletterId})}}></i>
												</div>
											
								</div>
					         )
					})
						}
					</Spin>

					<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirm">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">是否确定要删除该对话</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn" data-am-modal-cancel>取消</span>
							<span className="am-modal-btn" data-am-modal-confirm onClick={()=>{this.delletter(this.state.privateletterId)}}>确定</span>
						</div>
					</div>
				</div>
            </div>
            </div>
		)
	}
}


export default Mydirect