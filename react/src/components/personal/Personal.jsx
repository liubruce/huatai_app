import React,{Component} from 'react'
import Title from './Title.jsx'
import './personal.less'
class Personal extends Component {
  constructor(args) {
    super()
    this.state = {
      showTitle:true
    }
  }
  checkPage(pathname) {
    let showTitle = true;
    if (pathname === '/Personal') {
      showTitle = false;
    }
    this.setState({
      showTitle
    })
  }
  componentWillMount() {
    this.checkPage(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    this.checkPage(nextProps.location.pathname);
  }
  render() {
    return (

      <div className='app'>

          {this.state.showTitle?<Title pathname={this.props.location.pathname} />:null}

          <div>
             {this.props.children}
          </div>

      </div>

    )
  }

}
export default Personal

