import React from 'react'
import './CourseDetail.less'
import { Link } from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import { message } from 'antd'
import $ from 'jquery'

import ChimeeMobilePlayer from 'chimee-mobile-player'

// import ChimeePlayer from 'chimee-player'
// import chimeePluginControlbar from 'chimee-plugin-controlbar';

let old_time = 0;
let myPlayer;
let chimee;
class CourseDetail extends React.Component {
    constructor(args) {
        super()
        this.state = {
            coursedata: {},
            courseattach: [],
            isEnd: false,
            titleList: [],
            showTitle: false,
            percent: 0,
            answerScore: 0,
            videoPalyId:''
        }
    }


    onTimeUpdate(e) {
        let test = document.getElementById('course_id');
        if (test.currentTime - old_time > 1) {
            message.error('请勿快进视频', 1);
            // test.currentTime = old_time;
            return;
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
        this.setState({
            percent: 0
        }, () => {
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
    componentWillMount() {
        let body = {
            courseId: this.props.params.id
        };
        api.appLoadCourse(body).then((data) => {
            if (data.result === 'RC100') {
                this.setState({
                    coursedata: data.coursedata,
                    courseattach: data.courseattach,
                    titleList: data.titleList,
                    answerScore:data.answerScore,
                    videoPalyId:data.vpt.videoPalyId
                },()=>{
                    this.chooseVideo(0);
                    // this.showVideo();
                    if(this.state.coursedata){
                        if(this.state.coursedata.courseConvert===1){
                             message.warning('视频转码中，请稍后再试...', 1);
                        }else if(this.state.coursedata.courseConvert===2){
                            message.warning('转码失败，请联系管理员...', 1);
                        }
                    }
                })
            } else {
                message.error(data.errMsg, 3);
            }
        }, (res) => {
            tool.reject(res);
        })
    }
    chooseVideo(num){
        switch(num){
            case 0:this.testVideo(tool.getFile(this.state.coursedata.coursevideoPath));break;
            case 1:this.testVideo('https://estatic.oss-cn-szfinance.aliyuncs.com/kyh/video/1.mp4');break;
            case 2:this.testVideo('https://estatic.oss-cn-szfinance.aliyuncs.com/kyh/video/2.mp4');break;
            case 3:this.testVideo('https://estatic.oss-cn-szfinance.aliyuncs.com/kyh/video/3.mp4');break;
            case 4:this.testVideo('https://estatic.oss-cn-szfinance.aliyuncs.com/kyh/video/4.mp4');break;
            default:break;
        }
    }
    saveVideo(){
        let body = {};
        body.videoPalyId = this.state.videoPalyId;
        body.palyInterWay = navigator.connection.type || 'wifi';
        body.palyShowWay = 'APP'
        api.appSaveVideoTimes(body).then(data=>{

        }, (res) => {
            tool.reject(res);
        })
    }
    testVideo(src) {
        chimee = new ChimeeMobilePlayer({
            wrapper: '#video_div',
            src: src,
            isLive: false,
            autoplay: false,
           
        });

        chimee.on('play', evt => {
            chimee.controls = true;
            this.setState({
                showTitle: false
            })
        });
        chimee.on('ended', evt => {
            this.setState({
                isEnd: true
            })
            this.saveVideo()
        });
        if (!tool.isPc && navigator.connection.type !== "wifi") {
            this.setState({
                showTitle: true
            })
        } else {
            // this.setState({
            //     showTitle: true
            // })
            chimee.play();
        }
    }
    showVideo() {
        // let src = tool.getFile(this.state.coursedata.coursevideoPath);
        // const videoJsOptions = {
        //     autoplay: false,
        //     controls: true,
        //     playsinline:true,
        //     sources: [{
        //         src,
        //         type: 'video/mp4'
        //     }]
        // }
        // let that = this;
        // this.player = videojs(this.refs.course_player, videoJsOptions, function onPlayerReady() {
        //     $('.vjs-big-play-button').css('display','none');
        //     myPlayer = this;
        //     myPlayer.on('timeupdate', () => {
        //         let currentTime = myPlayer.currentTime();
        //         let duration = myPlayer.duration();
        //         if (currentTime - old_time > 1) {
        //             message.error('请勿快进视频', 1);
        //             myPlayer.currentTime(old_time);
        //         } else {
        //             if (currentTime >= duration) {
        //                 that.setState({
        //                     isEnd: true
        //                 })
        //             }
        //         }
        //         old_time = currentTime
        //     });
        //     myPlayer.play();
        //     // console.log(that.state.showTitle)
        //     if(that.state.showTitle){
        //         myPlayer.pause();
        //     }
        // });
    }
    play() {
        this.setState({
            showTitle: false
        }, () => {
            chimee.play(); 
            // myPlayer.play();
        })
    }
    render() {
        let course = this.state.coursedata;
        return (
            <div className="warpper">
				<div className="video-box">

				    <div className="opacity-black">	  

                     <div
                     id="video_div"
                     ></div>

{/*                     <video
                       width={$(window).width()}
                       height="210"
                       ref="course_player"
                       className="video-js"
                        ></video>*/}


{/*				        <video 
					    id="course_id"
					    src={tool.getFile(this.state.coursedata.coursevideoPath)}
					    controls="controls"  width="100%" height="210"
					    onTimeUpdate={(e)=>this.onTimeUpdate(e)}
					    preload="auto"
					    >
					    </video>*/}

					</div>

					{this.state.showTitle ? <div onClick={() => this.play()} className="tip-play">
                    <i className="fa fa-play"></i> 即将消耗手机流量</div> : null}

				    {/*	{this.state.showTitle ? <p className='video-title'><a>建议在wifi下观看</a></p>: null}*/}


					{ /*<p className="like"><span><i className="fa fa-heart-o"></i>12331</span>
					<span><i className="fa fa-thumbs-o-up"></i>12331</span></p>*/ }

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
					<div className="am-panel-hd">附件(请在PC端下载)</div>
					<div className="am-panel-bd">
						<ul className="am am-avg-sm-3" style={{
                fontSize: '1.4rem'
            }}>
						    {this.state.courseattach.map((item, index) => {
                return (
                    <li key={index} ><a 
                    // onClick={() => this.downFile(item.courseAttrachPath, this)}
                     // data-am-modal="{target: '#load-modal'}"
                     >{item.courseAttrachPath}</a></li>
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
                <span onClick={() => tool.cancelDown()} className="am-modal-btn">取消</span>
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

                

				{course.goodCourse !== '1' ?
                <div>
                {
                    localStorage.getItem('channelId')==='4'?
                    <Link to={"/PrivateTheme/"+ course.createUser} 
                        style={{position: 'absolute',
                        right: '16px',top: '286px',
                        display: 'block',
                        border: '1px solid #0084C7',
                        color: '#0084C7',padding: '2px 5px',
                        borderRdius: '5px'}}>私信TA</Link>:null
                }
                {this.state.answerScore === 5?
                    <a className="am-btn am-btn-block btn-border test-btn">您已通过此课程</a>
                    :
				this.state.isEnd ?
                    <Link to={`App/Course/AnswerOnline/${course.courseId}`} className="am-btn am-btn-block btn-border">在线答题</Link>
                    :
                    <a style={{color:"#ccc"}} className="am-btn am-btn-block btn-border test-btn">视频播放完成后答题</a>
                }
                {
                   course.courseId===undefined || this.state.answerScore===-1?null:<Link to={`/App/Course/Answerhistory/${course.courseId}/1`} className="am-btn am-btn-block btn-border">查看答题历史</Link>
                }
				</div>
                : null}
				
			</div>
        );
    }

}


export default CourseDetail