import React from 'react'
import './pointDetail.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
import $ from 'jquery'
import DatePicker from 'react-mobile-datepicker';
class PointDetail extends React.Component{
	constructor(args){
		super();
		this.state = {
		    time:new Date(new Date()-1000*60*60*24*7),
 	    	isOpen: false,
				isOpenEND:false,
	    	dataDetailList:[],
				timeEND:new Date()
	    }
	}
	fuzzyIntgral(){
		api.fuzzyIntgral({}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					dataDetailList:data.data
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
	}
	integralDetails(){
    api.integralDetails({}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					dataDetailList:data.data
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
	}
  componentWillMount() {
		this.fuzzyIntgral();
		this.integralDetails();
  }
	handleClick = () => {
		this.setState({ isOpen: true });
	}
  handleClickEND = () => {
		this.setState({ isOpenEND: true });
	}
	handleCancel = () => {
		this.setState({ isOpen: false });
	}
	handleCancelEND = () => {
		this.setState({ isOpenEND: false });
	}
	handleSelect = (time) => {
		this.setState({ time, isOpen: false });
	}
	handleSelectEND = (time) => {
		this.setState({ timeEND:time, isOpenEND: false });
	}

	render(){
		let dataDetailList=this.state.dataDetailList;
		let differencePercentage=dataDetailList.differencePercentage?dataDetailList.differencePercentage:0
		return(
				<div className="warpper">
					<div className="am-panel user-jf clearFix">
						<div className="user-tx-name">
							<img src={require('../../../style/images/test.png')}/>
							<p>{dataDetailList.userName}</p>
						</div>
						<div className="user-jf-details">
							<p>{dataDetailList.vipUserIntgralAvailable}分</p>
							<div className="progress">
								<div className="progress-bar" style={{width:differencePercentage+'%'}}></div>
							</div>
							<ul className="am-avg-sm-4 am-text-center">
								<li>25%</li>
								<li>50%</li>
								<li>75%</li>
								<li>100%</li>
							</ul>
						</div>
					</div>
					<div className="am-panel">
						<div className="am-alert am-alert-danger" id="my-alert" style={{display:'none'}}>
							<p>开始日期应小于结束日期！</p>
						</div>
						<div className="datepicker1">
							<label	type="button" className="am-margin-right"	onClick={this.handleClick}>开始日期</label><span id="my-startDate">{tool.formatTimestamp(this.state.time,'y-m-d')}</span>
							<DatePicker value={this.state.time} theme="ios" isOpen={this.state.isOpen}  onSelect={this.handleSelect} onCancel={this.handleCancel} style={{width:'100%'}}/>
						</div>
						<div className="datepicker1">
							<label	type="button" className="am-margin-right"	onClick={this.handleClick}>结束日期</label><span id="my-endDate">{tool.formatTimestamp(this.state.timeEND,'y-m-d')}</span>
							<DatePicker value={this.state.timeEND} theme="ios" isOpen={this.state.isOpenEND}  onSelect={this.handleSelectEND} onCancel={this.handleCancelEND} style={{width:'100%'}}/>
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