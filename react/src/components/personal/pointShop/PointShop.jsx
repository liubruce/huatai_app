import React from 'react'
import './pointShop.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
import {hashHistory} from 'react-router';
class PointShop extends React.Component{
	constructor(args){
		super();
		this.state={
			pointShopList:tool.getObject(0),
			now_item:0,
			loading:false,
      totalPage:1,
      pageNo:1,
		}
	}
	componentDidMount() {
    tool.addScroll(this,this.pointShopList.bind(this));
  }
	componentWillUnmount() {
    tool.removeScroll();
  }
	pointShopList(flag){
		tool.loading(this, true);
     api.pointShopList({pageno:this.state.pageNo}).then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					pointShopList:flag?this.state.pointShopList.concat(data.IntegralShopList):data.IntegralShopList,
					score:data.score,
					totalPage:data.totalPage
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
  jump(item){
  	this.setState({
      now_item: item
    })
  }
  ok(){
  	let body = {
      shopId:this.state.now_item.shopId
    }
    api.pointChange(body).then((data)=>{
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
	render(){
		return(
			<div className="warpper">
				{
					this.state.pointShopList.map((item,index)=>{
						return(
                <div key={index} className="am-panel goods-list">
								<div className="goods-img"><img src={tool.getFile(item.shopCover)}
							//	src={item.shopCover}
								/></div>
								<div className="goods-info">
									<h3>{item.shopName}</h3>
									<p><label>兑换积分:</label><span>{item.exchangeIntegral}</span></p>
									<p><label>库存:</label><font>{item.stock}</font></p>
									 <a onClick={()=>this.jump(item)}>
										<button type="button" className="am-btn-primary" data-am-modal="{target: '#my-confirm'}">兑换</button>
									</a>
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
		)
	}

}


export default PointShop