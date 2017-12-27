import React,{Component} from 'react'
import Header from './header/Header.jsx'
import Footer from './footer/Footer.jsx'
import * as tool from '../config/tools'
import { browserHistory } from 'react-router'
import $  from 'jquery'
// import {hashHistory} from 'react-router'
import './app.less'
class App extends Component {
	constructor(args) {
		super()
		this.state = {
			showHeader:false,
			loading:false
		}
	}
	componentWillMount() {
		if ((tool.user === null || tool.user.menu === undefined) && tool.isPc) {
			// hashHistory.push('/Login');
			return;
		}

	}
 
	render() {
	
		return (
				
			   <div className='app'>

			            <Header pathname={this.props.location.pathname} location={this.props.location} />
			            {this.props.children}
						{this.props.location.pathname.indexOf('/MydirectDetails')!==-1||this.props.location.pathname.indexOf('/PrivateTheme')!==-1||this.props.location.pathname.indexOf('/Guide')!==-1?null:
						<Footer pathname={this.props.location.pathname} />}

			    </div>
		
		)
	}

}
export default App

