import React from 'react'
import './footer.less'
import {Link} from 'react-router'
import $ from 'jquery'
import * as tool from '../../config/tools'
class Footer extends React.Component {
	constructor(args) {
		super();
    this.state = {
      tab:1
    }
	}
  changeTab(tab){
    this.setState({
      tab
    })
  }
  componentWillMount() {
    this.checkUrl(this.props.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrl(nextProps.pathname);
  }
  checkUrl(pathname) {
    let tab = 1;
    if (pathname.indexOf('/Course') !== -1) {
      tab = 2;
    }
    if (pathname.indexOf('/Article') !== -1) {
      tab = 3;
    }
    if (pathname.indexOf('/Personal') !== -1) {
      tab = 4;
    }
    if (pathname.indexOf('/StoryLine') !== -1) {
      tab = 4;
    }
    if (pathname.indexOf('/ArticleDetail') !== -1) {
      tab = 3;
    }
    
    this.setState({
      tab
    })
  }
  ios() {
    if (tool.isIOS) {
      $('.app').css('marginTop', '20px');
      $('.header').css('marginTop', '20px');
    }
  }
  componentDidMount() {
    this.ios();
  }
  componentDidUpdate(prevProps, prevState) {
    this.ios();
  }
	render() {
		return(
        <footer className="foot">
          <ul className="am-avg-sm-4 clearFix">
            <li className={this.state.tab === 1?"li-1 active":"li-1"} ><Link onClick={()=>this.changeTab(1)}  to='/Index'> </Link></li>
            <li className={this.state.tab === 2?"li-2 active":"li-2"} ><Link onClick={()=>this.changeTab(2)}  to='/Course' > </Link></li>
            <li className={this.state.tab === 3?"li-3 active":"li-3"} ><Link onClick={()=>this.changeTab(3)}  to='/Article' > </Link></li>
            <li className={this.state.tab === 4?"li-4 active":"li-4"} ><Link onClick={()=>this.changeTab(4)}  to='/Personal' > </Link></li>
          </ul>
        </footer>
			)
	}
}
export default Footer