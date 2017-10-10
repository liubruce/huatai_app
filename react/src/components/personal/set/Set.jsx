import React from 'react'
import * as tool from '../../../config/tools'
// import * as api from '../../../config/api'
import {
  Modal
} from 'antd';
const confirm = Modal.confirm;
class Set extends React.Component {
	constructor(args) {
		super()
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
	   <div className="warpper">
        <ul className="am-list am-list-border list-in">
          <li>
            <a onClick={()=>this.back()} ><i className="icon icon-jfdetils" />返回首页<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a onClick={()=>this.exit()} ><i className="icon icon-jfdetils" />退出登录<i className="fa fa-angle-right floatR" /></a>
          </li>
        </ul>
      </div>
		)
	}

}
export default Set

		

