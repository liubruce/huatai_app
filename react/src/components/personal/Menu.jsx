import React from 'react'
import * as tool from '../../config/tools'
import {Link} from 'react-router'
import * as api from '../../config/api'
import { message } from 'antd';
import {getFile_IP } from '../../config/serverIp'
class Menu extends React.Component {
	constructor(args) {
		super()
		this.state = {
			menuItems: [],
      user:{
        userRealName:'default',
        vipGradName:'default',
        seifInformation:'default',
        sign:0
      }
		}
	}
  // test() {
  //   let menuItems = [{
  //     "nodeName": "我的名片",
  //     "runscript": "/App/PersonalCenter",
  //     "nodeClass": "icon icon-my-card",
  //   }, {
  //     "nodeName": "我的蜂行圈",
  //     "runscript": "/App/PersonalCenter/MyArticle",
  //     "nodeClass": "icon icon-my-fxq",
  //   }, {
  //     "nodeName": "任务中心",
  //     "runscript": "/App/NewsCenter",
  //     "nodeClass": "icon icon-task",
  //   }, {
  //     "nodeName": "动态",
  //     "runscript": "/App/PersonalCenter/Dynamic",
  //     "nodeClass": "icon icon-dt",
  //   }, {
  //     "nodeName": "收藏夹",
  //     "runscript": "/App/PersonalCenter/Collector",
  //     "nodeClass": "icon icon-scj",
  //   }, {
  //     "nodeName": "图书馆",
  //     "runscript": "/App/PersonalCenter/Library",
  //     "nodeClass": "icon icon-books",
  //   }, {
  //     "nodeName": "积分商城",
  //     "runscript": "/App/PersonalCenter/PointShop",
  //     "nodeClass": "icon icon-jfshop",
  //   }, {
  //     "nodeName": "积分详情",
  //     "runscript": "/App/PersonalCenter/PointDetail",
  //     "nodeClass": "icon icon-jfdetils",
  //   }, {
  //     "nodeName": "故事线",
  //     "runscript": "/App/StoryLine",
  //     "nodeClass": "icon icon-stroy",
  //   }];
  //   this.setState({
  //     menuItems
  //   });
  // }
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

    api.myhome().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          user:data.user
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })

  }
  sign(){
    api.sign().then((data)=>{
      if (data.result === 'RC100') {
          this.setState({
            sign:data.sign
          })
      }else{
         message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
	render(){
    let user = this.state.user;
		return(
     <div className="container">
        <div className="user-header">
          <div className="tx-name">
            <Link to={"/App/PersonalCenter/EditUser"}><img className='head_img' onError={(e) => tool.headImageError(e)} alt='img' src={getFile_IP + '/downfile/' + user.headPath} /></Link>
            <p className="name">{user.userRealName}</p>
            <p className="rank-txt">{user.vipGradName}</p>
          </div>
          <div onClick={()=>this.sign()} className="sign"><img src={
            this.state.sign===1||this.state.sign==='1'?
            require('../../style/images/sign.png'):require('../../style/images/noSign.png')
            } style={{width:'18px',marginTop:'-5px'}} /></div>
          <p>{user.seifInformation}</p>
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
{/*          {!tool.isPc?
          <li>
            <a onClick={()=>tool.refreshToken()} >REFRESH TOKEN</a>
          </li>
          :null}*/}
        </ul>
      </div>
			)
	}
}
export default Menu;