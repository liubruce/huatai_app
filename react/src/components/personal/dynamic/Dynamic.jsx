import React from 'react'
import './dynamic.less'
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
    api.courseClick({pageno:1}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          courseList:data.myCourseList?data.myCourseList:[]
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
                   this.state.courseList.map((item,index)=>{
                     return(
                         <div key={index} className="am-panel cur-list">
                          <Link to='App/Course/CourseDetail'>
                            <img src={require('../../../style/images/test.png')}
                            //src={item.coursevideoPath}
                            />
                            <div className="right">
                              <p className="time">{tool.formatTimestamp(item.recordTime)}</p>
                              <h2>{item.courseName}</h2>
                              <p className="like"><span><i className="fa fa-heart-o"></i>{item.sumLike}</span><span><i className="fa fa-thumbs-o-up"></i>{item.sumCollection}</span></p>
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
          EssayList:data.myEssayDongList?data.myEssayDongList:[]
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
             {
               this.state.EssayList.map((item,index)=>{
                 return(
                   <div className="am-panel article-list" key={index}>
                     {
                       item.essayPhotos.map((item,index)=>{
                         return(
                               <img key={index} src={require('../../../style/images/portrait.png')}
                               //src={item.essayPhotoPath}
                               />
                         )
                       })
                     }
                      <div className="cont">
                        <p className="info"><span>{item.userRealName}</span>xxxxxxx分公司</p>
                        <p className="time">{tool.formatTimestamp(item.createTime)}</p>
                        <Link to={`/App/PersonalCenter/ArticleDetail/${item.essayId}`}>
                          <article className="am-article">
                              <div className="am-article-hd">
                                <h1 className="am-article-title"><div className="jc-icon"></div>{item.essayTitle}</h1>
                              </div>
                              <div className="am-article-bd">
                                <p className="am-article-lead">{item.essayNote}</p>
                              </div>
                          </article>
                        </Link>
                        <p className="like"><span><i className="fa fa-heart-o"></i>{item.sumLike}</span><span><i className="fa fa-thumbs-o-up"></i>{item.sumCollection}</span></p>
                      </div>
					      	</div>
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