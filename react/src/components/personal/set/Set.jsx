import React from 'react'
import * as tools from '../../../config/tools'
class Set extends React.Component {
	constructor(args) {
		super()
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
          <li onClick={()=>{tools.exit()}} >
            <a><i className="icon icon-jfdetils" />注销<i className="fa fa-angle-right floatR" /></a>
          </li>
        </ul>
      </div>


		)
	}

}
export default Set

		

