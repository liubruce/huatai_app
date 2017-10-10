import React from 'react'
import './storyLine.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
class StoryLine extends React.Component{
	constructor(args){
		super();
		this.state={
			storyData:[]
		}
	}
	componentWillMount() {
    api.selectuserDetail().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
	      storyData:data.data?data.data:[]
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
	render(){
		return(
		    <div className="story-box">
		    	<div className="island">
		    		<div className="base base-1">
		    			<a href="#word">
		    				<div className="light"></div>
		    				<div className="fxz man"></div>
		    			</a>
		    		</div>
		    		<div className="base base-2"><a href="#word"><div className="light"></div><div className="fxz man"></div></a></div>
		    		<div className="base base-3"><a href="#word"><div className="light"></div><div className="fxz woman"></div></a></div>
		    		<div className="base base-4"><a href="#word"><div className="light"></div><div className="fxz man"></div></a></div>
		    		<div className="base base-5"><a href="#word"><div className="light"></div><div className="fxz man"></div></a></div>
		    		<div className="base base-6"><a href="#word"><div className="light"></div><div className="fxz man"></div></a></div>
		    		<div className="base base-7"><a href="#word"><div className="light"></div><div className="fxz woman"></div></a></div>
		    		<div className="base base-8"><a href="#word"><div className="light"></div><div className="fxz woman"></div></a></div>
		    	</div>
		    </div>
		)
	}

}

export default StoryLine