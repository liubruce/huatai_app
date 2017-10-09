import React from 'react'
import './dynamic.less'
import * as tools from '../../../config/tools' 
import {Link} from 'react-router'
import * as api from '../../../config/api'
import {message} from 'antd'
import * as tool from '../../../config/tools'
class CourseDy extends React.Component{
    constructor(args){
		super();
		this.state={
			courseList:tool.getObject(0)
		}
	}
	componentWillMount() {
    api.courseClick().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
    }
    render(){
        return(
               <div data-tab-panel-0 className="am-tab-panel am-active tab">
                        <div className="am-panel cur-list">
							<Link to='App/Course/CourseDetail'>
								<img src={require('../../../style/images/test.png')}/>
								<div className="right">
									<p className="time">2017.06.15  17:21</p>
									<h2>课程名称</h2>
									<p className="like"><span><i className="fa fa-heart-o"></i>12331</span><span><i className="fa fa-thumbs-o-up"></i>12331</span></p>
								</div>
							</Link>
						</div>
               </div>
        )
    }
}
class EssayDy extends React.Component{
	constructor(args){
		super();
		this.state={
			EssayList:tool.getObject(0)
		}
	}
	componentWillMount() {
    api.moreEssay().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
    }
    render(){
        return(
           <div data-tab-panel-1 className="am-tab-panel am-active tab">
						<div className="am-panel article-list">
							<img src={require('../../../style/images/portrait.png')}/>
							<div className="cont">
								<p className="info"><span>用户B</span>xxxxxxx分公司</p>
								<p className="time">2016.06.15</p>
								<Link to='App/PersonalCenter/ArticleDetail'>
									<article className="am-article">
									  	<div className="am-article-hd">
									   		<h1 className="am-article-title"><div className="jc-icon"></div>如何用保险保障自己的一生？</h1>
									  	</div>
									  	<div className="am-article-bd">
									    	<p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
									  	</div>
									</article>
								</Link>
								<p className="like"><span><i className="fa fa-heart-o"></i>12331</span><span><i className="fa fa-thumbs-o-up"></i>12331</span></p>
							</div>
						</div>
                    </div> 
        )
    }
}
class Dynamic extends React.Component{
	constructor(args){
		super();
		this.state={
            tab:1
        }
	}
	changeTab(tab){
        this.setState({
           tab
        })
    }
	render(){
		return(
			<div className="warpper">
		       <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                   <ul className="am-tabs-nav am-cf nav">
                        <li className={this.state.tab===1?'am-active':null} onClick={()=>this.changeTab(1)}>
                            <a>课程动态</a>
                        </li>
                        <li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
                            <a>蜂行圈动态</a>
                        </li>
				   </ul>
                   <div className="am-tabs-bd">
					 {
                            this.state.tab===1?<CourseDy/>:<EssayDy/>
                     }
                   </div>
               </div>
			</div>
		)
	}

}


export default Dynamic