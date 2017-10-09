import React from 'react'
import  './studentTop.less'
import { message } from 'antd';
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'

class StudentTop extends React.Component{
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
								<p>XXXX    会员等级A</p>
								<span>华泰保险XXXXX第二分公司</span>
							</div>
							<div className="rank-icon rank-icon-1"></div>
						</div>
					</div>
					<div data-tab-panel-1 className="am-tab-panel am-active tab">
						<div className="am-panel rank-list">
							<img className='head_img' src='' onError={(e) => tool.headImageError(e)} alt='img' />
							<div className="rank-info">
								<p>XXXX    会员等级B</p>
								<span>华泰保险XXXXX第二分公司</span>
							</div>
							<div className="rank-icon rank-icon-1"></div>
						</div>
					</div>
					<div data-tab-panel-2 className="am-tab-panel tab">
						<div className="am-panel rank-list">
							<img className='head_img' src='' onError={(e) => tool.headImageError(e)} alt='img' />
							<div className="rank-info">
								<p>XXXX    会员等级C</p>
								<span>华泰保险XXXXX第二分公司</span>
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
export default StudentTop