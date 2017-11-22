import React from 'react'
import  './mydirectDetails.less'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
class Mydirect extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:5,
			 essayList:[],
			 score:0,
			 loading:false,
             totalPage:1,
             pageNo:1,
			 searchValue:''
		}
	}
	myEssayList(flag){
		tool.loading(this, true);
       api.myEssayList({pageno:this.state.pageNo,checkState:this.state.tab,essayTitle:this.state.searchValue}).then((data) => {
		if (data.result === 'RC100') {

			this.setState({
				essayList:flag?this.state.essayList.concat(data.essayList):data.essayList,
				totalPage:data.totalPage
				//essayList:tool.getObject(10)
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
	componentWillMount() {
		this.myEssayList();
	}
	componentWillUnmount() {
      tool.removeScroll();
    }
	render(){
		return(
			<div> 
            <header className="header">
			<a href="#" className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
			<h1>我的私信</h1>
			<span className="refresh"></span>
		</header>
		<div className="warpper" style={{paddingBottom: '100px'}}>
			<div className="am-panel talk-lists">
				<div className="talk-pepole">
					<div className="avatar"><img src="images/test.png" alt=""/></div>
					<div className="name-time-word">
						<p>XXXXX<span>2017.11.03 14:00</span></p>
						<div className="talk-word">老师您好，请问xxxxxxxxxxxxxxxxxxx？</div>
					</div>
				</div>
			</div>
			<div className="am-panel talk-lists">
				<div className="talk-pepole">
					<div className="avatar"><img src="images/test.png" alt=""/></div>
					<div className="name-time-word">
						<p>XXXXX<span>2017.11.03 14:00</span></p>
						<div className="talk-word">月色冷清你容颜，记忆残存的香味，摇落你眉眼清欢，轻减小腰围的心事衣带，寸寸渐缓，过尽飞鸿的字句，满眼映你模样，度一个人的白昼黑夜</div>
					</div>
				</div>
			</div>
			<div className="am-panel talk-lists">
				<div className="talk-pepole talk-me">
					<div className="avatar"><img src="images/test.png" alt=""/></div>
					<div className="name-time-word">
						<p><span>2017.11.03 14:00</span>我</p>
						<div className="talk-word">A老师，如何把投保时的风险降到最低呢，麻烦详细讲解下，谢谢！</div>
					</div>
				</div>
			</div>
			<div className="am-panel talk-lists">
				<div className="talk-pepole talk-me">
					<div className="avatar"><img src="images/test.png" alt=""/></div>
					<div className="name-time-word">
						<p><span>2017.11.03 14:00</span>我</p>
						<div className="talk-word">谢谢！</div>
					</div>
				</div>
			</div>
			
			<div className="talk-input">
				<textarea placeholder="请输入文字" id="textarea"></textarea>
				<button type="button">发送</button>
			</div>
		</div>
            </div>
		)
	}
}


export default Mydirect