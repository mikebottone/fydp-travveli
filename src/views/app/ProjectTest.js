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

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";

// carousel items
const carouselItems = [
  {
    src: require("assets/img/sections/pedro-lastra.jpg"),
    altText: "Somewhere",
    caption: "Somewhere"
  },
  {
    src: require("assets/img/sections/fabio-mangione.jpg"),
    altText: "Somewhere else",
    caption: "Somewhere else"
  },
  {
    src: require("assets/img/cover.jpg"),
    altText: "Here it is",
    caption: "Here it is"
  }
];

function ProjectTest() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("project-test");
    //window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("project-test");
    };
  });
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
      <AppNavbar />
      <div className="wrapper">
        <div className="wrapper">
          <div className="main">
            <div className="section">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto text-center" md="6" xs="12">
                    <h2 className="discover-title">
                      <small>See latest Trips</small>
                    </h2>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/sections/leonard-cotte.jpg") +
                          ")"
                      }}
                    >
                      <CardBody>
                        <Link to="/presentation" target="_blank"> {/*link to presentation page by clicking card body, target="_blank" opens new tab*/}
                        <Badge color="info" pill>
                          Web Design
                        </Badge>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <CardTitle tag="h3">
                            San Francisco Museum of Modern Art
                          </CardTitle>
                        </a>
                        <p className="card-description">
                          Nothing must be arbitrary or left to chance. Care and
                          accuracy in the design process show respect towards the
                          consumer.
                        </p>
                        <CardFooter>
                          <Button
                            className="btn-neutral"
                            color="link"
                            href="#pablo"
                            //onClick={e => e.preventDefault()}
                            to="/presentation" tag={Link}
                          > {/*^^ link to presentation page by clicking "read" button on card*/}
                            <i className="fa fa-book mr-1" />
                            Read
                          </Button>
                          <Button
                            className="btn-neutral"
                            color="link"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-clock-o mr-1" />
                            Bookmark
                          </Button>
                        </CardFooter></Link>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col className="ml-auto mr-auto" md="8">
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
                <Row className="items-row">
                  <Col className="ml-auto" md="3" sm="4">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/pavel-kosov.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/joe-gardner-2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Jane Doe</span>
                                <div className="meta">Drawn on 23 Nov</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col md="4" sm="4">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/por7o.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/erik-lucatero-2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Tom Hanks</span>
                                <div className="meta">Drawn on 23 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col className="mr-auto" md="3" sm="4">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/vincent-versluis.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/chet_faker_2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Chet Faker</span>
                                <div className="meta">Drawn on 20 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row className="items-row">
                  <Col className="ml-auto" md="4" sm="6">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/ilya-yakover.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Tom Hank</span>
                                <div className="meta">Drawn on 23 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col md="3" sm="6">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/miguel-perales.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Tom Banks</span>
                                <div className="meta">Drawn on 23 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col className="mr-auto d-sm-block" md="3">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/neill-kumar.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/flume.jpg")}
                              />
                              <div className="text">
                                <span className="name">Flume</span>
                                <div className="meta">Drawn on 4 Aug</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row className="items-row">
                  <Col className="ml-auto" md="2" sm="6">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/john-towner.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/placeholder.jpg")}
                              />
                              <div className="text">
                                <span className="name">Tom Hanks</span>
                                <div className="meta">Drawn on 23 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col md="4" sm="6">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/leonard-cotte.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/placeholder.jpg")}
                              />
                              <div className="text">
                                <span className="name">Banks</span>
                                <div className="meta">Drawn on 3 Mar</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                  <Col className="mr-auto" md="4" sm="6">
                    <Card className="card-plain text-center">
                      <div className="card-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="img-rounded img-responsive"
                            src={require("assets/img/sections/anders-jilden.jpg")}
                          />
                        </a>
                        <CardBody className="details-center">
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <div className="author">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/erik-lucatero-2.jpg")}
                              />
                              <div className="text">
                                <span className="name">Tom Hanks</span>
                                <div className="meta">Drawn on 23 Jan</div>
                              </div>
                            </div>
                          </a>
                        </CardBody>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center ml-auto mr-auto" md="4">
                    <div className="preloader">
                      <div className="uil-reload-css mr-1" style={{}}>
                        <div />
                      </div>
                      <h5>Loading More</h5>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectTest;
