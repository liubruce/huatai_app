import React from 'react'
import { message } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {hashHistory} from 'react-router';
class CourseItem extends React.Component {
	constructor(args) {
		super();
		this.state = {
			now_item: {
				studyIntegral:0
			}
		}
	}
	jump(item) {
		if(item.courseConvert===1){
            message.warning('视频转码中，请稍后再试...', 1);
		}else if(item.courseConvert===2){
            message.warning('转码失败，请联系管理员...', 1);
		}else{
			//	if(item.clickRat<=200){
					if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
						hashHistory.push(`/App/Course/courseDetail/${item.courseId}`);
						return;
					}
					this.setState({
						now_item: item
					})
					// }else{
					// 	message.warning('该课程在加载中...', 3);
					// 	}
			}
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
						<a>
							<img onClick={()=>this.jump(item)} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} src={require('../../style/images/test.png')} alt="test"/>
							<p onClick={()=>this.jump(item)} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} className="time">{tool.formatTimestamp(item.createTime)}</p>
						</a>
						<div className="cur-list-info">
							<h2 onClick={()=>this.jump(item)} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""}>{item.courseName}{item.goodCourse === '1'?<div className="jc-icon" />:null}</h2>
							<p className="like">
								<span className={item.userCourseOperation.isCollection===1?'active':''} data-am-modal={isBuy?`{target: '#course-confirm${item.courseId}'}`:""} onClick={()=>this.click(item)}>
								<i className="fa fa-heart-o"/>{item.sumCollection}</span>
								<span className={item.userCourseOperation.isLike===1?'active':''} onClick={()=>this.action(item.courseId,3)}>
								<i className="fa fa-thumbs-o-up"/>{item.sumLike}</span>
								</p>
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
export default CourseItem;