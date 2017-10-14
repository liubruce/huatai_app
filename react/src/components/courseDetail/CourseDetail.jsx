import React from 'react'
import  './CourseDetail.less'
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {getFile_IP } from '../../config/serverIp'
let old_time = 0;
class CourseDetail extends React.Component{
	constructor(args) {
		super()
		this.state = {
			coursedata:{},
			courseattach:[],
			isEnd:false,
			titleList:[]
		}
	}
	componentWillMount() {
		let body = {
			courseId: this.props.params.id
		};
		api.appLoadCourse(body).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					coursedata:data.coursedata,
					courseattach:data.courseattach,
					titleList:data.titleList
				})
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}
	videoEnd(e) {
		this.setState({
				isEnd: true
			})
	}
	onTimeUpdate(e) {
		let test = document.getElementById('course_id');
		if (test.currentTime - old_time > 1) {
			// test.currentTime = old_time;
			this.setState({
				isQuick: true
			})
		} else {
			if (test.currentTime >= test.duration) {
				this.videoEnd();
			}
		}
		old_time = test.currentTime
	}
	wait(){
		// console.log('wait')
	}
	render() {
		let course = this.state.coursedata;
		return (
			<div className="warpper">
				<div className="video-box">

					<video 
					id="course_id"
					src={getFile_IP +'/downfile/'+course.coursevideoPath}
					controls="controls"  width="100%" height="210"
					// onEnded={(e)=>this.videoEnd(e)}
					onTimeUpdate={(e)=>this.onTimeUpdate(e)}
					onWaiting={()=>this.wait()}
					preload="auto">
						您的浏览器不支持 video 标签。
					</video>

					{/*<p className="like"><span><i className="fa fa-heart-o"></i>12331</span>
					<span><i className="fa fa-thumbs-o-up"></i>12331</span></p>*/}
				</div>
				
				<div className="am-panel">
					<div className="am-panel-bd">
						<article className="am-article">
						  	<div className="am-article-hd">
						   		<h1 className="am-article-title">{course.courseName}</h1>
						  	</div>
						  	<div className="am-article-bd">
						    	<p className="am-article-lead">{course.courseDesc}</p>
						  	</div>
						</article>
					</div>
				</div>
				
				<div className="am-panel">
					<div className="am-panel-hd">附件</div>
					<div className="am-panel-bd">
						<ul className="am am-avg-sm-3" style={{fontSize: '1.4rem'}}>
						    {this.state.courseattach.map((item,index)=>{
						    	return(
						    		<li key={index} ><a>{item.courseAttrachPath}</a></li>
						    		)
						    })}
						</ul>
					</div>
				</div>
				{course.elecReqCourse !== '1'?
				<div>
				{this.state.isEnd?
					<Link to={`App/Course/AnswerOnline/${course.courseId}`} className="am-btn am-btn-block btn-border">在线答题</Link>
					:
					<a className="am-btn am-btn-block btn-border test-btn">在线答题</a>
				}
				</div>
				:null}
				
			</div>
		);
	}

}


export default CourseDetail