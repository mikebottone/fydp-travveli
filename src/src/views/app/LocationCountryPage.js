// clicking on a country card will bring you to this page
//will display cities within the country and activities within the cities

import React, { Component } from "react";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
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
import Carousel from "react-multi-carousel";

class LocationCountryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      country: "",
      TagID: null, //country ID
      cities:[],
      favs: [],
      tagDetails: []
    };
    this.fetchCitiesFromDB = this.fetchCitiesFromDB.bind(this);
    this.renderCityCards = this.renderCityCards.bind(this);
    this.renderAppHeader = this.renderAppHeader.bind(this);
    this.getTagDetails = this.getTagDetails.bind(this);
  }

  componentDidMount(){
    this.setState({TagID: this.props.location.state.TagID})
    this.setState({country: this.props.location.state.country})
    window.scrollTo(0,0);
    this.fetchCitiesFromDB();
    this.getFavourites();
    this.getTagDetails();
  }

  getTagDetails(){
    fetch('/tag-details?TagID=' + this.props.location.state.TagID)
    .then(res => res.json())
    .then(tagDetails => this.setState({tagDetails}))
  }

  getFavourites(){
    fetch('/check-favs?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favs => this.setState({favs}))
  }

  fetchCitiesFromDB(){
    //gets the cities for the country from the DB
    fetch('/secondary-level?TagID='+this.props.location.state.TagID)
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
                  <LocationCard pic={city.TagCardImage}
                              city= {city.TagName}
                              country= {this.state.country}
                              TagID={city.TagID}
                              description={city.TagLongDescription}
                  />
            </Col>
          )})}
        </Carousel>
  }

  renderAppHeader(){
    return this.state.tagDetails.map((data) => {
      return <AppHeader key={data.TagID}
              title={data.TagName}
              pic = {data.TagCoverImage}
            />
    })
  }

  render(){
    return (
      <>
        <AppNavbar />
        <this.renderAppHeader />
        <div className="main">
            <Container>
            <div>
              <h1>{this.state.country}</h1>
              {this.props.location.state.description}
            </div>
            <Row>
              <h2> {this.state.country}'s Cities</h2>
            </Row>
              <this.renderCityCards/>
            <hr/>
            </Container>
            <AppFooter/>
        </div>
      </>
    );
  }
}

LocationCountryPage.propTypes = {
  country: PropTypes.string,
  TagID: PropTypes.number,
  description: PropTypes.string
};

export default LocationCountryPage;
