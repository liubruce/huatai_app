import React from 'react'
import './index.less'
import {Slider} from 'amazeui-touch';
// import $ from 'jquery'
class Index extends React.Component {
  constructor(args) {
    super();
    this.state = {}
  }
  componentDidMount() {

  }
	render() {

		return (
        <div className="warpper">

          <Slider controls={false} >
            <Slider.Item>
              <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
            </Slider.Item>
            <Slider.Item>
               <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
            </Slider.Item>
            <Slider.Item>
              <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
            </Slider.Item>
            <Slider.Item>
              <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
            </Slider.Item>
          </Slider>

          <div className="am-panel panel-in">
            <ul className="am-avg-sm-4 clearFix">
              <li className="li-1"><a> </a></li>
              <li className="li-2"><a> </a></li>
              <li className="li-3"><a> </a></li>
              <li className="li-4"><a> </a></li>
            </ul>
          </div>
          <div className="am-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">热播课程</h2>
              <nav className="am-titlebar-nav">
                <a href="wk.html#more" className>更多课程</a>
              </nav>
            </div>
            <ul className="am-gallery am-avg-sm-2 am-gallery-default">
              <li>
                <div className="am-gallery-item">
                  <a href>
                    <img alt='img not found' src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
                    <h3 className="am-gallery-title">课程名称</h3>
                    <div className="am-gallery-desc"><i className="fa fa-heart-o" />13,888</div>
                  </a>
                </div>
              </li>
              <li>
                <div className="am-gallery-item">
                  <a href>
                    <img alt='img not found' src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
                    <h3 className="am-gallery-title">课程名称</h3>
                    <div className="am-gallery-desc"><i className="fa fa-heart-o" />13,888</div>
                  </a>
                </div>
              </li>
              <li>
                <div className="am-gallery-item">
                  <a href>
                    <img alt='img not found' src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
                    <h3 className="am-gallery-title">课程名称</h3>
                    <div className="am-gallery-desc"><i className="fa fa-heart-o" />13,888</div>
                  </a>
                </div>
              </li>
              <li>
                <div className="am-gallery-item">
                  <a href>
                    <img alt='img not found' src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
                    <h3 className="am-gallery-title">课程名称</h3>
                    <div className="am-gallery-desc"><i className="fa fa-heart-o" />13,888</div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="am-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">蜂行圈</h2>
              <nav className="am-titlebar-nav">
                <a href="fxq.html#more" className>更多内容</a>
              </nav>
            </div>
            <div className="am-panel-bd">
              <div className="pepole-info">
                <img alt='img not found' src={require('../../style/images/portrait.png')} />
                <p className="info"><span>用户B</span>xxxxxxx分公司</p>
                <p className="time">2016.06.15</p>
              </div>
              <a>
                <article className="am-article">
                  <div className="am-article-hd">
                    <h1 className="am-article-title">如何用保险保障自己的一生？</h1>
                  </div>
                  <div className="am-article-bd">
                    <p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
                  </div>
                </article>
              </a>
              <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
            </div>
            <div className="am-panel-bd">
              <div className="pepole-info">
                <img alt='img not found' src={require('../../style/images/portrait.png')} />
                <p className="info"><span>用户B</span>xxxxxxx分公司</p>
                <p className="time">2016.06.15</p>
              </div>
              <a>
                <article className="am-article">
                  <div className="am-article-hd">
                    <h1 className="am-article-title">如何用保险保障自己的一生？</h1>
                  </div>
                  <div className="am-article-bd">
                    <p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
                  </div>
                </article>
              </a>
              <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
            </div>
          </div>
        </div>

		)
	}
}
export default Index