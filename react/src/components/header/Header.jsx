import React from 'react'
import './header.less'
// import * as tool from '../../config/tools'
class Header extends React.Component {
	constructor(args) {
		super()
	}
	render(){
		return(
        <header className="header">
          <a className="logo"> </a>
          <div className="search">
            <i className="fa fa-search" />
            <input 
            // defaultValue={`userCode: ${tool.user!==null?tool.user.userCode:'null'}`} 
            type="text" placeholder="搜索" />
          </div>
        </header>
         /*<header className="header header-1">
          <Link to='/' className="logo" />
          <div className="search">
            <i className="fa fa-search" />
            <input type="text" placeholder="搜索" />
          </div>
          <div className="header-right"><a href="#doc-oc-demo1" data-am-offcanvas><i className="fa fa-bars fa-lg" /></a></div>
         </header>*/
			)
	}
}
export default Header;