import React from 'react'
import './article.less'
class Article extends React.Component {
	constructor(args) {
		super()
	}
  
	render(){
		return(

     <div className="warpper">
        <div className="am-panel">
          <div className="article-list">
            <img alt='test' src={require('../../style/images/portrait.png')} />
            <div className="cont">
              <p className="info"><span>用户B</span>xxxxxxx分公司</p>
              <p className="time">2016.06.15</p>
              <a href="fxq-details.html">
                <article className="am-article">
                  <div className="am-article-hd">
                    <h1 className="am-article-title"><div className="jc-icon" />如何用保险保障自己的一生？</h1>
                  </div>
                  <div className="am-article-bd">
                    <p className="am-article-lead">我写这回答的目的是希望各位有幸看到本文的朋友能抽出您人生中的30分钟尽量一字不拉地读完本…</p>
                    <ul className="am-avg-sm-3 am-thumbnails">
                      <li><img alt='test' src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></li>
                      <li><img alt='test' src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></li>
                      <li><img alt='test' src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></li>
                    </ul>
                  </div>
                </article>
              </a>
              <p className="like"><span><i className="fa fa-heart-o" />12331</span><span><i className="fa fa-thumbs-o-up" />12331</span></p>
            </div>
          </div>
        </div>
      </div>


			)
	}
}
export default Article;