import React from 'react'
import * as tool from '../../config/tools'
import {Link} from 'react-router'
class Menu extends React.Component {
	constructor(args) {
		super()
		this.state = {
			menuItems: []
		}
	}
  componentWillMount() {
    if (tool.user === null || tool.user.menu.length === 0) {
      return;
    }
    let menuItems = [];
    let data = tool.user.menu[0].nodeResult;
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentNodeCode !== '0') {
        menuItems.push(data[i]);
      }
    }
    this.setState({
      menuItems
    })
  }
	render(){
		return(

     <div className="container">
        <div className="user-header">
          <div className="tx-name">
            <img alt='test' src={require('../../style/images/portrait.png')} />
            <p className="name">毛*平</p>
            <p className="rank-txt">盟主</p>
          </div>
          <div className="sign"><i className="fa fa-calendar-check-o" /></div>
          <p>一个最好的方式是去了解同行业内其他人是怎么写个人简介的。比如，你将要为自己的主页写一段职业个人简介。</p>
        </div>
        <ul className="am-list am-list-border list-in">
          {this.state.menuItems.map((item,index)=>{
            return(
                 <li key={index} >
                   <Link to={item.runscript} ><i className={item.nodeClass} />{item.nodeName}<i className="fa fa-angle-right floatR" /></Link>
                 </li>
              )
          })}
          <li>
            <Link to='/Personal/Set' ><i className="icon icon-set-up" />设置<i className="fa fa-angle-right floatR" /></Link>
          </li>
          <li>
            <a onClick={()=>tool.refreshToken()} >REFRESH TOKEN</a>
          </li>
          
{/*          <li>
            <a href="user_card.html"><i className="icon icon-my-card" />我的名片<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="my_fxq.html"><i className="icon icon-my-fxq" />我的蜂行圈<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="task.html"><i className="icon icon-task" />任务中心<span className="am-badge am-badge-danger am-round">6</span><i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="my_scj.html"><i className="icon icon-scj" />收藏夹<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="my_dt.html"><i className="icon icon-dt" />动态<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="library.html"><i className="icon icon-books" />图书馆<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="jf_shop.html"><i className="icon icon-jfshop" />积分商城<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href="jf_details.html"><i className="icon icon-jfdetils" />积分详情<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a><i className="icon icon-stroy" />故事线<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <Link to='/Set' ><i className="icon icon-set-up" />设置<i className="fa fa-angle-right floatR" /></Link>
          </li>*/}
        </ul>
      </div>



			)
	}
}
export default Menu;