import React from 'react'
import * as tool from '../../../config/tools'
// import * as api from '../../../config/api'
import {
  Modal,Switch
} from 'antd';
const confirm = Modal.confirm;
class Set extends React.Component {
	constructor(args) {
    super()
    //localStorage.setItem('isopne',true)
   
  }
  directSwitch(e){
    var currentState = JSON.parse(localStorage.getItem("notShowGuide"));
    localStorage.setItem('notShowGuide',!currentState);
  }
  back() {
    if (!tool.isPc) {
      window.open(tool.back_url)
    }
    tool.back();
  }
  exit() {
    confirm({
      title: '确定退出登录吗?',
      content: '',
      onOk() {
        if (!tool.isPc) {
          window.open(tool.exit_url)
        }
        tool.exit();
      },
      onCancel() {

      },
    });
  }
	render() {
   
		return (
      //localStorage.setItem('isopne',!this.state.isopen);
	   <div className="warpper set">
        <ul className="am-list am-list-border list-in">
          <li>
          <a ><i className="icon icon-set-up" />是否开启引导页<Switch className="fa  floatR" defaultChecked={!JSON.parse(localStorage.getItem("notShowGuide"))}  onChange={this.directSwitch} /></a>
          </li>
          <li>
            <a onClick={()=>this.back()} ><i className="icon icon-set-up" />返回首页<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a onClick={()=>this.exit()} ><i className="icon icon-set-up" />退出登录<i className="fa fa-angle-right floatR" /></a>
          </li>
        </ul>
      </div>
		)
	}

}
export default Set

		

