import React,{Component} from 'react'
import Title from './Title.jsx'
import './personal.less'
import Footer from '../footer/Footer.jsx'
import * as tool from '../../config/tools'
import $ from 'jquery'
class Personal extends Component {
  constructor(args) {
    super()
    this.state = {
      showTitle:true
    }
  }
  checkUrl(pathname) {
    let showTitle = true;
    if (pathname === '/Personal') {
      showTitle = false;
    }
    this.setState({
      showTitle
    })
  }
  componentWillMount() {
    this.checkUrl(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this.checkUrl(nextProps.location.pathname);
  }

  render() {
    return (
      <div className='app'>
          {tool.isIOS?<div className='ios-header' ></div>:null}
          {this.state.showTitle?<Title pathname={this.props.location.pathname} />:null}
             {this.props.children}
             {(this.props.location.pathname).indexOf('/MydirectDetails')!==-1?null:<Footer pathname={this.props.location.pathname} />}
          
      </div>
    )
  }

}
export default Personal

