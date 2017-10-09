import React from 'react'
import './pointShop.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
class PointShop extends React.Component{
	constructor(args){
		super();
		this.state={
			pointShopList:tool.getObject(10)
		}
	}
	componentWillMount() {
    api.pointShopList().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					pointShopList:data.IntegralShopList?data.IntegralShopList:[]
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
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
								<div className="goods-img"><img src={require('../../../style/images/test.png')}
							//	src={item.shopCover}
								/></div>
								<div className="goods-info">
									<h3>{item.shopName}</h3>
									<p><label>兑换积分:</label><span>{item.exchangeIntegral}</span></p>
									<p><label>库存:</label><font>{item.stock}</font></p>
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