import React from 'react'
import './guide.less'
import { hashHistory } from 'react-router';
import Slider from 'react-slick';
import * as tool from '../../config/tools'
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
      imgList: [],
      nowSlide: 0
    }
  }
  componentWillMount() {
    let imgList = [];
    if (!tool.orient()) {
      imgList.push({src: require('../../style/images/theme@3x.jpg')})
      imgList.push({src: require('../../style/images/cover@3x.jpg')})
      imgList.push({src: require('../../style/images/guide@3x.jpg')})
    }else{
      imgList.push({src: require('../../style/images/iPad-1@3x.jpg')})
      imgList.push({src: require('../../style/images/iPad-2@3x.jpg')})
      imgList.push({src: require('../../style/images/iPad-3@3x.jpg')})
    }
    this.setState({
      imgList
    })
  }
  goIndex(){
    localStorage.setItem('isFirst', 'true');//judge first in index.jsx
    hashHistory.push('/');
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
               {this.state.imgList.map((item,index)=>{
                return(
                  <img key={index} alt='' src={item.src} />
                  )
               })}
             </Slider>
             <div style={{opacity:this.state.nowSlide===2?1:0}} className="float-button" onClick={()=>this.goIndex()} >进入首页</div>
      </div>
    )
  }
}
export default Guide;