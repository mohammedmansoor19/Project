import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courosel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 60000
        
      };
      const Images = [
        '34.png',
        '2.png',
        '23.png',
        'mt.png',
        'ktm-rc-200.png'
      ]
  return (
    <div>
      <Slider {...settings}>
      <div >
        <img src='34.png' className=' w-screen h-screen object-cover' />
      </div>
      <div>
        <img src='2.png'  className=' w-screen h-screen object-cover' />
      </div>
      <div>
        <img src='23.png'  className=' w-screen h-screen object-cover'/>
      </div>
      <div>
        <img src='mt.png'  className=' w-screen h-screen object-cover' />
      </div>
     
    </Slider>
    </div>
  )
}

export default Courosel
