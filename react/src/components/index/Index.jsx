import React from 'react'
import './index.less'
import Slider from 'react-slick';
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {getFile_IP } from '../../config/serverIp'

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
      courseList: tool.getObject(0),
      articleList: tool.getObject(0)
    }
  }
  componentWillMount() {
    api.homeIndex().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          courseList: data.goodCourseList,
          articleList: data.goodEssayList
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
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
                     <img onError={(e) => tool.headImageError(e)} alt='img' src={getFile_IP + '/downfile/' + item.headPath} />
                     <p className="info"><span>{item.userRealName}</span>{item.branchOffice}</p>
                     <p className="time">{tool.formatTimestamp(item.createTime)}</p>
                   </div>
                   <a>
                     <article className="am-article">
                       <div className="am-article-hd">
                         <h1 className="am-article-title">{item.essayTitle}</h1>
                       </div>
                       <div className="am-article-bd">
                         <p className="am-article-lead">{item.essayNote}</p>
                       </div>
                     </article>
                   </a>
                   <p className="like"><span><i className="fa fa-heart-o" />{item.sumCollection}</span><span><i className="fa fa-thumbs-o-up" />{item.sumLike}</span></p>
                 </div>
                )
            })}
          </div>
        </div>
		)
	}
}
export default Index