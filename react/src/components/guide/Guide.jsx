import React from 'react'
import './guide.less'
import { hashHistory } from 'react-router';
import Slider from 'react-slick';
import $ from 'jquery'
import { Checkbox } from 'antd';
class Page1 extends React.Component {
  constructor(args) {
    super();
  }

  render(){
    return(
        <div className="guide-container">
          <div className="guide-word">
            <p>主题<br/>: 勤学以用,蜂行天下</p>
            <p>精神<br/>: 勤奋/好学/探索/提高</p>
          </div>
          <img alt='guide' src={require('../../style/images/logo@2x.png')} />
        </div>
      )
  }
}
class Page2 extends React.Component {
  constructor(args) {
    super();
  }

  render(){
    return(
    <div className="guide-container">
      <div className="guide-word">
        <p className='title'>蜂行者&not;楔子
        <span>&not;</span></p>
        <p>一花一世界,一木一浮生;</p>
        <p>一草一天堂,一叶一如来;</p>
        <p>一砂一极乐,一方一净土;</p>
        <p>一笑一尘缘,一念一清静</p>
      </div>
      <img alt='guide' src={require('../../style/images/logo@2x.png')} />
    </div>
      )
  }
}
class Page3 extends React.Component {
  constructor(args) {
    super();
  }

  render(){
    return(
    <div className="guide-container-blue">
      <div className="star star-1"><img alt='guide' src={require('../../style/images/avter-1@2x.png')} /></div>
      <div className="star star-2"><img alt='guide' src={require('../../style/images/avter-2@2x.png')} /></div>
      <div className="star star-3"><img alt='guide' src={require('../../style/images/avter-3@2x.png')} /></div>
      <div className="star star-4"><img alt='guide' src={require('../../style/images/avter-4@2x.png')} /></div>
      <div className="star star-5"><img alt='guide' src={require('../../style/images/avter-5@2x.png')} /></div>
      <div className="star star-6"><img alt='guide' src={require('../../style/images/avter-6@2x.png')} /></div>
      <p>学习，感知世界<br/>绽放，美丽人生</p>
      <img src={require('../../style/images/yellow_xq@2x.png')} alt=""/>
    </div>
      )
  }
}
const SampleNextArrow = (props) => {
    const {onClick} = props
    return (
        <div
        className={"arr arr-right "}
        onClick={onClick}
        >
    </div>
    );
}

const SamplePrevArrow = (props) => {
    const {onClick} = props
    return (
        <div
        className={"arr arr-left "}
        onClick={onClick}
        >
    </div>
    );
}
class Guide extends React.Component {
  constructor(args) {
    super()
    this.state = {
      nowSlide: 0,
      notShowGuide:true
    }
  }
  goIndex() {
    localStorage.setItem('notShowGuide', this.state.notShowGuide ? 'true' : 'false');
    localStorage.setItem('isFirst', 'true'); //judge first in index.jsx
    hashHistory.push('/');
  }
  componentDidMount() {
    $('.guide-page').width($(window).width());
    $('.guide-page').height($(window).height());
  }
  render() {
    const settings = {
      speed: 500,
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      className: 'guide-slider',
      afterChange: (currentSlide, nextSlide)=> {
        this.setState({
          nowSlide:currentSlide
        })
      },
    };
    return (
      <div className='guide-div'>
             <Slider {...settings}>
                 <div className='guide-page'><Page1 /></div>
                 <div className='guide-page'><Page2 /></div>
                 <div className='guide-page'><Page3 /></div>
             </Slider>
             {this.state.nowSlide===2?<Checkbox checked={this.state.notShowGuide} onChange={(e)=>{this.setState({notShowGuide:e.target.checked})}}>不再显示</Checkbox>:null}
             <div style={{opacity:this.state.nowSlide===2?1:0}}
              className="float-button" 
              onClick={()=>this.goIndex()} >进入首页</div>
      </div>
    )
  }
}
export default Guide;