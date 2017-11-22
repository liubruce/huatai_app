import React from 'react'
import './pointDetail.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
//import $ from 'jquery'
import DatePicker from 'react-mobile-datepicker';
class PointDetail extends React.Component{
	constructor(args){
		super();
		this.state = {
		    time:'',
 	    	isOpen: false,
				isOpenEND:false,
	    	dataDetailList:{},
				dataDetailLists:[],
				timeEND:'',
				timeDefalut:new Date(),
				loading:false,
        totalPage:1,
        pageNo:1,
				search:0,
	    }
	}
	componentDidMount() {
		if(this.state.search===0){
       tool.addScroll(this,this.integralDetails.bind(this));
		}else{
       tool.addScroll(this,this.fuzzyIntgral.bind(this));
		}
  }
	fuzzyIntgral(flag){
		let startTime='',endTime='';
		if(this.state.time!==''){
			startTime=tool.formatTimestamp(this.state.time,'y/m/d');
		}else{
			message.warning('请输入有效的开始日期', 3);
			return;
		}
		if(this.state.timeEND!==''){
			endTime=tool.formatTimestamp(this.state.timeEND,'y/m/d');
		}else{
			message.warning('请输入有效的结束日期', 3);
			return;
		}
		tool.loading(this, true);
		api.fuzzyIntgral({startTime:startTime,endTime:endTime,pageno:this.state.pageNo}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					dataDetailLists:flag?this.state.dataDetailLists.concat(data.fuzzylistuserintgral):data.fuzzylistuserintgral,
					totalPage:data.total
        })
      } else {
				this.setState({
					dataDetailLists:[]
				})
        message.error(data.errMsg, 3);
      }
			tool.loading(this, false);
    }, (res) => {
			tool.loading(this, false);
      tool.reject(res);
    })
	}
	integralDetails(flag){
		tool.loading(this, true);
    api.integralDetails({pageno:this.state.pageNo}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					dataDetailList:data?data:{},
					dataDetailLists:flag?this.state.dataDetailLists.concat(data.listIntegralDetails):data.listIntegralDetails,
					totalPage:data.total
        })
      } else {
        message.error(data.errMsg, 3);
      }
			tool.loading(this, false);
    }, (res) => {
      tool.reject(res);
			tool.loading(this, false);
    })
	}
  componentWillMount() {
		if(this.state.search===0){
        this.integralDetails();
		}else{
			this.fuzzyIntgral();
		}
  }
	componentWillUnmount() {
    tool.removeScroll();
  }
	componentWillReceiveProps(nextProps) {
		if(this.state.search===0){
        this.integralDetails();
		}else{
			this.fuzzyIntgral();
		}
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
  searchDetail(){
		this.setState({
			pageNo:1,
			search:1
		},()=>{
    	this.fuzzyIntgral();
		})
	}
	render(){
		let dataDetailList=this.state.dataDetailList;
		let dataDetailLists=this.state.dataDetailLists;
		let differencePercentage=dataDetailList.differencePercentage?dataDetailList.differencePercentage:0
		return(
				<div className="warpper">
					<div className="am-panel user-jf clearFix">
						<div className="user-tx-name">
							<img onError={(e) => tool.headImageError(e)} alt='img' src={tool.getFile(dataDetailList.headPath)}/>
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
							<label	type="button" className="am-margin-right"	onClick={this.handleClick}>开始日期</label><span id="my-startDate">{this.state.time===''?'年-月-日':tool.formatTimestamp(this.state.time,'y-m-d')}</span>
							<DatePicker value={this.state.time===''?this.state.timeDefalut:this.state.time} theme="ios" isOpen={this.state.isOpen}  onSelect={this.handleSelect} onCancel={this.handleCancel} style={{width:'100%'}}/>
						</div>
						<div className="datepicker1">
							<label	type="button" className="am-margin-right"	onClick={this.handleClickEND}>结束日期</label><span id="my-endDate">{this.state.timeEND===''?'年-月-日':tool.formatTimestamp(this.state.timeEND,'y-m-d')}</span>
							<DatePicker value={this.state.timeEND===''?this.state.timeDefalut:this.state.timeEND} theme="ios" isOpen={this.state.isOpenEND}  onSelect={this.handleSelectEND} onCancel={this.handleCancelEND} style={{width:'100%'}}/>
						</div>
						<button type="button" className="btn-query" onClick={this.searchDetail.bind(this)}>查询</button>
					</div>
					<Spin spinning={this.state.loading}>
						{
							dataDetailLists.map((item,index)=>{
								return(
                  <div key={index} className="am-panel jf-list">
										<p className="jf-tag">{item.integralChangType===1||item.integralChangType==='1'?'消费':'获得'}</p>
					        	<p className="time">{tool.formatTimestamp(item.integralChangTime)}</p>
					        	<p className="jf-list-cont">{item.integralChangInfo}</p>
									</div>
								)
							})
						}
					</Spin>
					</div>
		)
	}

}


export default PointDetail