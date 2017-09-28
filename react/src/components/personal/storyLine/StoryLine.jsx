import React from 'react'
import './storyLine.less'
class StoryLine extends React.Component{
	constructor(args){
		super()
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