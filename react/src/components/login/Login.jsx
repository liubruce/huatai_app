import React from 'react'
import './login.less'
import * as api from '../../config/api'
import { message } from 'antd';
import {hashHistory} from 'react-router';
import * as tool from '../../config/tools'
class Login extends React.Component {
  constructor(args) {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  login(e) {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
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
      } else {
        message.error(_data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
  default () {
    this.setState({
      username: '13958510206',
      password: 'a123456'
    })
  }
  render() {
    return (
     <form className="container" onSubmit={(e)=>this.login(e)} >
        <div className="login-bg" />
        <div className="login-box">
          <h1>华泰蜂行智能学习<h1 style={{display:'inline'}} onClick={()=>this.default()} >平</h1>台</h1>
          <h6>Huatai Insurance Group</h6>
          <p><input type="text" onChange={(e)=>this.setState({username:e.target.value})} value={this.state.username} className="am-form-field am-radius" required="required" ref='username' placeholder="工号/手机号" /></p>
          <p><input type="password" onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password} className="am-form-field am-radius" required="required" ref='password' placeholder="密码" /></p>
          <button className="btn-login" type='submit' >登 录</button>
        </div>
      </form>
    )
  }

}
export default Login

    

