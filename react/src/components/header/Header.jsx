import React from 'react'
import './header.less'
import {hashHistory} from 'react-router';
import * as tool from '../../config/tools';
/*
  Andorid设备下因为输入法带来的bug解决策略。
  在打包发布时：
    1.cordova platform add android
    2.修改AndroidMainifest.xml文件里面的Active 属性WindowSoftInputMode="adjustPan"
 */
class Header extends React.Component {
	constructor(args) {
		super();
    this.state = {
      inputValue:'',
      placeholder:''
    }
    //this.handleClick = this.handleClick.bind(this);
	}
  componentWillMount() {
    this.checkUrl();
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrl();
  }
  checkUrl() {
    let pathname = this.props.pathname;
    let placeholder = '';
    if (pathname.indexOf('/') !== -1) {
      placeholder = '课程名称';
         
    }
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
    let inputValue = this.state.inputValue;
    if (tool.checkInput(inputValue)) {
      if (pathname.indexOf('/Article') !== -1) {
        hashHistory.push(`/Article?search=${inputValue}`);
      } else {
        hashHistory.push(`/Course?search=${inputValue}`);
      }
    }else{
      if (pathname.indexOf('/Article') !== -1) {
        hashHistory.push(`/Article`);
      } else {
        hashHistory.push(`/Course`);
      }
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // this.submit(e);
    }
  }
	render(){
		return(
        <form onSubmit={(e)=>this.submit(e)} >
          {tool.isIOS && !tool.isIOS11()?<div className='ios-header' ></div>:null}
          {
             (this.props.pathname.indexOf('/Guide') !== -1)?null:
            <header className="header">
              <a className="logo"> </a>
              <div className="search">
                <button type='submit' ><i  className="fa fa-search" /></button>
                <input 
                value={this.state.inputValue}
                onKeyDown={(e)=>this.handleKeyDown(e)}
                onChange={(e)=>{this.setState({inputValue:e.target.value})}}
                type="text" placeholder={this.state.placeholder} />
              </div>
            </header>
          }
          
        </form>
			)
	}
}
export default Header;