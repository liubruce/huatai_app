import React,{Component} from 'react'
import Header from './header/Header.jsx'
import Footer from './footer/Footer.jsx'
import * as tool from '../config/tools'
// import {hashHistory} from 'react-router'
import {Spin} from 'antd'
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
		if (tool.user === null && tool.isPc) {
			// hashHistory.push('/Login');
			return;
		}
		if (!tool.isPc) {
			// this.setState({
			// 	loading: true
			// })
			// tool.info().then((data) => {
				// this.setState({
				// 	loading: false
				// })
			// }, () => {
				// this.setState({
				// 	loading: false
				// })
			// })
		} else {
			// this.setState({
			// 	loading: true
			// });
			// setTimeout(() => {
			// 	this.setState({
			// 		loading: false
			// 	});
			// }, 500)
		}
	}
	render() {
		return (
			
			   <div className='app' style={{marginTop:this.state.loading?'50%':'0',marginLeft:this.state.loading?'45%':'0'}} >
			     {!this.state.loading?
			        <div>
			            <Header pathname={this.props.location.pathname} />
			            {this.props.children}
			            <Footer pathname={this.props.location.pathname} />
			         </div>
			         : <Spin tip="加载中..." />}
			    </div>
		
		)
	}

}
export default App

