import React from 'react'
import  './courseTop.less'
import { message } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'

class CourseTop extends React.Component{
	constructor(args){
		super()
		this.state={
		}
	}
	render(){
		return(
		<div className="warpper">
			<div data-am-widget="tabs" className="am-tabs am-tabs-default">
				<ul className="am-tabs-nav am-cf nav">
					<li className="">
						<a>日榜</a>
					</li>
					<li className="am-active">
						<a>周榜</a>
					</li>
					<li className="">
						<a>月榜</a>
					</li>
				</ul>
				<div className="am-tabs-bd">
					<div data-tab-panel-0 className="am-tab-panel tab">
						<div className="am-panel rank-list">
							<img className='head_img' src='' onError={(e) => tool.headImageError(e)} alt='img' />
							<div className="rank-info">
								<p>&lceil;<span>杨秀云</span>&rfloor;课程名称</p>
								<span>2017.06.25</span>
							</div>
							<div className="rank-icon rank-icon-1"></div>
						</div>
					</div>
					<div data-tab-panel-1 className="am-tab-panel am-active tab">
						<div className="am-panel rank-list">
							<img className='head_img' src='' onError={(e) => tool.headImageError(e)} alt='img' />
							<div className="rank-info">
								<p>&lceil;<span>杨秀云</span>&rfloor;课程名称</p>
								<span>2017.06.25</span>
							</div>
							<div className="rank-icon rank-icon-1"></div>
						</div>
					</div>
					<div data-tab-panel-2 className="am-tab-panel tab">
						<div className="am-panel rank-list">
							<img className='head_img' src='' onError={(e) => tool.headImageError(e)} alt='img' />
							<div className="rank-info">
								<p>&lceil;<span>杨秀云</span>&rfloor;课程名称</p>
								<span>2017.06.25</span>
							</div>
							<div className="rank-icon rank-icon-1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}

}
export default CourseTop