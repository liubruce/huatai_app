import React from 'react'
import {browserHistory} from 'react-router'
import * as tool from '../../config/tools'
class Title extends React.Component {
	constructor(args) {
		super()
	}
	componentWillMount() {
		let menuItems = [];
		let data = tool.user.menu[0].nodeResult;
		for (let x of data) {
			if (x.parentNodeCode !== '0') {
				menuItems.push(x);
			}
		}
	}
	render(){
		return(
		     <header className="header">
		     	<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
		     	<h1>设置</h1>
		     </header>
			)
	}
}
export default Title;