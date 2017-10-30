import React from 'react'
import './login.less'
import * as api from '../../config/api'
import { message } from 'antd';
import {hashHistory} from 'react-router';
import * as tool from '../../config/tools'
class Login extends React.Component {
  constructor(args) {
    super()
  }
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    api.login(username, password).then((_data) => {
      if (_data.result === 'RC100') {
        let user = {};
        user.ldToken = _data.ldToken;
        user.userCode = _data.userCode;
        user.phone = username;
        user.deadTime = _data.deadTime;
        localStorage.setItem("user", JSON.stringify(user));
        tool.save_user();
        hashHistory.push("/");
        // api.getMenu().then((data) => {
        //   data.menu = data.menu
        //   if (data.result === 'RC100') {
        //     localStorage.setItem("user", JSON.stringify(data));
        //     tool.save_user();
        //     hashHistory.push("/");
        //   } else {
        //     message.error(data.errMsg, 3);
        //     localStorage.setItem("user", null);
        //     tool.save_user();
        //   }
        // }, (res) => {
        //   tool.reject(res);
        // })
      } else {
        message.error(_data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
  // login() {
  //   let user_data = '{"result":"RC100","ldToken":"1505725763548ABCDEFG62819","userType":"学员","menu":[{"agentCate":"个险","sellCom":"","roleID":"znxxapp_1_2_3","nodeResult":[{"nodeName":"主页","runscript":"/App/index","parentNodeCode":"0","nodeCode":"znxx_app_1_0","nodeType":"M","nodeOrder":"1"},{"nodeName":"微课","runscript":"/App/LearnCenter","parentNodeCode":"0","nodeCode":"znxx_app_4_0","nodeType":"M","nodeOrder":"2"},{"nodeName":"蜂行圈","runscript":"/App/GoodArticle","parentNodeCode":"0","nodeCode":"znxx_app_2_0","nodeType":"M","nodeOrder":"3"},{"nodeName":"我的","runscript":"/App/Personal","parentNodeCode":"0","nodeCode":"znxx_app_3_0","nodeType":"M","nodeOrder":"4"},{"nodeName":"我的名片","runscript":"/App/PersonalCenter","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_1","nodeType":"M","nodeOrder":"5"},{"nodeName":"我的蜂行圈","runscript":"/App/PersonalCenter/MyArticle","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_2","nodeType":"M","nodeOrder":"6"},{"nodeName":"任务中心","runscript":"/App/NewsCenter","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_10","nodeType":"M","nodeOrder":"7"},{"nodeName":"动态","runscript":"/App/PersonalCenter/Dynamic","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_3","nodeType":"M","nodeOrder":"8"},{"nodeName":"收藏夹","runscript":"/App/PersonalCenter/Collector","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_4","nodeType":"M","nodeOrder":"9"},{"nodeName":"图书馆","runscript":"/App/PersonalCenter/Library","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_6","nodeType":"M","nodeOrder":"10"},{"nodeName":"积分商城","runscript":"/App/PersonalCenter/PointShop","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_8","nodeType":"M","nodeOrder":"11"},{"nodeName":"积分详情","runscript":"/App/PersonalCenter/PointDetail","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_3_9","nodeType":"M","nodeOrder":"12"},{"nodeName":"故事线","runscript":"/App/StoryLine","parentNodeCode":"znxx_app_3_0","nodeCode":"znxx_app_1_2","nodeType":"M","nodeOrder":"13"}],"rank":"","department":"1302070102","job":"学员","manageCom":"10701"}],"userCode":"10003577","manageCom":"10701","phone":"13910003577"}';
  //   localStorage.setItem("user", user_data);
  //   tool.save_user();
  //   hashHistory.push("/");
  // }
  render() {
    return (
     <form className="container" onSubmit={(e)=>this.login(e)} >
        <div className="login-bg" />
        {tool.isPc?
        <div className="login-box">
          <h1>华泰蜂行智能学习平台</h1>
          <h6>Huatai Insurance Group</h6>
          <p><input type="text" defaultValue='13910014131' className="am-form-field am-radius" required="required" ref='username' placeholder="工号/手机号" /></p>
          <p><input type="password" defaultValue='a123456' className="am-form-field am-radius" required="required" ref='password' placeholder="密码" /></p>
          <button className="btn-login" type='submit' >登 录</button>
        </div>
        :
        <div className="login-box">
          <h1>华泰蜂行智能学习平台</h1>
          <h6>Huatai Insurance Group</h6>
          <p><input type="text" className="am-form-field am-radius" required="required" ref='username' placeholder="工号/手机号" /></p>
          <p><input type="password" className="am-form-field am-radius" required="required" ref='password' placeholder="密码" /></p>
          <button className="btn-login" type='submit' >登 录</button>
        </div>
      }
      </form>
    )
  }

}
export default Login

    

