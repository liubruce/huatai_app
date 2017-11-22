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
                    <a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                    <h1>我的私信</h1>
                    <span className="refresh"></span>
		        </header>
                <div className="warpper">
			<div className="am-panel talk-lists">
				<Link to="/App/MydirectDetails">
					<div className="talk-pepole">
						<div className="avatar"><img alt=""/></div>
						<div className="name-time">
							<p>XXXXX</p>
							<span>2017-11-03 14:00</span>
						</div>
					</div>
					<div className="talk-cont"><p>华泰蜂行智能学习平台与 2017年XX月XX日</p></div>
					<div className="no-read">未读</div>
				</Link>
			</div>
            </div>
            </div>
		)
	}
}


export default Mydirect