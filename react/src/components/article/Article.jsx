import React from 'react'
import './article.less'
import * as tool from '../../config/tools'
import { message,Spin } from 'antd';
import $ from 'jquery'
class Article extends React.Component {
	constructor(args) {
		super()
    this.state = {
      articleList:tool.getObject(4),
      loading:true
    }
	}
  add() {
    if (this.state.articleList.length > 10) {
      message.error('没有数据了', 3);
      this.setState({
        loading: false
      })
      return;
    }
    setTimeout(() => {
      this.setState({
        articleList: this.state.articleList.concat(this.state.articleList)
      })
    }, 500)
  }
  componentDidMount() {
    let method = () => {
      this.add();
    }
    $(window).on('scroll.article', function() {
      var scrollTop = $(this).scrollTop();　　
      var scrollHeight = $(document).height();　　
      var windowHeight = $(this).height();　　
      if (scrollTop + windowHeight === scrollHeight) {　　
        method();　
      }
    });
  }
  componentWillUnmount() {
    $(window).off('.article');
  }
	render(){
		return(

     <div className="warpper">
        <div className="am-panel">

        {this.state.articleList.map((item,index)=>{
          return(
              <div className="article-list" key={index} >
                <img alt='test' src={require('../../style/images/portrait.png')} />
                <div className="cont">
                  <p className="info"><span>用户B</span>xxxxxxx分公司</p>
                  <p className="time">2016.06.15</p>
                  <a>
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
            )
        })}

        <div className="bottom-spin" > <Spin spinning={this.state.loading} size='small' /></div>

        </div>
      </div>


			)
	}
}
export default Article;