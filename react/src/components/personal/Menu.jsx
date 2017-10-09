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
  test() {
    let menuItems = [{
      "nodeName": "我的名片",
      "runscript": "/App/PersonalCenter",
      "nodeClass": "icon icon-my-card",
    }, {
      "nodeName": "我的蜂行圈",
      "runscript": "/App/PersonalCenter/MyArticle",
      "nodeClass": "icon icon-my-fxq",
    }, {
      "nodeName": "任务中心",
      "runscript": "/App/NewsCenter",
      "nodeClass": "icon icon-task",
    }, {
      "nodeName": "动态",
      "runscript": "/App/PersonalCenter/Dynamic",
      "nodeClass": "icon icon-dt",
    }, {
      "nodeName": "收藏夹",
      "runscript": "/App/PersonalCenter/Collector",
      "nodeClass": "icon icon-scj",
    }, {
      "nodeName": "图书馆",
      "runscript": "/App/PersonalCenter/Library",
      "nodeClass": "icon icon-books",
    }, {
      "nodeName": "积分商城",
      "runscript": "/App/PersonalCenter/PointShop",
      "nodeClass": "icon icon-jfshop",
    }, {
      "nodeName": "积分详情",
      "runscript": "/App/PersonalCenter/PointDetail",
      "nodeClass": "icon icon-jfdetils",
    }, {
      "nodeName": "故事线",
      "runscript": "/App/StoryLine",
      "nodeClass": "icon icon-stroy",
    }];
    this.setState({
      menuItems
    });
  }
  componentWillMount() {
    // if (tool.user === null || tool.user.menu.length === 0) {
    //   return;
    // }
    // let menuItems = [];
    // let data = tool.user.menu[0].nodeResult;
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].parentNodeCode !== '0') {
    //     menuItems.push(data[i]);
    //   }
    // }
    // this.setState({
    //   menuItems
    // })

    this.test();
  }
	render(){
		return(
     <div className="container">
        <div className="user-header">
          <div className="tx-name">
            <img className='head_img' alt='test' src={require('../../style/images/portrait.png')} />
            <p className="name">毛*平</p>
            <p className="rank-txt">盟主</p>
          </div>
          <div className="sign"><i className="fa fa-calendar-check-o" /></div>
          <p>一个最好的方式是去了解同行业内其他人是怎么写个人简介的。比如，你将要为自己的主页写一段职业个人简介。</p>
        </div>
        <ul className="am-list am-list-border list-in">
        {
        this.state.menuItems.map((item,index)=>{
              return(
                 <li key={index} >
                   <Link to={item.runscript} ><i className={item.nodeClass} />{item.nodeName}<i className="fa fa-angle-right floatR" /></Link>
                 </li>
              )
        })}
        <li>
            <Link to='/Personal/Set' ><i className="icon icon-set-up" />设置<i className="fa fa-angle-right floatR"/></Link>
        </li>
          {!tool.isPc?
          <li>
            <a onClick={()=>tool.refreshToken()} >REFRESH TOKEN</a>
          </li>
          :null}
        </ul>
      </div>
			)
	}
}
export default Menu;