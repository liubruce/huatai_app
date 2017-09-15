import React from 'react'
import './login.less'
import * as api from '../../config/api'
import { message } from 'antd';
import {browserHistory} from 'react-router';
class Login extends React.Component {
	constructor(args) {
		super()
	}
  login(){
    api.login().then((data)=>{
      if (data.result === 'RC100') {
        localStorage.setItem("user", JSON.stringify(data));
        browserHistory.push("/");
      }else{
        message.error(data.errMsg, 3);
        localStorage.removeItem('user');
      }
    })
  }
	render() {
		return (
	   <div className="container">
        <div className="login-bg" />
        <div className="login-box">
          <h1>华泰蜂行智能学习平台</h1>
          <h6>Huatai Insurance Group</h6>
          <p><input type="text" className="am-form-field am-radius" placeholder="工号/手机号" /></p>
          <p><input type="password" className="am-form-field am-radius" placeholder="密码" /></p>
          <div className="am-g">
            <label className="am-checkbox am-warning">
              <input type="checkbox" defaultChecked="checked" defaultValue data-am-ucheck />记住密码
            </label>
            <a className="floatR">找回密码</a>
          </div>
          <a className="btn-login" onClick={()=>this.login()} >登 录</a>
        </div>
      </div>

		)
	}

}
export default Login

		

