import React from 'react'
import './notfound.less'
class NotFoundPage extends React.Component {
	constructor(props) {
		super();
	}
	render(){
		return(
			  <div className="notfound">
                 <div className="logo">
                    <img src={require('../../style/images/404.png')} alt="404"  />
                    <p onClick={()=>{window.history.back();}}><a>BACK</a></p>
                 </div>
                  
              </div>
			)
	}
}
export default NotFoundPage;