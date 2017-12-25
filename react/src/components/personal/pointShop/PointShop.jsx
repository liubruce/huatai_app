import React from 'react'
import './pointShop.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import {hashHistory,browserHistory} from 'react-router';
class PointShop extends React.Component{
	constructor(args) {
		super();
		this.state = {
			pointShopList: tool.getObject(0),
			now_item: 0,
			loading: false,
			totalPage: 1,
			pageNo: 1,
			searchValue: ''
		}
	}
	componentDidMount() {
		tool.addScroll(this, this.pointShopList.bind(this));
	}
	componentWillUnmount() {
		tool.removeScroll();
	}
	pointShopList(flag) {
		tool.loading(this, true);
		api.pointShopList({
			pageno: this.state.pageNo,
			shopName: this.state.searchValue
		}).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					pointShopList: flag ? this.state.pointShopList.concat(data.IntegralShopList) : data.IntegralShopList,
					score: data.score,
					totalPage: data.totalPage
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
		this.pointShopList();
	}
	componentWillReceiveProps(nextProps) {
		this.pointShopList();
	}
	jump(item) {
		this.setState({
			now_item: item
		})
	}
	ok() {
		let body = {
			shopId: this.state.now_item.shopId
		}
		api.pointChange(body).then((data) => {
			if (data.result === 'RC100') {
				hashHistory.push(`/App/PersonalCenter/PointShop`);
			} else {
				message.error(data.errMsg, 3);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
	submit(e) {
		e.preventDefault();
		this.setState({
			pageNo: 1,
		}, () => {
			this.pointShopList();
		})
	}
	changeValue(e) {
		this.setState({
			searchValue: e.target.value
		})
	}
	render(){
		return(
			<div>
				<form onSubmit={(e)=>this.submit(e)} >
				{tool.isIOS?<div className='ios-header' ></div>:null}
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                   <div className="search" style={{left: '71px'}}>
					<i className="fa fa-search" />
					<input value={this.state.searchValue} onChange={this.changeValue.bind(this)} type="text" placeholder="搜索" />
					</div>
        </header>
				 </form>
			<Spin spinning={this.state.loading} >
			<div style={{minHeight:'300px'}} className="warpper">
				{
					this.state.pointShopList.map((item,index)=>{
						return(
						<div  key={index}>
								<div className="am-panel goods-list">
								<div className="goods-img">
									{
								       item.redeemCode?
											<div className="code-hide">
											{
												item.userShopIsBuy.isBuy===1?
												<span>{item.redeemCode}</span>:
												<span>密</span>
											}
											</div>:<img src={tool.getFile(item.shopCover)} alt="test"/>
									}

							 </div>
								<div className="goods-info">
									<h3>{item.shopName}</h3>
									<p><label>兑换积分:</label><span>{item.exchangeIntegral}</span></p>
									{item.redeemCode?null:<p><label>库存:</label><font>{item.stock}</font></p>}
									 <a onClick={()=>this.jump(item)}>
									 {
										 item.redeemCode?
										 <button type="button" className="am-btn-default">已兑换</button>:
                                         <button type="button" className="am-btn-primary" data-am-modal="{target: '#my-confirm'}">兑换</button>
									 }
									</a>
								</div>
							</div>
						</div>
						)
					})
				}

				<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirm">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">积分兑换</div>
						<div className="am-modal-bd">
							<p>商品名称：{this.state.now_item.shopName}</p>
							<p>兑换积分：{this.state.now_item.exchangeIntegral}</p>
							<p>可用积分：{this.state.score}</p>
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn" data-am-modal-cancel>取消</span>
							<span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
						</div>
					</div>
				</div>

			</div>
			</Spin>
			</div>
		)
	}

}


export default PointShop