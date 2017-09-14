import React from 'react'
import './header.less'
class Header extends React.Component {
	constructor(args) {
		super()
	}

	render(){
		return(
        <header className="header">
          <a className="logo" > </a>
          <div className="search">
            <i className="fa fa-search" />
            <input type="text" placeholder="搜索" />
          </div>
        </header>
			)
	}
}
export default Header;