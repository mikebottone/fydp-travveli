import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// reactstrap components

import ComingSoonCard from "components/Cards/ComingSoonCard";
import { Col } from "reactstrap";

class AppCarousel extends Component {
render(){
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
    <Carousel responsive={responsive}
    swipeable={true}
    draggable={false}
    showDots={true}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlay={false}
    autoPlaySpeed={3000}
    keyBoardControl={true}
    customTransition="all .75"
    transitionDuration={500}
    containerClass=""
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    removeArrowOnDeviceType={["tablet", "mobile"]}
    dotListClass=""
    itemClass=""
    additionalTransfrom={25}
    arrows={true}
    className=""
    focusOnSelect={true}
    minimumTouchDrag={80}
    sliderClass=""
    slidesToSlide={1}
    >
      {/* Can map a passed in array to populate the cards */}
      <Col>
      <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col>
      <ComingSoonCard pic = {require('assets/img/comingsoon2.jpg')} />
      </Col>
      <Col>
      <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col>
      <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col>
      <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
    </Carousel>
    </>
  );
}
}
export default AppCarousel;
