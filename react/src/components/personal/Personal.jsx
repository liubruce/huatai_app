import React,{Component} from 'react'
import Title from './Title.jsx'
import './personal.less'
class Personal extends Component {
  constructor(args) {
    super()
    this.state = {
      showHeader:false
    }
  }

  render() {
    return (

      <div className='app'>

          {this.props.location.pathname !== '/Personal' ?<Title pathname={this.props.location.pathname} />:null}

          <div>
             {this.props.children}
          </div>

      </div>

    )
  }

}
export default Personal

