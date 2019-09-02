// clicking on a country card will bring you to this page
//will display cities within the country and activities within the cities

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppHeader from "components/Headers/AppHeader";
import AppCard from "components/Cards/AppCard";
import AppFooter from "components/Footers/AppFooter";
import CategoryCard from "components/Cards/CategoryCard";

class LocationCountryPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.getCityCards = this.getCityCards.bind(this);
    this.renderCityList = this.renderCityList.bind(this);
    this.renderCityCards = this.renderCityCards.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
  }

  getCityCards(){
    return <Row>
            <Col>
            <CategoryCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />
            </Col>
            <Col>
            <CategoryCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />
            </Col>
            <Col>
            <AppCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                      description={"Some text"}/>
            </Col>
          </Row>;
  }
  renderCityCards(){
    //displays all categories at top of page
    var cities = ["city", "city2"];
    var output = cities.map((city) =>
      <Col key={city}>
        <div>
          <Link to={{
              pathname: "/city",
              state: {
                tag: city
              }
            }}> {/* pass city to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <CategoryCard title={city}/>
          </Link>
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderCityList(){
    var cities = ["city", "city2"];
    var output = cities.map((city) =>
      <div key={city}>
        <Link to={{
            pathname: "/city",
            state: {
              tag: city
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{city}</h4>
        </Link>
        {this.getCityCards()}
      </div>
       );
      return( <div>{output}</div>);
  }
  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader title={this.props.location.state.tag}
          pic={require("assets/img/countries/flag-"+ this.props.location.state.tag.toLowerCase() +".jpg")}
        />
        <div className="main">
          <div className="section">
            <Container>
            <Row>
              <h2> {this.props.location.state.tag}'s Cities</h2>
            </Row>
            <Row>
              <this.renderCityCards/>
            </Row>
            <hr/>
              <this.renderCityList/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

LocationCountryPage.propTypes = {
  tag: PropTypes.string,
};

export default LocationCountryPage;
