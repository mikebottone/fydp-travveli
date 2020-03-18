import React from "react";
import ReactGA from 'react-ga';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import AppFooter from "components/Footers/AppFooter";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  ReactGA.event({
    category: "Landing Page Visit",
    action: "User viewed landing page",
  });

  return (
    <>
    {/*   <LandingNavbar/> } */ }
      <LandingPageHeader />
      <div className="wrapper">
        <div className="section text-center landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="12">
                <h2 className="title">About Travveli</h2>
                <h4>
                 Gone are the days of spending your precious time off lounging by the beach. Today's travelers demand cultural immersion and engaging activities.
                 Through the use of dynamic content and personalized experiences, Travveli surfaces recomendations directly aligned with your interests.
                </h4>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="nc-icon nc-palette" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Highly Personalized Content</h4>
                    <p className="description">
                      Today's travellers expect exceptional service and
                       the digital experience should be no different.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Inspirational Discovery Journey</h4>
                    <p>
                      Vacations are for living outside your
                      comfort zone and experiencing something new.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Algorithmic Recomendations</h4>
                    <p>
                      We use a series of algorithms to learn your interests
                      over time so that we can improve suggestions.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Increased Customer Satisfaction</h4>
                    <p>
                      We're here to aggregate content so that you can feel confident
                      in your decision making process.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto">
                <h2 className="title">How it works</h2>
              </Col>
                <h4>
                  <div align="left">
                    <ol>
                      <li>Create an account</li>
                      <li>Favourite activities that match your interests</li>
                      <li>Our algorithm continuously learns from you and tailors recomendations</li>
                      <li>We analyze your patterns and provide data to our partners in the travel industry</li>
                      <li>Our partners develop special offers matching your interests</li>
                      <li>You recieve personalized deals for trips you actually want to take</li>
                    </ol>
                  </div>
                </h4>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto">
                <h2 className="title">About our Algorithms</h2>
              </Col>
                <h4>
                  <div align="left">
                    <ul>
                      <li>Recomended for You
                          <ul>
                            <li>A Jaccard Similarity index compares all users to each other based on likes </li>
                            <li>Each user to user pair then receives a match percentage</li>
                            <li>Recomendations are based on your 3 closest matches and their favourites</li>
                          </ul>
                      </li>
                      <li>Users also liked
                      <ul>
                        <li>All of the users that have liked the activity you are viewing are aggregated</li>
                        <li>We then compile their likes and surface them based on popularity</li>
                      </ul>
                      </li>
                      <li>Nearby Activities
                      <ul>
                        <li>These are activities that also reside in the city of the activity you are viewing</li>
                      </ul>
                      </li>

                    </ul>
                  </div>
                </h4>
            </Row>
          </Container>
        </div>
        <div className="section section-dark text-center landing-section">
          <Container>
            <h2 className="title">Let's talk about us</h2>
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/faces/rishabh.jpeg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Rishabh Bahri</CardTitle>
                        <h6 className="card-category text-muted">
                          4B Management Engineering
                        </h6>
                      </div>
                    </a>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-link btn-just-icon"
                      color="linkedin"
                      href="https://www.linkedin.com/in/rishabhbahri/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-linkedin" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/faces/noah.jpeg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Noah Bezaire</CardTitle>
                        <h6 className="card-category text-muted">4B Management Engineering</h6>
                      </div>
                    </a>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-link btn-just-icon"
                      color="linkedin"
                      href="https://www.linkedin.com/in/ncbezaire/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-linkedin" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/faces/mike.jpeg")}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Mike Bottone</CardTitle>
                        <h6 className="card-category text-muted">4B Management Engineering</h6>
                      </div>
                    </a>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-link btn-just-icon"
                      color="linkedin"
                      href="https://www.linkedin.com/in/michael-bottone-511898172/"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fa fa-linkedin" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default LandingPage;
