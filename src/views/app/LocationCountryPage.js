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
import Carousel from "react-multi-carousel";

class LocationCountryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      country: "",
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
    this.setState({country: this.props.location.state.country})
    window.scrollTo(0,0);
    this.fetchCitiesFromDB();
  }

  fetchCitiesFromDB(){
    //gets the cities for the country from the DB
    fetch('http://localhost:4000/secondary-level?TagID='+this.props.location.state.TagID)
    .then(res => res.json())
    .then(cities => this.setState({ cities }))
  }

  renderCityCards(){
    //displays all categories at top of page
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

    return <Carousel responsive={responsive}
        swipeable={true} draggable={false}
        showDots={false}  ssr={true} // means to render carousel on server-side.
        infinite={true}  autoPlay={false}
        autoPlaySpeed={3000} keyBoardControl={true}
        containerClass=""    renderButtonGroupOutside={false}
        renderDotsOutside={false} removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass=""  itemClass=""  additionalTransfrom={25}   arrows={true}
        className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
        slidesToSlide={1}
        >
          {this.state.cities.map((city) => {
            return(
            <Col key={city.TagID}>
                  <LocationCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                              city= {city.TagName}
                              country= {this.state.country}
                              TagID={city.TagID}
                  />
            </Col>
          )})}
        </Carousel>
  }

  renderCityList(){
    var output = this.state.cities.map((city) =>
      <div key={city.TagID}>
        <Link to={{
            pathname: "/city",
            state: {
              city: city.TagName,
              TagID: city.TagID
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
    //TODO
    return <Row>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= {this.state.TagID}
                        country= {this.state.country}
                        title="Hiking Trip in the Alps"
              />
            </Col>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
              />
            </Col>
            <Col>
              <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
              />
            </Col>
          </Row>;
  }

  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader title={this.state.country}
          pic={require("assets/img/countries/flag-"+ this.props.location.state.country.toLowerCase() +".jpg")}
        />
        <div className="main">
          <div className="section">
            <Container>
            <Row>
              <h2> {this.state.country}'s Cities</h2>
            </Row>
              <this.renderCityCards/>
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
  country: PropTypes.string,
  TagID: PropTypes.number
};

export default LocationCountryPage;
