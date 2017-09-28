import React from 'react'
import './pointShop.less'
import * as tools from '../../../config/tools' 
class PointShop extends React.Component{
	constructor(args){
		super();
		this.state={
			pointShopList:tools.getObject(10)
		}
	}
	render(){
		return(
			<div className="warpper">
				{
					this.state.pointShopList.map((item,index)=>{
						return(
                            <div key={index} className="am-panel goods-list">
								<div className="goods-img"><img src={require('../../../style/images/test.png')}/></div>
								<div className="goods-info">
									<h3>Lamy恒星系列2017限量款太平洋蓝钢笔</h3>
									<p><label>兑换积分:</label><span>2800</span></p>
									<p><label>库存:</label><font>80</font></p>
									<button type="button" className="am-btn-primary" data-am-modal="{target: '#my-confirm'}">兑换</button>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}

}


export default PointShop