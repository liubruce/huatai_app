import React from 'react'
import './course.less'
import * as tool from '../../config/tools'

class Course extends React.Component {
	constructor(args) {
		super()
    this.state = {
      tab : 1,
      courseList:tool.getObject(4)
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
                               <a>
                                 <img alt='test' src={require('../../style/images/test.png')} />
                                 <div className="right">
                                   <p className="time">2017.06.15  17:21</p>
                                   <h2>课程名称</h2>
                                   <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
                                 </div>
                               </a>
                             </div>
                           </div>
                         </div>
                      )
                  })}

                </div>
              </div>

			)
	}
}
export default Course;