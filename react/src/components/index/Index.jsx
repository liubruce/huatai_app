import React from 'react'
import './index.less'
import Slider from 'react-slick';
import {Link} from 'react-router'
import * as tool from '../../config/tools'

function SampleNextArrow(props) {
  const {onClick} = props
  return (
    <div
      className={"arr arr-left "}
      onClick={onClick}
    >
    </div>
  );
}

function SamplePrevArrow(props) {
  const {onClick} = props
  return (
    <div
      className={"arr arr-right "}
      onClick={onClick}
    >
    </div>
  );
}

class Index extends React.Component {
  constructor(args) {
    super();
    this.state = {
      courseList: tool.getObject(4),
      articleList: tool.getObject(2)
    }
  }
	render() {
    const settings = {
      // dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className:'index-slider'
    };
		return (
        <div className="warpper">

             <Slider {...settings}>
               <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
               <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-2.jpg" />
               <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-3.jpg" />
               <img alt='test' src="http://s.amazeui.org/media/i/demos/bing-4.jpg" />
             </Slider>

          <div className="am-panel panel-in">
            <ul className="am-avg-sm-4 clearFix">
              <li className="li-1"><a> </a></li>
              <li className="li-2"><Link to='/Course'></Link></li>
              <li className="li-3"><Link to='/App/StoryLine'> </Link></li>
              <li className="li-4"><Link to='/Personal' > </Link></li>
            </ul>
          </div>
          <div className="am-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">热播课程</h2>
              <nav className="am-titlebar-nav">
                <Link to='/Course' className>更多课程</Link>
              </nav>
            </div>
            <ul className="am-gallery am-avg-sm-2 am-gallery-default">
            {this.state.courseList.map((item,index)=>{
              return(
                    <li key={index} >
                     <div className="am-gallery-item">
                       <a>
                         <img alt='img not found' src="http://s.amazeui.org/media/i/demos/bing-1.jpg" />
                         <h3 className="am-gallery-title">课程名称</h3>
                         <div className="am-gallery-desc"><i className="fa fa-heart-o" />13,888</div>
                       </a>
                     </div>
                    </li>
                )
            })}
            </ul>
          </div>
          <div className="am-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">蜂行圈</h2>
              <nav className="am-titlebar-nav">
                <Link to='/Article' className>更多内容</Link>
              </nav>
            </div>
            {this.state.articleList.map((item,index)=>{
              return(
                  <div key={index} className="am-panel-bd">
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
                )
            })}
          </div>
        </div>

		)
	}
}
export default Index