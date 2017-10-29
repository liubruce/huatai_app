import React from 'react'
import  './CourseDetail.less'
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'

import { Player} from 'video-react';
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
			showTitle:tool.isPc?'':navigator.connection.type!=="wifi"
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
		$('.video-react-big-play-button').css('display', 'none');

		// $('.video-react-control-bar').css('display','none');

		this.refs.course_video.subscribeToStateChange(this.handleStateChange.bind(this));
		setTimeout(() => {
			// this.refs.course_video.play();
			// this.refs.course_video.pause();
		}, 500)
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
	play() {
			this.refs.course_video.play();
		}
		/*	onTimeUpdate(e) {
				let test = document.getElementById('course_id');
				if (test.currentTime - old_time > 1) {
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
			}*/
	render() {
		let course = this.state.coursedata;
		return (
			<div className="warpper">
				<div className="video-box">

				    <div className="opacity-black"><a>

{/*					    <video 
					    id="course_id"
					    // src={tool.getFile('/downfile/'+course.coursevideoPath)}
					    controls="controls"  width="100%" height="210"
					    // onEnded={(e)=>this.videoEnd(e)}
					    onTimeUpdate={(e)=>this.onTimeUpdate(e)}
					    onWaiting={()=>this.wait()}
					    preload="auto">
					    	您的浏览器不支持 video 标签。
					    </video>*/}
           
                   <Player
                     ref='course_video'
                     fluid={false} 
                     playsInline={true}
                     width={$(window).width()} 
                     onError={()=>{message.error('视频获取失败', 1);}}
                     poster={require('../../style/images/test.png')}
                     height={210}
                     src={tool.getFile(course.coursevideoPath)}
                     >
                     <source
                      autoPlay
                      src={tool.getFile(course.coursevideoPath)}
                      />
                    </Player>

					</a></div>

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
						    		<li key={index} ><a>{item.courseAttrachPath}</a></li>
						    		)
						    })}
						</ul>
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