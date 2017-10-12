import React from 'react'
import {Link} from 'react-router'
import './collector.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
import ArticleItem from '../../article/ArticleItem.jsx'
class CourseCol extends React.Component{
    constructor(args){
		super()
        this.state={
            colCourseList:tool.getObject(0),
        }
	}

    componentWillMount() {
    api.couCollection().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
            colCourseList:data.myCourseList?data.myCourseList:[]
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
                {
                    this.state.colCourseList.map((item,index)=>{
                        return(
                           <div key={index} className="am-panel cur-list">
                                <Link to='App/Course/CourseDetail'>
                                    <img src={require("../../../style/images/test.png")}/>
                                    <div className="right">
                                        <p className="time">{tool.formatTimestamp(item.recordTime)}</p>
                                        <h2>{item.courseName}</h2>
                                        <p className="like"><span><i className="fa fa-heart"></i>{item.sumLike}</span><span><i className="fa fa-thumbs-up"></i>{item.sumCollection}</span></p>
                                    </div>
                                </Link>
						   </div>
                        )
                    })
                }
             </div>
        )
    }
}
class EssayCol extends React.Component{
    constructor(args){
		super()
        this.state={
            colCourseList:tool.getObject(0),
        }
	}
    morecolEssay(){
       api.morecolEssay().then((data) => {
        if (data.result === 'RC100') {
            this.setState({
                colCourseList:data.myEssayColList?data.myEssayColList:[]
            })
        } else {
            message.error(data.errMsg, 3);
        }
       }, (res) => {
          tool.reject(res);
        })
      }
    componentWillMount() {
      this.morecolEssay();
    }
    render(){
        return(
            <div data-tab-panel-0 className="am-tab-panel am-active tab">
                {
                    this.state.colCourseList.map((item,index)=>{
                        return(
                            <ArticleItem show={this.morecolEssay.bind(this)} key={index} item={item} />
                        )
                    })
                }
             </div>
        )
    }
}
class Collector extends React.Component{
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
                            <a >课程收藏</a>
                        </li>
                        <li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
                            <a >蜂行圈收藏</a>
                        </li>
				    </ul>
                    <div className="am-tabs-bd">
                        {
                            this.state.tab===1?<CourseCol/>:<EssayCol/>
                        }
                    </div>
				</div>
			</div>
		)
	}

}


export default Collector