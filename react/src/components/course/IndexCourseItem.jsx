import React from 'react'
import { message } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'
import {hashHistory} from 'react-router';
class IndexCourseItem extends React.Component {
	constructor(args) {
		super();
		this.state = {
			now_item: {
				studyIntegral:0
			}
		}
	}
	jump(item) {
		if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
			hashHistory.push(`/App/Course/courseDetail/${item.courseId}`);
			return;
		}
		this.setState({
			now_item: item
		})
	}
	ok() {
		let body = {
			courseId: this.state.now_item.courseId
		}
		api.cashcourse(body).then((data) => {
			if (data.result === 'RC100') {
				hashHistory.push(`/App/Course/courseDetail/${this.state.now_item.courseId}`);
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	action(courseId,recordType){
		let body = {
			courseId,
			recordType
		};
		api.operatecourse(body).then((data) => {
			if (data.result === 'RC100') {
				this.props.show();
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	click(item){
		if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
			this.action(item.courseId,2);
			return;
		}
		this.setState({
			now_item: item
		})
	}
	render(){
		let item = this.props.item;
		let isBuy = item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1;
		return(
            <li>

                               
                     <div className="am-gallery-item">
                       <a>
                         <video 
                         onClick={()=>this.jump(item)} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""}
                           src={getFile_IP+'/downfile/'+item.coursevideoPath}   
                           className="v-img"
                           >
                           您的浏览器不支持 video 标签。
                         </video>
                         <h3 onClick={()=>this.jump(item)} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} className="am-gallery-title">{item.courseName}
                         {item.goodCourse === '1'?<div className="jc-icon" />:null}</h3>
                          <div data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} onClick={()=>this.click(item)} className="am-gallery-desc"><i className={item.userCourseOperation.isCollection===1?'fa fa-heart-o active':'fa fa-heart-o'} />{item.sumCollection}</div>
{/*                          <div data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} onClick={()=>this.click(item)} className="am-gallery-desc"><i className={item.userCourseOperation.sumLike===1?'fa fa-thumbs-o-up active':'fa fa-thumbs-o-up'} />{item.sumLike}</div>*/}

                       </a>
                     </div>       
        

      <div className="am-modal am-modal-confirm" tabIndex="-1" id={`course-confirm${item.courseId}`}>
       <div className="am-modal-dialog">
         <div className="am-modal-hd">温馨提示</div>
         <div className="am-modal-bd">
           兑换课程将需要{this.state.now_item.studyIntegral}积分，您的当前积分为{this.props.score}，是否继续？
         </div>
         <div className="am-modal-footer">
           <span className="am-modal-btn" data-am-modal-cancel>取消</span>
           <span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
         </div>
        </div>
       </div>
       
              </li>
			)
	}
}
export default IndexCourseItem;