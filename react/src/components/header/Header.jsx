import React from 'react'
import './header.less'
import {hashHistory} from 'react-router';
import * as tool from '../../config/tools'
class Header extends React.Component {
	constructor(args) {
		super();
    this.state = {
      inputValue:'',
      placeholder:''
    }
	}
  componentWillMount() {
    this.checkUrl(this.props.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrl(nextProps.pathname);
  }
  checkUrl(pathname) {
    let placeholder = '';
    if (pathname.indexOf('/Index') !== -1) {
      placeholder = '课程名称';
    }
    if (pathname.indexOf('/Course') !== -1) {
      placeholder = '课程名称';
    }
    if (pathname.indexOf('/Article') !== -1) {
      placeholder = '文章名称';
    }
    this.setState({
      placeholder,
      inputValue:tool.getQueryString('search')
    })
  }
  submit(e) {
    e.preventDefault();
    let pathname = this.props.pathname;
    if (pathname.indexOf('/Article') !== -1) {
      hashHistory.push(`/Article?search=${this.state.inputValue}`);
    }
  }
	render(){
		return(
        <form onSubmit={(e)=>this.submit(e)} >
        <header className="header">
          <a className="logo"> </a>
          <div className="search">
            <i className="fa fa-search" />
            <input 
            value={this.state.inputValue}
            onChange={(e)=>{this.setState({inputValue:e.target.value})}}
            type="text" placeholder={`${this.state.placeholder}`} />
          </div>
        </header>
        </form>
			)
	}
}
export default Header;