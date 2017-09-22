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

        window.localStorage.setItem("user", JSON.stringify(user));
        tool.save_user();
        api.getMenu().then((data) => {
          data.menu = data.menu
          if (data.result === 'RC100') {
            window.localStorage.setItem("user", JSON.stringify(data));
            tool.save_user();
            hashHistory.push("/");
          } else {
            message.error(data.errMsg, 3);
            window.localStorage.setItem("user", null);
            tool.save_user();
          }
        }, (res) => {
          tool.reject(res);
        })
      } else {
        message.error(_data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })

  }
	render() {
		return (
	   <form className="container" onSubmit={(e)=>this.login(e)} >
        <div className="login-bg" />
        <div className="login-box">
          <h1>华泰蜂行智能学习平台</h1>
          <h6>Huatai Insurance Group</h6>
          <p><input type="text" defaultValue='13920001354' className="am-form-field am-radius" required="required" ref='username' placeholder="工号/手机号" /></p>
          <p><input type="password" defaultValue='a123456' className="am-form-field am-radius" required="required" ref='password' placeholder="密码" /></p>
          <div className="am-g">
            <label className="am-checkbox am-warning">
              <input type="checkbox" defaultChecked="checked" defaultValue data-am-ucheck />记住密码
            </label>
            <a className="floatR">找回密码</a>
          </div>
          <button className="btn-login" type='submit' >登 录</button>
        </div>
      </form>

		)
	}

}
export default Login

		

