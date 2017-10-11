import React from 'react'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {Link,browserHistory} from 'react-router'
import './pubArticle.less'
class PubArticle extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:'',
			 essayList:[]
		}
	}
	changeTab(tab) {
		this.setState({
			tab: tab
		},()=>{
			this.essayList();
		})
	}
	essayList(){
       api.essayList({pageno:1,checkState:this.state.tab}).then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				essayList:data.essayList?data.essayList:[]
			})
		} else {
			message.error(data.errMsg, 3);
		}
		}, (res) => {
		tool.reject(res);
		})
	}
	componentWillMount() {
		this.essayList();
	}
	render(){
		return(
			<div> 
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                    <h1>蜂行圈发布</h1>
					<div className="header-right"><span>发布</span></div>
                 </header>
			<div className="warpper">
                <div className="am-panel">
                    <div className="fxq-editRela">
                        <input type="text" placeholder="请输入标题"/>
                        <textarea placeholder="请输入正文"></textarea>
                    </div>
                </div>
                <div className="am-panel">
                    <ul className="file-imgs am-avg-sm-3 clearFix">
                        <li data-am-modal="{target: '#my-confirm'}"><img src={require("../../style/images/test.png")}/></li>
                        <li data-am-modal="{target: '#my-confirm'}"><img src={require("../../style/images/test.png")}/></li>
                        <li data-am-modal="{target: '#my-confirm'}"><img src={require("../../style/images/test.png")}/></li>
                        <li><label for="file" className="file-img">+</label><input type="file" id="file" style={{display:'none'}}/></li>
                    </ul>
                </div>	
			</div>
      </div>
		)
	}
}


export default PubArticle