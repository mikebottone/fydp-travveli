import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col
} from "reactstrap";

function DetailedActivityCarousel(props) {
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
 const goToIndex = newIndex => {
   if (animating) return;
   setActiveIndex(newIndex);
 };
  return (
    <>
    <Row>
      <Col className="ml-auto mr-auto" md="7">
        <Card className="card-raised page-carousel">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              items={carouselItems}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {carouselItems.map(item => {
              return (
                <CarouselItem
                  onExiting={onExiting}
                  onExited={onExited}
                  key={item.src}
                >
                  <img src={item.src} alt={item.altText} />
                  <CarouselCaption
                    captionText={item.caption}
                    captionHeader=""
                  />
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
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default DetailedActivityCarousel;
