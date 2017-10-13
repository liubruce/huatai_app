import React from 'react'
import './dynamic.less'
import {Link} from 'react-router'
import * as api from '../../../config/api'
import {message} from 'antd'
import * as tool from '../../../config/tools'
import ArticleItem from '../../article/ArticleItem.jsx'
import CourseItem from '../../course/CourseItem.jsx'
import {getFile_IP } from '../../../config/serverIp'
class CourseDy extends React.Component{
    constructor(args){
		super();
		this.state={
			courseList:tool.getObject(0),
      loading:false,
      totalPage:1,
      pageNo:1,
      score:0,
		}
	}
  componentDidMount() {
    tool.addScroll(this,this.courseClick.bind(this));
  }
  componentWillUnmount() {
    tool.removeScroll();
  }
  courseClick(flag){
    tool.loading(this, true);
     api.courseClick({pageno:1}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          courseList:data.myCourseList?data.myCourseList:[],
          totalPage:data.totalPage,
          score:data.score
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
      this.courseClick();
    }
    componentWillReceiveProps(nextProps) {
    this.courseClick();
  }
    render(){
        return(
               <div data-tab-panel-0 className="am-tab-panel am-active tab">
                 {
                   this.state.courseList.map((item,index)=>{
                     return(
                         <CourseItem show={this.courseClick.bind(this)} key={index} score={this.state.score} item={item} />
                     )
                   })
                 }
           </div>
        )
    }
}
class EssayDy extends React.Component{
	constructor(args){
		super();
		this.state={
			EssayList:tool.getObject(0),
      loading:false,
      totalPage:1,
      pageNo:1,
		}
	}
  componentDidMount() {
    tool.addScroll(this,this.moreEssay.bind(this));
  }
  componentWillUnmount() {
    tool.removeScroll();
  }
  moreEssay(){
    tool.loading(this, true);
    api.moreEssay().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          EssayList:data.myEssayDongList?data.myEssayDongList:[],
          totalPage:data.totalPage,
          score:data.score
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
    this.moreEssay();
  }
  componentWillReceiveProps(nextProps) {
    this.moreEssay();
  }
    render(){
        return(
           <div data-tab-panel-1 className="am-tab-panel am-active tab">
             {
               this.state.EssayList.map((item,index)=>{
                 return(
                  <ArticleItem show={this.moreEssay.bind(this)} key={index} item={item} />
                 )

               })
             }
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