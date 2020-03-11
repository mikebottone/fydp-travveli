//displayed when an activity category is selected (ie. adventurous)
//displays the specific activity categories with associated activities (ie. hiking)

import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import ActivityCategoryCard from "components/Cards/ActivityCategoryCard";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import Carousel from "react-multi-carousel";

class ActivityCategoryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      primaryActivity: "", //primary activity name
      TagID: null, //primary activity ID
      secondaryActivities:[],
      activityDetails: [],
      favs: []
    };
    this.getSecondaryCategoryCards = this.getSecondaryCategoryCards.bind(this);
    this.renderSecondaryActivityCategoriesList = this.renderSecondaryActivityCategoriesList.bind(this);
    this.renderSecondaryActivityCategoryCards = this.renderSecondaryActivityCategoryCards.bind(this);
    this.fetchSecondaryActivitiesFromDB = this.fetchSecondaryActivitiesFromDB.bind(this);
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
  }

  componentDidMount(){
    this.setState({TagID: this.props.location.state.TagID})
    this.setState({primaryActivity: this.props.location.state.primaryActivity})
    window.scrollTo(0,0);
    this.fetchSecondaryActivitiesFromDB();
    this.fetchActivityDetails();
    this.getFavourites();
  }

  getFavourites(){
    fetch('/check-favs?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favs => this.setState({favs}))
  }

  fetchSecondaryActivitiesFromDB(){
    //gets the secondary activity category of the primary activity from the DB
    fetch('/secondary-level?TagID='+this.props.location.state.TagID)
    .then(res => res.json())
    .then(secondaryActivities => this.setState({ secondaryActivities }))
  }

  fetchActivityDetails(){
    fetch('/activity-details?TagID='+ this.props.location.state.TagID)
    .then(res => res.json())
    .then(activityDetails => this.setState({ activityDetails }))
  }

  renderSecondaryActivityCategoryCards(){
    //displays all secondary categories at top of page
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
        dotListClass=""  itemClass=""  additionalTransfrom={10}   arrows={true}
        className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
        slidesToSlide={1}
        >
          {this.state.secondaryActivities.map((secondaryActivity) => {
            return(
            <Col key={secondaryActivity.TagID}>
                <ActivityCategoryCard activity={secondaryActivity.TagName}
                  TagID={secondaryActivity.TagID}
                  pic={require("assets/TagImages/Cities and Countries/"+ secondaryActivity.TagID +"/Card.jpg")}
                />
            </Col>
          )})}
       </Carousel>
  }

  renderSecondaryActivityCategoriesList(){
    //Links with each secondary category
    var output = this.state.secondaryActivities.map((secondaryActivity) =>
      <div key={secondaryActivity.TagID}>
        <Link to={{
            pathname: "/activity-specific",
            state: {
              secondaryActivity: secondaryActivity.TagName,
              TagID: secondaryActivity.TagID
            }
          }}>
          <h4>{secondaryActivity.TagName}</h4>
        </Link>
        {this.getSecondaryCategoryCards()}
      </div>
       );
      return( <div>{output}</div>);
  }

  getSecondaryCategoryCards(){ //Need to fetch the secondary level activity details not the first level
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
        dotListClass=""  itemClass=""  additionalTransfrom={10}   arrows={true}
        className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
        slidesToSlide={4}
        >
          {this.state.activityDetails.map((data) => {
          return(
              <Col key={data.ActivityID}>
                    <ActivityDetailCard title={data.Title}
                    city={data.City}
                    country={data.Country}
                    ActivityID={data.ActivityID}
                    favs={this.state.favs}
                    pic={require("assets/img/sections/leonard-cotte.jpg")}/>
              </Col>
            );
          })}
        </Carousel>
  }

  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader pic={require("assets/TagImages/Cities and Countries/"+ this.props.location.state.TagID +"/Cover.jpg")} />
        <div className="main">
          <div className="section">
            <Container>
            <Row>
              <h2>{this.props.location.state.primaryActivity} Categories</h2>
            </Row>
              <this.renderSecondaryActivityCategoryCards/>
            <hr/>
              <this.renderSecondaryActivityCategoriesList/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

ActivityCategoryPage.propTypes = {
  primaryActivity: PropTypes.string,
  TagID: PropTypes.number
};

export default ActivityCategoryPage;
