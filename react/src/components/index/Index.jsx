import React from 'react'
import './index.less'
import Slider from 'react-slick';
import {Link} from 'react-router'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import ArticleItem from '../article/ArticleItem.jsx'
import $ from 'jquery';
//import CourseItem from '../course/CourseItem.jsx'
import {hashHistory} from 'react-router';
 const SampleNextArrow =(props)=> {
  const {onClick} = props
  return (
    <div
      className={"arr arr-right "}
      onClick={onClick}
    >
    </div>
  );
}

const SamplePrevArrow =(props)=> {
  const {onClick} = props
  return (
    <div
      className={"arr arr-left "}
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
      score: 0,
      loading: false,
      now_item: {
        studyIntegral: 0
      },
      channelId: '',
    }
  }
  componentWillMount() {
    this.show();
  }
  // componentDidMount(){
  //   console.log(this.props.pathname);
   
  // }
  show() {
    let isFrist = localStorage.getItem('isFirst');
    let notShowGuide = localStorage.getItem('notShowGuide');
    if (isFrist !== 'true' && notShowGuide !== 'true') {
      hashHistory.push('/Guide');
      return;
    }
    tool.loading(this, true);
    api.homeIndex().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
          courseList: data.goodCourseList,
          articleList: data.goodEssayList,
          score: data.score,
          channelId: data.channelId,
        }, () => {
          localStorage.setItem('channelId', this.state.channelId);
        })
      } else {
        message.error(data.errMsg, 3);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
  jump(item) {
    if(item.courseConvert===1){
            message.warning('视频转码中，请稍后再试...', 1);
            this.show();
		}else if(item.courseConvert===2){
            message.warning('转码失败，请联系管理员...', 1);
            this.show();
		}else{
      //  if(item.clickRat<=200){
            if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
              hashHistory.push(`/App/Course/courseDetail/${item.courseId}`);
              return;
            }
            this.setState({
              now_item: item
            })
          // }else{
          //   message.warning('该课程在加载中...', 3);
          // }
    }
  }
  ok() {
    let body = {
      courseId: this.state.now_item.courseId
    }
    api.cashcourse(body).then((data) => {
      if (data.result === 'RC100') {
        hashHistory.push(`/App/Course/courseDetail/${this.state.now_item.courseId}`);
      } else {
        message.error(data.errMsg, 1);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
  action(courseId, recordType) {
    let body = {
      courseId,
      recordType
    };
    api.operatecourse(body).then((data) => {
      if (data.result === 'RC100') {
        this.show();
      } else {
        message.error(data.errMsg, 1);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
  click(item) {
    if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
      this.action(item.courseId, 2);
      return;
    }
    this.setState({
      now_item: item
    })
  }
  componentDidMount() {
    let arriveTime = localStorage.getItem("arriveTime");
    let loadTime = new Date().getTime();
    console.log(`请求到达时间: ${arriveTime}`)
    console.log(`页面加载完成时间: ${loadTime}`);
    console.log(`页面加载完成时间与请求到达时间差: ${loadTime-arriveTime}`);
    console.log(this.props.location.pathname);
   if(this.props.location.pathname=="/Index"||this.props.location.pathname=="/"){
          $('.warpper').css("paddingTop",0);
          $(".header").addClass("opacity")
              //alert($('.warpper').css("paddingTop"));
              $(window).scroll(function() {
                if($(window).scrollTop()>140){
                  $(".header").removeClass("opacity")
                }else{
                  $(".header").addClass("opacity")
                }
            })
         
      }
   

  }
	render() {
    const settings = {
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      rtl: false,
      dots: false,
      infinite: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className: 'index-slider'
    };
		return (
        <div className="warpper" >

             <Slider {...settings}>
               <img alt='test' src={require('../../style/images/banner-1.jpg')} />
               <img alt='test' src={require('../../style/images/banner-2.jpg')} />
               <img alt='test' src={require('../../style/images/banner-3.jpg')} />
             </Slider>

          <div className="am-panel panel-in">
            <ul className="am-avg-sm-4 clearFix">
              <li className="li-1">
                <Link to='/StudentTop'></Link>
                <p style={{color:'#666'}}>学霸榜</p>
              </li>
              <li className="li-2">
                <Link to='/CourseTop'></Link>
                <p style={{color:'#666'}}>点击榜</p>
              </li>
              <li className="li-3">
                <Link to='/App/StoryLine'> </Link>
                <p style={{color:'#666'}}>{this.state.channelId==='4'?'星行世界':'蜂行世界'}</p>
              </li>
              <li className="li-4">
                <Link to='/App/PersonalCenter' > </Link>
                <p style={{color:'#666'}}>我的名片</p>
              </li>
                </ul>
          </div>
           <Spin spinning={this.state.loading}>
          <div className="am-panel index-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">热播课程</h2>
              <nav className="am-titlebar-nav">
                <Link to='/Course' className>更多课程</Link>
              </nav>
            </div>
            <ul className="cur-list am-avg-lg-3 am-avg-md-3 am-avg-sm-2 clearFix">
            {this.state.courseList.map((item,index)=>{
              return(
               <li key={index}>
                          <a>
                            <img onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} src={require('../../style/images/rbo.jpg')} alt='test'/>
                            <p onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} className="time">{tool.formatTimestamp(item.createTime)}</p>
                          </a>
                          <div className="cur-list-info">
                            <h2 onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""}>{item.courseName}{item.goodCourse === '1'?<div className="jc-icon" />:null}</h2>
                            <p className="like">
                              <span className={item.userCourseOperation.isCollection===1?'active':''} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} onClick={()=>this.click(item)}><i className="fa fa-heart-o"></i>{item.sumCollection}</span>
                              <span className={item.userCourseOperation.isLike===1?'active':''} onClick={()=>this.action(item.courseId,3)}><i className="fa fa-thumbs-o-up"></i>{item.sumLike}</span>
                              </p>
                          </div>
                </li>
                )
            })}
            </ul>
          </div>
         
          <div className="am-panel">
            <div data-am-widget="titlebar" className="am-titlebar am-titlebar-default">
              <h2 className="am-titlebar-title">{this.state.channelId==='4'?'星行圈':'蜂行圈'}</h2>
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
          </Spin>

          <div className="am-modal am-modal-confirm" tabIndex="-1" id={`course-confirm`}>
					<div className="am-modal-dialog">
						<div className="am-modal-hd">温馨提示</div>
						<div className="am-modal-bd">
						兑换课程将需要{this.state.now_item.studyIntegral}积分，您的当前积分为{this.state.score}，是否继续？
						</div>
						<div className="am-modal-footer">
						<span className="am-modal-btn" data-am-modal-cancel>取消</span>
						<span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
						</div>
						</div>
					</div>
        </div>
		)
	}
}
export default Index