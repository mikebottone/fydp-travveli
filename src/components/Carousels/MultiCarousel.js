import React from "react";
import LocationCard from "components/Cards/LocationCard";

// reactstrap components
import {
  Carousel,
  CarouselItem,
  Row,
  Col
} from "reactstrap";

import ComingSoonCard from "components/Cards/ComingSoonCard";

function MultiCarousel(props) {
  // carousel items
  const carouselItems = [
    {
      src: props.pic1,
      altText: "Somewhere",
      caption: "Somewhere"
    },
    {
      src: props.pic2,
      altText: "Somewhere else",
      caption: "Somewhere else"
    },
    {
      src: props.pic3,
      altText: "Here it is",
      caption: "Here it is"
    }
  ];
  // carousel states and functions
 const [activeIndex, setActiveIndex] = React.useState(0);
 const [animating, setAnimating] = React.useState(false);
 const onExiting = () => {
   setAnimating(true);
 };
 const onExited = () => {
   setAnimating(false);
 };
 const next = () => {
   if (animating) return;
   const nextIndex =
     activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
   setActiveIndex(nextIndex);
 };
 const previous = () => {
   if (animating) return;
   const nextIndex =
     activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
   setActiveIndex(nextIndex);
 };
  return (
    <>
    <Row ml-auto mr-auto>
      <Col className="ml-auto mr-auto">
          <Carousel
            interval={false}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            className="page-carousel"
          >
            {carouselItems.map(item => {
              return (
                <CarouselItem
                  onExiting={onExiting}
                  onExited={onExited}
                  key={item.src}
                > {/* a slide of 4 cards */}
                <Row ml-auto mr-auto>
                  <Col md="3">
                    <LocationCard pic={item.src} city={item.altText}/>
                  </Col>
                  <Col md="3">
                    <LocationCard pic={item.src} city={item.altText}/>
                  </Col>
                  <Col md="3">
                    <LocationCard pic={item.src} city={item.altText}/>
                  </Col>
                  <Col md="3">
                    <LocationCard pic={item.src} city={item.altText}/>
                  </Col>
                </Row>
                </CarouselItem>
              );
            })}
            <a
              className="left carousel-control carousel-control-prev"
              data-slide="prev"
              href="#pablo"
              onClick={e => {
                e.preventDefault();
                previous();
              }}
              role="button"
            >
              <span className="fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control carousel-control-next"
              data-slide="next"
              href="#pablo"
              onClick={e => {
                e.preventDefault();
                next();
              }}
              role="button"
            >
              <span className="fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </a>
          </Carousel>
      </Col>
    </Row>

    <Row className="multi-item-carousel">
      <Col md="3">
        <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col md="3">
        <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col md="3">
        <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col md="3">
        <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
      <Col md="3">
        <ComingSoonCard pic = {require('assets/img/comingsoon1.jpg')} />
      </Col>
    </Row>

    </>
  );
}

export default MultiCarousel;
