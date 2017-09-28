import React from 'react'
import './pointDetail.less'
import * as tools from '../../../config/tools' 
class PointDetail extends React.Component{
	constructor(args){
		super()
	}
	render(){
		return(
				<div className="warpper">
					<div className="am-panel user-jf clearFix">
						<div className="user-tx-name">
							<img src={require('../../../style/images/test.png')}/>
							<p>毛*平</p>
						</div>
						<div className="user-jf-details">
							<p>15060分</p>
							<div className="progress">
								<div className="progress-bar" style={{width:'30%'}}></div>
							</div>
							<ul className="am-avg-sm-4 am-text-center">
								<li>高手</li>
								<li>掌门</li>
								<li>宗师</li>
								<li>盟主</li>
							</ul>
						</div>
					</div>
					<div className="am-panel">
						<div className="am-alert am-alert-danger" id="my-alert" style={{display:'none'}}>
							<p>开始日期应小于结束日期！</p>
						</div>
						<div className="datepicker">
							<label type="button" className="am-margin-right">开始日期</label><span id="my-startDate">年-月-日</span>
						</div>
						<div className="datepicker">
							<label type="button" className="am-margin-right">结束日期</label><span id="my-endDate">年-月-日</span>
						</div>
						<button type="button" className="btn-query">查询</button>
					</div>
					<div className="am-panel jf-list">
						<p className="jf-tag">获得</p>
						<p className="time">2017.06.10  12:00</p>
						<p className="jf-list-cont">您通过在线学习，获得10点等级积分和用积分。当前等级积分X点，可用积分Y点</p>
					</div>
				</div> 
		)
	}

}


export default PointDetail