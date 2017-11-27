import React from 'react'
import './guide.less'
import {hashHistory} from 'react-router';
import Slider from 'react-slick';
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

class Guide extends React.Component {
  constructor(args) {
    super()
    this.state = {
    }
  }
	render(){
        const settings = {
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: false,
        dots: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        className:'guide-slider',
        beforeChange: function(currentSlide, nextSlide) {
            console.log(currentSlide)
            if(currentSlide===2){
                 hashHistory.push("/");
            }
          },
        };
		return(
            <div>
              <Slider {...settings}>
               <img alt='test' src={require('../../style/images/theme@3x.jpg')} />
               <img alt='test' src={require('../../style/images/cover@3x.jpg')} />
               <img alt='test' src={require('../../style/images/guide@3x.jpg')} />
               {/*<div className="theme"/>
               <div className="cover"/>
               <div className="guide"/>*/}
             </Slider>
            </div>
			)
	}
}
export default Guide;