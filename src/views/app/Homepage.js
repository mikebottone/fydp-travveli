import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  CardImg,
  CardLink,
  Container,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col
} from "reactstrap";

// core components
import AppCard from "components/Cards/AppCard.js";
import FullPicCard from "components/Cards/FullPicCard.js";
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import CategoryCard from "components/Cards/CategoryCard";
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import LocationCard from "components/Cards/LocationCard";
import MoodCard from "components/Cards/MoodCard";
import ActivityCard from "components/Cards/ActivityCard";

class Homepage extends Component{
  constructor(props){
    super(props);
    this.state = {
      airports: []
    }
  }

  //fetch users on first mount
  componentDidMount() {
    this.getAirports();
  }

  //retrieves the list of users from Express App
  getAirports(){
    fetch('http://localhost:4000/airports')
    .then(res => res.json())
    .then(airports => this.setState({ airports }))
  }

  getPic(){
    return require("assets/img/faces/erik-lucatero-2.jpg");
  }

  getDescription(){
    return "this is some text";
  }

  render() {
   const { airports } = this.state;
    return (
      <>
        <AppNavbar />
        <ProfilePageHeader />
        <div className="main">
          <div className="section">
            <Container>
        <div>
        <h1>List of airports</h1>
        {/* Check to see if any items are found*/}
        {airports.length ? (
          <div>
            {/* Render the list of items */}
            {airports.map((item) => {
              return(
                <div key={item.AirportCode}>
                  {item.AirportCode}|
                  {item.AirportCity}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
              {/* Recommended for you */}
              <h3>Recommended for you...</h3>
              <Row>
                <Col md="3">
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:"url(" + require("assets/img/sections/leonard-cotte.jpg") + ")"
                      }}
                      >
                      <CardHeader>Header</CardHeader>
                      <CardBody>
                        <CardTitle>Somewhere nice</CardTitle>
                        <CardText> Some words </CardText>
                        <CardLink href="#">Link to a place </CardLink>
                      </CardBody>
                      <CardFooter>CardFooter</CardFooter>
                    </Card>
                </Col>
                <Col md="3">
                  <FullPicCard pic={require("assets/img/sections/leonard-cotte.jpg")}
                      description={this.getDescription()}
                  />
                </Col>
                <Col md="3">
                    <AppCard pic={this.getPic()}
                      description={this.getDescription()}
                    />
                </Col>
                <Col md="3">
                  <Link to="/locations">
                    <CategoryCard pic={require("assets/img/sections/leonard-cotte.jpg")}
                      description={this.getDescription()}
                    />
                  </Link>
                </Col>
              </Row>

            <hr/>

              {/* Mood */}
              <Link to="/moods">
                <h3>Mood</h3>
              </Link>
              <Row>
                <Col md="3">
                  <MoodCard pic={this.getPic()} mood="Adventurous"  icon="nc-icon nc-spaceship"/>
                </Col>
                <Col md="3">
                    <LocationCard pic={this.getPic()}
                      city= "Paris"
                      country= "France"
                    />
                </Col>
                <Col md="3">
                    <ActivityDetailCard pic={this.getPic()}
                      city= "Paris"
                      country= "France"
                      detail="Hiking Trip in the Alps"
                    />
                </Col>

                <Col md="3">
                    <ActivityCard pic={this.getPic()}
                        activity="Hiking"
                    />
                </Col>
              </Row>
              <hr/>
              {/* Activity */}
              <Link to="/activities">
                <h3>Activity</h3>
              </Link>
              <Row>
                <Col md="3">
                  <FullPicCard  pic={this.getPic()}
                      description={this.getDescription()}
                  />
                </Col>
                <Col md="3">
                    <AppCard pic={this.getPic()}
                      description={this.getDescription()}
                    />
                </Col>
                <Col md="3">
                  <CardHeader>Header</CardHeader>
                    <Card
                      data-background="image"
                      style={{ backgroundImage: "url(" + require("assets/img/sections/por7o.jpg") + ")"}}
                      >
                      <CardBody>

                      </CardBody>
                    </Card>
                    <CardFooter>CardFooter</CardFooter>
                </Col>
                <Col md="3">
                    <Card
                      data-background="image"
                      style={{ backgroundImage:"url(" + require("assets/img/sections/vincent-versluis.jpg") + ")" }}
                    >
                      <CardBody>

                      </CardBody>
                    </Card>
                </Col>
              </Row>
              <hr/>
              {/* Location */}
              <Link to="/locations">
                <h3>Location</h3>
              </Link>
              <Row>
                <Col md="3">
                  <FullPicCard  pic={this.getPic()}
                      description={this.getDescription()}
                  />
                </Col>
                <Col md="3">
                    <AppCard pic={this.getPic()}
                      description={this.getDescription()}
                    />
                </Col>
                <Col md="3">
                  <CardHeader>Header</CardHeader>
                    <Card
                      data-background="image"
                      style={{ backgroundImage: "url(" + require("assets/img/sections/por7o.jpg") + ")"}}
                      >
                      <CardBody>

                      </CardBody>
                    </Card>
                    <CardFooter>CardFooter</CardFooter>
                </Col>
                <Col md="3">
                    <Card
                      data-background="image"
                      style={{ backgroundImage:"url(" + require("assets/img/sections/vincent-versluis.jpg") + ")" }}
                    >
                      <CardBody>

                      </CardBody>
                    </Card>
                </Col>
              </Row>
              <AppFooter/>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
