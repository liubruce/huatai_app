import React from 'react'
import  './CourseDetail.less'
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'

import $ from 'jquery'

let old_time = 0;
class CourseDetail extends React.Component {
	constructor(args) {
		super()
		this.state = {
			coursedata: {},
			courseattach: [],
			isEnd: false,
			titleList: [],
			showTitle:tool.isPc?'':navigator.connection.type!=="wifi",
			percent:0
		}
	}
	componentWillMount() {
		let body = {
			courseId: this.props.params.id
		};
		api.appLoadCourse(body).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					coursedata: data.coursedata,
					courseattach: data.courseattach,
					titleList: data.titleList
				})
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}

	componentDidMount() {
		// var video={};
		// video.type = "video/mp4";
		// video.src = "//vjs.zencdn.net/v/oceans.mp4";
		// video.src = tool.getFile(this.state.coursedata.coursevideoPath);
		// var course_player = window.videojs(this.refs.course_player, {}).ready(() => {
		// 	course_player.src(video);
		// 	course_player.height("210");
		// 	course_player.width($(window).width());
		// 	player.play();
		// });
	}

	handleStateChange(state, prevState) {
		if (!state.paused && this.state.showTitle) {
			this.setState({
				showTitle: false
			})
		}
		if (state.currentTime - old_time > 1) {
			message.error('请勿快进视频', 1);
			this.refs.course_video.seek(old_time);
		} else {
			if (state.currentTime >= state.duration) {
				this.setState({
					isEnd: true
				})
			}
		}
		old_time = state.currentTime
	}

	onTimeUpdate(e) {
		let test = document.getElementById('course_id');
		if (test.currentTime - old_time > 1) {
			message.error('请勿快进视频', 1);
			test.currentTime = old_time;
			this.setState({
				isQuick: true
			})
		} else {
			if (test.currentTime >= test.duration) {
				this.setState({
					isEnd: true
				})
			}
		}
		old_time = test.currentTime
	}

	downFile(filename) {
		this.setState({percent: 0},()=>{
			tool.downFile(filename);
		})
		navigator.fileTransfer.onprogress = (progressEvent) => {
			if (progressEvent.lengthComputable) {
				console.log('----------' + progressEvent.loaded / progressEvent.total * 100);
				this.setState({
					percent: (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
				})
			} else {
				this.setState({
					percent: 100
				})
			}
		};
	}

	render() {
		let course = this.state.coursedata;
		return (
			<div className="warpper">
				<div className="video-box">

				    <div className="opacity-black">	  

{/*		                <video
                          className="video-js"
                          controls
                          ref="course_player">
                        </video>  */}

				        <video 
					    id="course_id"
					    src={tool.getFile(course.coursevideoPath)}
					    controls="controls"  width="100%" height="210"
					    onTimeUpdate={(e)=>this.onTimeUpdate(e)}
					    preload="auto"
					    >
					    	您的浏览器不支持 video 标签。
					    </video>

					</div>

					{this.state.showTitle?<div onClick={()=>this.play()} className="play">
					<i className="fa fa-play"></i>
					
					</div>:null}
					{this.state.showTitle?<p className='video-title'><a>即将消耗手机流量</a></p>
					:null}


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
					<div className="am-panel-hd">附件{tool.isPc?'':navigator.connection.type}</div>
					<div className="am-panel-bd">
						<ul className="am am-avg-sm-3" style={{fontSize: '1.4rem'}}>
						    {this.state.courseattach.map((item,index)=>{
						    	return(
						    		<li key={index} ><a onClick={()=>this.downFile(item.courseAttrachPath,this)} data-am-modal="{target: '#load-modal'}">{item.courseAttrachPath}</a></li>
						    		)
						    })}
						</ul>
					</div>
					<div className="am-modal am-modal-confirm" tabIndex="-1" id="load-modal">
	                    <div className="am-modal-dialog">
	                        <div className="am-modal-hd">下载中</div>
	                        <div className="am-modal-bd">
	                            {this.state.percent}%
	                        </div>
	                        <div className="am-modal-footer">
	                           {this.state.percent === 100 || this.state.percent === '100' ?
	                            <span className="am-modal-btn">确定</span>
	                            :
	                            <span onClick={()=>tool.cancelDown()} className="am-modal-btn">取消</span>
	                           }
	                        </div>
	                    </div>
	                </div>

					<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-modal">
						<div className="am-modal-dialog">
							<div className="am-modal-hd">温馨提示</div>
							<div className="am-modal-bd">
								下载成功
							</div>
							<div className="am-modal-footer">
								<span className="am-modal-btn">确定</span>
							</div>
						</div>
					</div>
				</div>
				{course.goodCourse !== '1'?
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