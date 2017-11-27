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
        className:'index-slider'
        };
		return(
            <div>
              <Slider {...settings}>
               <img className="theme"/>
               <img className="cover"/>
               <img className="guide"/>
             </Slider>
            </div>
			)
	}
}
export default Guide;