import React from 'react'
import './course.less'
import {Link} from 'react-router'
import { message , Spin } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'

class Course extends React.Component {
	constructor(args) {
		super()
    this.state = {
      tab : 1,
      courseList:[],
      loading:true
    }
	}
  changeTab(tab){
    this.setState({
      tab
    })
  }
  componentWillMount() {
    this.show();
  }
  show() {
    api.appStudentSelectCoursePager().then((data) => {
      if (data.result === 'RC100') {

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
             <Spin spinning={this.state.loading} tip="加载列表中...">
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

                  {this.state.courseList.map((item,index)=>{
                    return(
                         <div className="am-tabs-bd" key={index} >
                           <div data-tab-panel-0 className="am-tab-panel am-active tab">
                             <div className="am-panel cur-list">
                               <Link to='App/Course/CourseDetail'>
                                 <video 
                                 src={getFile_IP+'/downfile/'+item.coursevideoPath}   
                                 width="100%"  
                                 height="100%" 
                                 className="v-img"
                                 >
                                 您的浏览器不支持 video 标签。
                                </video>
                                 <div className="right">
                                   <p className="time">2017.06.15  17:21</p>
                                   <h2>课程名称</h2>
                                   <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
                                 </div>
                               </Link>
                             </div>
                           </div>
                         </div>
                      )
                  })}
                </div>
                </Spin>
              </div>

			)
	}
}
export default Course;