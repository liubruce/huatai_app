import React from 'react'
import  './CourseDetail.less'
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'

class CourseDetail extends React.Component{
	constructor(args){
		super()
		this.state={
		}
	}
    componentWillMount() {
    api.couCollection().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
	render() {
		return (
			<div className="warpper">
				<div className="video-box">
					<video controls preload="none" width="100%" height="210" poster="images/test.png">
						<source src="images/周杰伦 - 告白气球.mp4" type='video/mp4'></source>
					</video>
					<span><i className="fa fa-youtube-play"></i></span>
					<p className="like"><span><i className="fa fa-heart-o"></i>12331</span><span><i className="fa fa-thumbs-o-up"></i>12331</span></p>
				</div>
				
				<div className="am-panel">
					<div className="am-panel-bd">
						<article className="am-article">
						  	<div className="am-article-hd">
						   		<h1 className="am-article-title">课程名称</h1>
						  	</div>
						  	<div className="am-article-bd">
						    	<p className="am-article-lead">课程简述：那一刻是凌晨，我从线下活动的郑州赶回来，下了火车直奔家门。客厅的灯开着，家人早已入睡，我身子只是一斜，肩头的包就溜到了沙发上。我去卧室时才发觉手里居然还………</p>
						  	</div>
						</article>
					</div>
				</div>
				
				<div className="am-panel">
					<div className="am-panel-hd">附件</div>
					<div className="am-panel-bd">
						<ul className="am am-avg-sm-3" style={{fontSize: '1.4rem'}}>
							<li>课程附件_1.doc</li>
							<li>课程附件_2.pdf</li>
							<li>课程附件_3.xls</li>
						</ul>
					</div>
				</div>
				<Link to='App/Course/AnswerOnline' className="am-btn am-btn-block btn-border">在线答题</Link>
			</div>
		);
	}

}


export default CourseDetail