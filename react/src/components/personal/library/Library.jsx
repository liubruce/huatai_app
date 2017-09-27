import React from 'react'
import {Link} from 'react-router'
import './library.less'
class Library extends React.Component{
	constructor(args){
		super()
	}
	render(){
		return(
			<div className="warpper">
		           <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                      <ul className="am-tabs-nav am-cf nav">
                        <li className="am-active">
                            <a>我的书架</a>
                        </li>
                        <li className="">
                            <a>图书馆</a>
                        </li>
                        <li className="">
                            <a>资料库</a>
                        </li>
				       </ul>
                       <div className="am-tabs-bd">
				         	<div data-tab-panel-0 className="am-tab-panel am-active tab">
                            <div className="am-panel goods-list">
							<div className="goods-img"><img alt='test' src={require('../../../style/images/test.png')}/></div>
							<div className="goods-info">
								<p>作者：[哥伦比亚] 加西亚·马尔克斯</p>
								<p>出版社: 南海出版公司</p>
								<p>原作名: Cien años de soledad</p>
								<p>译者:  范晔</p>
								<p>出版年: 2011/6</p>
								<p>页数: 360</p>
								<button type="button" className="am-btn-primary" data-am-modal="{target: '#my-modal'}">下载</button>
							</div>
						    </div>
                            </div>
                        </div> 
                   </div>
			</div>
		)
	}

}


export default Library