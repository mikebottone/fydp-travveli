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
import AppFooter from "components/Footers/AppFooter";
import LocationCard from "components/Cards/LocationCard";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class LocationCountryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagName: "", //country
      TagID: null, //country ID
      cities:[]
    };
    this.fetchCitiesFromDB = this.fetchCitiesFromDB.bind(this);
    this.getCityCards = this.getCityCards.bind(this);
    this.renderCityList = this.renderCityList.bind(this);
    this.renderCityCards = this.renderCityCards.bind(this);
  }

  componentDidMount(){
    this.setState({TagID: this.props.location.state.TagID})
    this.setState({TagName: this.props.location.state.TagName})
    window.scrollTo(0,0);
    this.fetchCitiesFromDB();
  }

  fetchCitiesFromDB(){
    //gets the cities for the country from the DB
    fetch('http://localhost:4000/country-cities?TagID='+this.props.location.state.TagID)
    .then(res => res.json())
    .then(cities => this.setState({ cities }))
  }

  renderCityCards(){
    //displays all categories at top of page
    var output = this.state.cities.map((city) =>
      <Col key={city.TagID}>
        <div>
            <LocationCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= {city.TagName}
                        country= {this.state.TagName}//country
                        TagID={city.TagID}

            />
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderCityList(){
    var output = this.state.cities.map((city) =>
      <div key={city.TagID}>
        <Link to={{
            pathname: "/city",
            state: {
              city: city.TagName
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{city.TagName}</h4>
        </Link>
        {this.getCityCards()}
      </div>
       );
      return( <div>{output}</div>);
  }

  getCityCards(){
    return <Row>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= {this.state.TagID}
                        country= {this.state.TagName}
                        detail="Hiking Trip in the Alps"
              />
            </Col>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= "Paris"
                        country= "France"
                        detail="Hiking Trip in the Alps"
              />
            </Col>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= "Paris"
                        country= "France"
                        detail="Hiking Trip in the Alps"
              />
            </Col>
          </Row>;
  }

  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader title={this.state.TagName}
          pic={require("assets/img/countries/flag-"+ this.props.location.state.TagName.toLowerCase() +".jpg")}
        />
        <div className="main">
          <div className="section">
            <Container>
            <Row>
              <h2> {this.state.TagName}'s Cities</h2>
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
  TagName: PropTypes.string,
  TagID: PropTypes.number
};

export default LocationCountryPage;
