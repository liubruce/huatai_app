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
  test(){
    let menuItems = [{"nodeName":"我的名片","runscript":"/App/PersonalCenter","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-my-card","nodeCode":"znxx_app_3_1","nodeType":"M","nodeOrder":"5"},{"nodeName":"我的蜂行圈","runscript":"/App/PersonalCenter/MyArticle","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-my-fxq","nodeCode":"znxx_app_3_2","nodeType":"M","nodeOrder":"6"},{"nodeName":"任务中心","runscript":"/App/NewsCenter","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-task","nodeCode":"znxx_app_3_10","nodeType":"M","nodeOrder":"7"},{"nodeName":"动态","runscript":"/App/PersonalCenter/Dynamic","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-dt","nodeCode":"znxx_app_3_3","nodeType":"M","nodeOrder":"8"},{"nodeName":"收藏夹","runscript":"/App/PersonalCenter/Collector","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-scj","nodeCode":"znxx_app_3_4","nodeType":"M","nodeOrder":"9"},{"nodeName":"图书馆","runscript":"/App/PersonalCenter/Library","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-books","nodeCode":"znxx_app_3_6","nodeType":"M","nodeOrder":"10"},{"nodeName":"积分商城","runscript":"/App/PersonalCenter/PointShop","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-jfshop","nodeCode":"znxx_app_3_8","nodeType":"M","nodeOrder":"11"},{"nodeName":"积分详情","runscript":"/App/PersonalCenter/PointDetail","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-jfdetils","nodeCode":"znxx_app_3_9","nodeType":"M","nodeOrder":"12"},{"nodeName":"故事线","runscript":"/App/StoryLine","parentNodeCode":"znxx_app_3_0","nodeClass":"icon icon-stroy","nodeCode":"znxx_app_1_2","nodeType":"M","nodeOrder":"13"}];
    this.setState({
      menuItems
    });
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
    // this.test();
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