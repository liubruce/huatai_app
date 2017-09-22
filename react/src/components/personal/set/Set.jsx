import React from 'react'
import * as tools from '../../../config/tools'
class Set extends React.Component {
	constructor(args) {
		super()
	}
  back(){
    window.open('file:////data/data/com.sinosoft.huatai/files/www/DD/build/index.html');
    // tools.exit();
  }
	render() {
		return (
	   <div className="warpper">
        <ul className="am-list am-list-border list-in">
          <li>
            <a><i className="icon icon-set-up" />修改密码<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a><i className="icon icon-set-up" />系统升级<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a href='file:////data/data/com.sinosoft.huatai/files/www/DD/build/index.html#/index' ><i className="icon icon-jfdetils" />返回<i className="fa fa-angle-right floatR" /></a>
          </li>
          <li>
            <a onClick={()=>this.back()} ><i className="icon icon-jfdetils" />退出登录<i className="fa fa-angle-right floatR" /></a>
          </li>
        </ul>
      </div>
		)
	}

}
export default Set

		

