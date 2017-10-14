import React from 'react'
import './notfound.less'
import {browserHistory} from 'react-router'

class NotFoundPage extends React.Component {
	constructor(props) {
		super();
	}
	render(){
		return(
			  <div className="notfound">
                 <div className="logo">
                    <img src={require('../../style/images/404.png')} alt="404"  />
                    <p onClick={()=>browserHistory.goBack()}><a>BACK</a></p>
                 </div>
                  
              </div>
			)
	}
}
export default NotFoundPage;