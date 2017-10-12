import React from 'react'
import './course.less'
import { message , Spin } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import CourseItem from './CourseItem.jsx'
class Course extends React.Component {
  constructor(args) {
    super()
    this.state = {
      tab: 1,
      courseList: [],
      loading: false,
      currentPage: 1,
      elecReqCourse: 0,
      goodCourse: 1,
      score:0
    }
  }
  changeTab(tab) {
    let elecReqCourse = 0;
    let goodCourse = 1;
    switch (tab) {
      case 1:
        goodCourse = 1;
        elecReqCourse = 0;
        break;
      case 2:
        this.setState({
          courseList: [],
          tab:2
        })
        return;
      case 3:
        goodCourse = 0;
        elecReqCourse = 1;
        break;
      default:
        break;
    }
    this.setState({
      tab,
      elecReqCourse,
      goodCourse
    }, () => {
      this.show();
    })
  }
  componentWillMount() {
    this.show();
  }
  componentWillReceiveProps(nextProps) {
    this.show();
  }
  show() {
    tool.loading(this, true);
    let body = {
      currentPage: this.state.currentPage,
      courseName: tool.getQueryString('search'),
      elecReqCourse: this.state.elecReqCourse,
      goodCourse: this.state.goodCourse
    }
    api.appStudentSelectCoursePager(body).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          // courseList: this.state.courseList.concat(data.coursePage.pageItems)
          courseList:data.coursePage.pageItems,
          score:data.score
        })
      } else {
        message.error(data.errMsg, 3);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
	render(){
		return(
             <div className="warpper">
              
                  <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                    <ul className="am-tabs-nav am-cf nav">
                      <li className={this.state.tab===1?'am-active':null} onClick={()=>this.changeTab(1)} >
                        <a>精品课程</a>
                      </li>
                      <li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
                        <a>热播课程</a>
                      </li>
                      <li className={this.state.tab===3?'am-active':null} onClick={()=>this.changeTab(3)}>
                        <a>必修课程</a>
                      </li>
                    </ul>
                     <Spin spinning={this.state.loading} tip="加载列表中...">
                       {this.state.courseList.map((item,index)=>{
                         return(
                           <CourseItem show={this.show.bind(this)} key={index} score={this.state.score} item={item} />
                           )
                       })}
                     </Spin>
                  </div>
                
              </div>

			)
	}
}
export default Course;