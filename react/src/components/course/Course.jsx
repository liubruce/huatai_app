import React from 'react'

class Course extends React.Component {
	constructor(args) {
		super()
	}

	render(){
		return(

             <div className="warpper">
                <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                  <ul className="am-tabs-nav am-cf nav">
                    <li className="am-active">
                      <a>精品课程</a>
                    </li>
                    <li className>
                      <a>热播课程</a>
                    </li>
                    <li className>
                      <a>必修课程</a>
                    </li>
                  </ul>
                  <div className="am-tabs-bd">
                    <div data-tab-panel-0 className="am-tab-panel am-active tab">
                      <div className="am-panel cur-list">
                        <a href="wk-details.html">
                          <img alt='test' src={require('../../style/images/test.png')} />
                          <div className="right">
                            <p className="time">2017.06.15  17:21</p>
                            <h2>课程名称</h2>
                            <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 侧边栏内容 */}
                <div id="doc-oc-demo1" className="am-offcanvas">
                  <div className="am-offcanvas-bar">
                    <div className="am-offcanvas-content">
                      <p>
                        我不愿让你一个人 <br />
                        承受这世界的残忍 <br />
                        我不愿眼泪陪你到 永恒
                      </p>
                      <a className="close"><i className="fa fa-compress" /></a>
                    </div>
                  </div>
                </div>
              </div>

			)
	}
}
export default Course;