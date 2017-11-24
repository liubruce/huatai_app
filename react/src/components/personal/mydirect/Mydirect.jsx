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
			 privateLetterRusult:[]
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
		fetch.delletter({privateletterId:Id}).then((data)=>{
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
					<Spin spinning={this.state.loading} tip="加载列表中...">
					<div className="am-panel talk-lists">
						{this.state.privateLetterRusult.map((item,index)=>{
								return(
									<div  key={index}>
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
									<i className="fa fa-close" style={{position:'absolute',right:'10px',top:'10px'}} onClick={()=>{this.delletter(item.privateletterId)}}></i>
									</div>
								)
						})
						}
					</div>
					</Spin>
            </div>
            </div>
		)
	}
}


export default Mydirect