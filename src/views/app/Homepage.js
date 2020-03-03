import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import LocationCard from "components/Cards/LocationCard";
import MoodCard from "components/Cards/MoodCard";
import ActivityCard from "components/Cards/ActivityCard";
import MultiCarousel from "components/Carousels/MultiCarousel";
import DetailedActivityCarousel from "components/Carousels/DetailedActivityCarousel";
import TestCarousel from "components/Carousels/TestCarousel";

class Homepage extends Component{
  constructor(props){
    super(props);
    this.state = {
      airports: [],
      token: ''
    }
  }

  //fetch users on first mount
  componentDidMount() {
    // this.getAirports()
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      token: decoded.token
    })
  }

  //remove later
  getAirports(){
    fetch('http://localhost:4000/airports?q="YYZ"')
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
  //  const { airports } = this.state;
    return (
      <>
        <AppNavbar />
        <ProfilePageHeader />
        <div className="main">
          <div className="section">
            <Container>
            {/* <div>
            <h1>List of airports</h1>
            {/* Check to see if any items are found
            {airports.length ? (
              <div>
                {/* Render the list of items
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
            </div> */}
              {/* Recommended for you */}
              <MultiCarousel
                pic1={require("assets/img/sections/pedro-lastra.jpg")}
                pic2={require("assets/img/sections/fabio-mangione.jpg")}
                pic3={require("assets/img/cover.jpg")}
              />
              <TestCarousel/>
              <h3>Recommended for you...</h3>
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
                        activity="Active"
                   />
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
                  <MoodCard pic={this.getPic()} mood="Adventurous"  icon="nc-icon nc-spaceship"/>
                </Col>
                <Col md="3">
                  <MoodCard pic={this.getPic()} mood="Adventurous"  icon="nc-icon nc-spaceship"/>
                </Col>
                <Col md="3">
                  <MoodCard pic={this.getPic()} mood="Adventurous"  icon="nc-icon nc-spaceship"/>
                </Col>
              </Row>

              <hr/>

              {/* Activity */}
              <Link to="/activities">
                <h3>Activity</h3>
              </Link>
              <Row>
                <Col md="3">
                  <ActivityCard pic={this.getPic()}
                        activity="Active"
                  />
                </Col>
                <Col md="3">
                  <ActivityCard pic={this.getPic()}
                        activity="Active"
                  />
                </Col>
                <Col md="3">
                  <ActivityCard pic={this.getPic()}
                        activity="Active"
                  />
                </Col>
                <Col md="3">
                  <ActivityCard pic={this.getPic()}
                        activity="Active"
                  />
                </Col>
              </Row>

              <hr/>
              {/* Location */}
              <Link to="/locations">
                <h3>Location</h3>
              </Link>
              <Row>
                <Col md="3">
                  <LocationCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                  />
                </Col>
                <Col md="3">
                  <LocationCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                  />
                </Col>
                <Col md="3">
                  <LocationCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                  />
                </Col>
                <Col md="3">
                  <LocationCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                  />
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
