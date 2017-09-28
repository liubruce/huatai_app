import React from 'react'
import {browserHistory} from 'react-router'
// import * as tool from '../../config/tools'
class Title extends React.Component {
	constructor(args) {
		super()
	}
	render(){
		return(
		     <header className="header">
		     	<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
		     	<h1>我的</h1>
		     </header>
			)
	}
}
export default Title;