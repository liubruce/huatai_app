import React from 'react'
import './index.less'
import Slider from 'react-slick';
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import ArticleItem from '../article/ArticleItem.jsx'
import {getFile_IP } from '../../config/serverIp'
import CourseItem from '../course/CourseItem.jsx'

 const SampleNextArrow =(props)=> {
  const {onClick} = props
  return (
    <div
      className={"arr arr-left "}
      onClick={onClick}
    >
    </div>
  );
}

const SamplePrevArrow =(props)=> {
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
      courseList: [],
      articleList: [],
      now_item:0,
      score:0
    }
  }
  componentWillMount() {
    this.show();
  }
  show() {
    api.homeIndex().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          courseList: data.goodCourseList,
          articleList: data.goodEssayList,
          score:data.score
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

          <div className="am-panel panel-in index-panel">
            <ul className="am-avg-sm-4 clearFix">
              <li className="li-1"><Link to='/StudentTop'></Link></li>
              <li className="li-2"><Link to='/CourseTop'></Link></li>
              <li className="li-3"><Link to='/App/StoryLine'> </Link></li>
              <li className="li-4"><Link to='/App/PersonalCenter' > </Link></li>
            </ul>
          </div>
          <div className="am-panel index-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">热播课程</h2>
              <nav className="am-titlebar-nav">
                <Link to='/Course' className>更多课程</Link>
              </nav>
            </div>
            <ul className="am-gallery am-avg-sm-2 am-gallery-default">
            {this.state.courseList.map((item,index)=>{
              return(
                <CourseItem show={this.show.bind(this)} key={index} score={this.state.score} item={item} />
/*                    <li key={index} >
                     <div className="am-gallery-item">
                       <a>
                         <video 
                           src={getFile_IP+'/downfile/'+item.coursevideoPath}   
                           className="v-img"
                           height='90px'
                           width='100%'
                           >
                           您的浏览器不支持 video 标签。
                         </video>
                         <h3 className="am-gallery-title">{item.courseName}</h3>
                         <div className="am-gallery-desc"><i className="fa fa-heart-o" />{item.sumCollection}</div>
                       </a>
                     </div>
                    </li>*/
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
                <ArticleItem key={index} show={this.show.bind(this)} score={this.state.score} item={item} />
                )
            })}
          </div>
        </div>
		)
	}
}
export default Index