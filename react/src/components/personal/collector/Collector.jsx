import React from 'react'
import {Link} from 'react-router'
import './collector.less'
class Collector extends React.Component{
	constructor(args){
		super()
	}
	render(){
		return(
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
					<ul className="am-tabs-nav am-cf nav">
                        <li className="am-active">
                            <a >课程收藏</a>
                        </li>
                        <li className="">
                            <a >蜂行圈收藏</a>
                        </li>
				    </ul>
                    <div className="am-tabs-bd">
                        <div data-tab-panel-0 className="am-tab-panel am-active tab">
                            <div className="am-panel cur-list">
                                <Link>
                                    <img src={require("../../../style/images/test.png")}/>
                                    <div className="right">
                                        <p className="time">2017.06.15  17:21</p>
                                        <h2>课程名称</h2>
                                        <p className="like"><span><i className="fa fa-heart"></i>12331</span><span><i className="fa fa-thumbs-up"></i>12331</span></p>
                                    </div>
                                </Link>
						   </div>
                        </div>
                    </div>
				</div>
			</div>
		)
	}

}


export default Collector