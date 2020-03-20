//displayed when an activity category is selected (ie. adventurous)
//displays the specific activity categories with associated activities (ie. hiking)

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
import ActivityCategoryCard from "components/Cards/ActivityCategoryCard";
import ComingSoonCard from "components/Cards/ComingSoonCard";
import Carousel from "react-multi-carousel";

class ActivityCategoryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      primaryActivity: "", //primary activity name
      TagID: null, //primary activity ID
      secondaryActivities:[],
      activityDetails: [],
      favs: [],
      tagDetails: []
    };

    this.renderSecondaryActivityCategoryCards = this.renderSecondaryActivityCategoryCards.bind(this);
    this.fetchSecondaryActivitiesFromDB = this.fetchSecondaryActivitiesFromDB.bind(this);
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
    this.renderAppHeader = this.renderAppHeader.bind(this);
    this.getTagDetails = this.getTagDetails.bind(this);
  }

  componentDidMount(){
    this.setState({TagID: this.props.location.state.TagID})
    this.setState({primaryActivity: this.props.location.state.primaryActivity})
    window.scrollTo(0,0);
    this.fetchSecondaryActivitiesFromDB();
    this.fetchActivityDetails();
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
                  pic={secondaryActivity.TagCardImage}
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
            <Row>
              <h2>{this.props.location.state.primaryActivity} Categories</h2>
            </Row>
            {this.state.secondaryActivities.length ? (
              <this.renderSecondaryActivityCategoryCards/>
              ):
              ( <Row>
                <Col>
                  <ComingSoonCard pic={require("assets/img/comingsoon1.jpg")}/>
                </Col>
                <Col>
                  <ComingSoonCard pic={require("assets/img/comingsoon1.jpg")}/>
                </Col>
                <Col>
                  <ComingSoonCard pic={require("assets/img/comingsoon1.jpg")}/>
                </Col>
                <Col>
                  <ComingSoonCard pic={require("assets/img/comingsoon1.jpg")}/>
                </Col>
              </Row>)
              }
              <hr/>
            </Container>
            <AppFooter/>
        </div>
      </>
    );
  }
}

ActivityCategoryPage.propTypes = {
  primaryActivity: PropTypes.string,
  TagID: PropTypes.number,
  header: PropTypes.string
};

export default ActivityCategoryPage;
