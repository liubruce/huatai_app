import React from 'react'
import  './mydirectDetails.less'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
class MydirectDetails extends React.Component{
	constructor(args) {
		super()
		this.state={
			senderRealName:'',
			letterTheme:'',
			senderNamePath:'',
			addressNamePath:'',
			privateLetterInfoRusult:[],
			addressRealName:'',
			textareaValue:'',
			infoSuccess:false,
			loading:false,
			totalPage:1,
			pageNo:1,
		}
	}
	componentDidMount() {
       tool.addScroll(this,this.show.bind(this));
    } 
	show(flag){
		let data = this.props.location.state
		let body = {}
		if(data.infoSuccess === true || this.state.infoSuccess === true){
			body={privateletterId:this.props.params.id,changType:'1',start:this.state.pageNo,userType:'学员'}
		}else{
			body={privateletterId:this.props.params.id,start:this.state.pageNo,userType:'学员'}
		}
		tool.loading(this,true);
		api.appletterInfo(body).then((data)=>{
			if(data.result === 'RC100'){
				this.setState({
					senderRealName:data.senderRealName,
					letterTheme:data.letter,
					senderNamePath:data.senderNamePath,
					privateLetterInfoRusult:flag?this.state.privateLetterInfoRusult.concat(data.privateLetterInfoRusult):data.privateLetterInfoRusult,
					addressNamePath:data.addressNamePath,
					addressRealName:data.addressRealName,
					totalPage:data.totalPage
				})
			}else if(data.result === 'RC101'){
				this.setState({
					letterTheme:data.letter,
					addressRealName:data.addressRealName,
					senderRealName:data.senderRealName,
				})
			}
			else{
				message.error(data.errMsg, 3);
			}
			tool.loading(this,false);
		})
	}
	sendLetter(){
		if(this.refs.content.value === ''){
			message.error('发送内容不能为空', 3);
			return
		}
		let formData = new FormData()
		formData.append('privateletterInfoNote',this.refs.content.value)
		formData.append('privateletterId',this.props.params.id)
		formData.append('userType','学员')
		tool.loading(this,true);
		api.appsendLetterinfo(formData).then((data)=>{
			if(data.result === 'RC100'){
				this.setState({
					textareaValue:'',
					infoSuccess:true
				})
				this.show()
			}else{
				this.setSate({
					infoSuccess:false
				})
				message.error(data.errMsg, 3);	
			}
			tool.loading(this,false);
		})
	}
	componentWillMount() {
		this.show();
	}
	componentWillUnmount() {
      tool.removeScroll();
    }
	refresh(){
		this.setState({
            pageNo:1,
		},()=>{
			this.show()
		})
	}
	render(){
		let letterTheme = this.state.letterTheme
		let senderNamePath = this.state.senderNamePath 
		let addressNamePath = this.state.addressNamePath
		let userCode  = tool.user.userCode
		return(
			<div> 
            <header className="header">
			<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
			<h1>我的私信</h1>
			<span className="refresh" onClick={()=>{this.refresh()}}></span>
		</header>
		<div className="warpper" style={{paddingBottom: '100px'}}>
			<Spin spinning={this.state.loading} tip="加载列表中...">
				<div className="am-panel talk-lists">
				    <div className="talk-pepole">
								<div className="avatar"><img src={tool.getFile(addressNamePath)} onError={(e) => tool.headImageError(e)} alt=""/></div>
								<div className="name-time-word">
									<p>{this.props.location.state.infoSuccess === true?'我':this.state.senderRealName}
									<span>{tool.formatTimestamp(letterTheme.createTime)}</span></p>
									<div className="talk-word">{letterTheme.privateletterNote}</div>
								</div>
					</div>
				</div>
			{
				this.state.privateLetterInfoRusult.map((item,index)=>{
                   return(
					   <div key={index} className="am-panel talk-lists">
					{
                          item.createUser === userCode ?
						  <div className="talk-pepole talk-me">
								<div className="avatar"><img src={tool.getFile(addressNamePath)} onError={(e) => tool.headImageError(e)} alt=""/></div>
								<div className="name-time-word">
									<p><span>{tool.formatTimestamp(item.createTime)}</span>我</p>
									<div className="talk-word">{item.privateletterInfoNote}</div>
								</div>
							</div>:
							<div className="talk-pepole">
								<div className="avatar"><img src={tool.getFile(senderNamePath)} onError={(e) => tool.headImageError(e)} alt=""/></div>
								<div className="name-time-word">
									<p>{this.state.addressRealName}讲师<span>{tool.formatTimestamp(item.createTime)}</span></p>
									<div className="talk-word">{item.privateletterInfoNote}</div>
								</div>
							</div>
					 }
						</div>
				   )
				})
			}
			</Spin>
			<div className="talk-input">
				<textarea placeholder="请输入文字" required="required" ref='content' id="textarea" value={this.state.textareaValue} onChange={()=>{this.setState({textareaValue:this.refs.content.value})}}></textarea>
				<button type="button" onClick={()=>this.sendLetter()}>发送</button>
			</div>
		</div>
            </div>
		)
	}
}


export default MydirectDetails