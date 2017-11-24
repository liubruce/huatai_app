import React from 'react'
import  './privateTheme.less'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
class PrivateTheme extends React.Component{
	constructor(args) {
		super()
		this.state={
            senderName:'',
			privateletterId:'',
		}
	}
    componentWillMount(){
		this.setState({
			senderName:localStorage.getItem('username')
		})
	}
	sendLetterTheme(){
		if(this.refs.content.value === ''){
			message.error('发送内容不能为空', 3);
			return
		}
		let formData = new FormData()
		formData.append('senderName',this.state.senderName)
		formData.append('privateletterNote',this.refs.content.value)
		formData.append('addresseeName',this.props.params.id)
		api.appsendLetter(formData).then((data)=>{
			if(data.result === 'RC100'){
				this.setState({
					privateletterId:data.privateletterId
				},()=>{
					let data = {infoSuccess:true}
					let path = {
						pathname:"/MydirectDetails/" + this.state.privateletterId,
						state: data
					}
					hashHistory.push(path)
				})	
			}else{
				message.error(data.errMsg,3)
			}
		})
	}
	render(){
		return(
			<div> 
            <header className="header">
                <a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                <h1>我的私信</h1>
		   </header>
		<div className="warpper" style={{paddingBottom: '100px'}}>
			<div className="talk-input">
				<textarea placeholder="请输入文字" required="required" ref='content' id="textarea" value={this.state.textareaValue} onChange={()=>{this.setState({textareaValue:this.refs.content.value})}}></textarea>
				<button type="button" onClick={()=>this.sendLetterTheme()}>发送</button>
			</div>
		</div>
            </div>
		)
	}
}


export default PrivateTheme