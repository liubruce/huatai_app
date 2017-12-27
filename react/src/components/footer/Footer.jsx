import React from 'react'
import './footer.less'
import {Link} from 'react-router'
import $ from 'jquery'
import * as tool from '../../config/tools'
class Footer extends React.Component {
	constructor(args) {
		super();
    this.state = {
      tab:1,
      showFooter:false
    }
	}
  changeTab(tab){
    this.setState({
      tab
    })
     //console.log(tab)
    if(tab=="2"||tab=="3"||tab=="4"||tab=="5"){
        $(".header").removeClass("opacity")
        
    }
   
  
  }
  componentWillMount() {
    this.checkUrl(this.props.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrl(nextProps.pathname);
  }
  checkUrl(pathname) {
    let showFooter = false
    if(pathname === '/Index'){
      showFooter = true;
    }
    if(pathname === '/Article'){
      showFooter = true;
      
    }
    if(pathname === '/Course'){
      showFooter = true;
       
    }
    if(pathname === '/Library/1'){
      showFooter = true;
    }
    if(pathname === '/Personal'){
      showFooter = true;
    }
    if(pathname === '/'){
      showFooter = true;

    }

    let tab = 1;
    if (pathname.indexOf('/Course') !== -1) {
      tab = 3;
    }
    if (pathname.indexOf('/Article') !== -1) {
      tab = 2;
    }
    if (pathname.indexOf('/Library/1') !== -1) {
      tab = 4;
    }
    if (pathname.indexOf('/Personal') !== -1) {
      tab = 5;
    }
    if (pathname.indexOf('/StoryLine') !== -1) {
      tab = 5;
    }
    if (pathname.indexOf('/ArticleDetail') !== -1) {
      tab = 2;
    }
    if (pathname.indexOf('/NewsCenter') !== -1) {
      tab = 5;
    }
    if (pathname.indexOf('/MydirectDetails') !== -1) {
      tab = 0;
    }
    this.setState({
      tab,
      showFooter
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
        <div>{this.state.showFooter?<footer className="foot">
          <ul className="am-avg-sm-5 clearFix">
            <li className={this.state.tab === 1?"li-1 active":"li-1"} ><Link onClick={()=>this.changeTab(1)}  to='/Index'> </Link></li>
            <li className={this.state.tab === 2?"li-2 active":"li-2"} ><Link className={localStorage.getItem('channelId')==='4'?'xxq':'fxq'} onClick={()=>this.changeTab(2)}  to='/Article' > </Link></li>
            <li className={this.state.tab === 3?"li-3 active":"li-3"} ><Link onClick={()=>this.changeTab(3)}  to='/Course' > </Link></li>
            <li className={this.state.tab === 4?"li-4 active":"li-4"} ><Link onClick={()=>this.changeTab(4)}  to='/Library/1'></Link></li>
            <li className={this.state.tab === 5?"li-5 active":"li-5"} ><Link onClick={()=>this.changeTab(5)}  to='/Personal' > </Link></li>
          </ul>
        </footer>:null}</div>
			)
	}
}
export default Footer