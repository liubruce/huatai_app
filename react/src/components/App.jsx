import React,{Component} from 'react'
import Header from './header/Header.jsx'
import Footer from './footer/Footer.jsx'
class App extends Component {
	constructor(args) {
		super()
		this.state = {
			showHeader:false
		}
	}

	render() {
		return (
			<div className='app'>

			    {this.props.location.pathname.indexOf('/Personal') === -1 ?<Header />:null}

			    <div>
			       {this.props.children}
			    </div>

			    <Footer pathname={this.props.location.pathname} />

			</div>

		)
	}

}
export default App

