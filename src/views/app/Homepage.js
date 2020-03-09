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
import MoodCard from "components/Cards/MoodCard";
import ActivityCard from "components/Cards/ActivityCard";
// import ComingSoonCard from "components/Cards/ComingSoonCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CountryCard from "components/Cards/CountryCard";

class Homepage extends Component{
  constructor(props){
    super(props);
    this.state = {
      popularActivities:[],
      primaryActivities: [],
      moods: [],
      countries: [],
      token: '',
      favs: []
    }
  }

  //fetch users on first mount
  componentDidMount() {
    this.getCountries();
    this.getMoods();
    this.getPrimaryActivities();
    this.getPopularActivities();
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      token: decoded.token
    })
    this.getFavourites()
  }

  getFavourites(){
    fetch('http://localhost:4000/check-favs?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favs => this.setState({favs}))
  }

  getCountries(){
    fetch('http://localhost:4000/countries')
    .then(res => res.json())
    .then(countries => this.setState({ countries }))
  }

  getMoods(){
    fetch('http://localhost:4000/moods')
    .then(res => res.json())
    .then(moods => this.setState({ moods }))
   }

  getPrimaryActivities(){
    fetch('http://localhost:4000/primaryactivities')
    .then(res => res.json())
    .then(primaryActivities => this.setState({ primaryActivities }))
  }

  getPopularActivities(){
    fetch('http://localhost:4000/popularactivities')
    .then(res => res.json())
    .then(popularActivities => this.setState({ popularActivities }))
  }

  getPic(){
    return require("assets/img/faces/erik-lucatero-2.jpg");
  }

  getDescription(){
    return "this is some text";
  }

  render() {
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

    return (
      <>
        <AppNavbar />
        <ProfilePageHeader />
        <div className="main">
          <div className="section">
            <Container>
              {/* Recommended for you */}
              <h3>Recommended for you...</h3>
              <Row>
              <Col md="3">
                  <ActivityDetailCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
                        ActivityID='1'
                        favs= {this.state.favs}
                  />
                </Col>
                <Col md="3">
                  <ActivityDetailCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
                        ActivityID='1'
                        favs= {this.state.favs}
                  />
                </Col>
                <Col md="3">
                  <ActivityDetailCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
                        ActivityID='1'
                        favs= {this.state.favs}
                  />
                </Col>
                <Col md="3">
                  <ActivityDetailCard pic={this.getPic()}
                        city= "Paris"
                        country= "France"
                        title="Hiking Trip in the Alps"
                        ActivityID='1'
                        favs= {this.state.favs}
                  />
                </Col>
              </Row>

            <hr/>

            <h3>Popular Activities</h3>
            <Carousel responsive={responsive}
                swipeable={true} draggable={false}
                showDots={false}  ssr={true} // means to render carousel on server-side.
                infinite={true}  autoPlay={false}
                autoPlaySpeed={3000} keyBoardControl={true}
                containerClass=""    renderButtonGroupOutside={false}
                renderDotsOutside={false} removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass=""  itemClass=""  additionalTransfrom={25}   arrows={true}
                className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
                slidesToSlide={4}
                >
                  {this.state.popularActivities.map((data) => {
                  return(
                      <Col key={data.ActivityID}>
                            <ActivityDetailCard title={data.Title}
                            city={data.City}
                            country={data.Country}
                            ActivityID={data.ActivityID}
                            favs= {this.state.favs}
                            pic={require("assets/img/sections/leonard-cotte.jpg")}/>
                      </Col>
                    );
                  })}
                </Carousel>

            <hr/>

              {/* Mood */}
              <Link to="/moods">
                <h3><b>Mood</b> <i className="fa fa-angle-right"/></h3>
              </Link>
                <Carousel responsive={responsive}
                swipeable={true} draggable={false}
                showDots={false}  ssr={true} // means to render carousel on server-side.
                infinite={true}  autoPlay={false}
                autoPlaySpeed={3000} keyBoardControl={true}
                containerClass=""    renderButtonGroupOutside={false}
                renderDotsOutside={false} removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass=""  itemClass=""  additionalTransfrom={25}   arrows={true}
                className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
                slidesToSlide={4}
                >
                  {this.state.moods.map((data) => {
                  return(
                      <Col key={data.TagID}>
                            <MoodCard mood={data.TagName}
                            icon="nc-icon nc-spaceship"
                            TagID={data.TagID}
                            pic={require("assets/img/sections/leonard-cotte.jpg")}/>
                      </Col>
                    );
                  })}
                </Carousel>

              <hr/>

              {/* Activity */}
              <Link to="/activities">
                <h3><b>Activity</b> <i className="fa fa-angle-right"/></h3>
              </Link>
              <Carousel responsive={responsive}
                swipeable={true} draggable={false}
                showDots={false}  ssr={true} // means to render carousel on server-side.
                infinite={true}  autoPlay={false}
                autoPlaySpeed={3000} keyBoardControl={true}
                containerClass=""    renderButtonGroupOutside={false}
                renderDotsOutside={false} removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass=""  itemClass=""  additionalTransfrom={25}   arrows={true}
                className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
                slidesToSlide={4}
                >
                  {this.state.primaryActivities.map((data) => {
                  return(
                      <Col key={data.TagID}>
                            <ActivityCard activity={data.TagName}
                            TagID={data.TagID}
                            pic={require("assets/img/sections/leonard-cotte.jpg")}/>
                      </Col>
                    );
                  })}
                </Carousel>

              <hr/>
              {/* Location */}
              <Link to="/locations">
                <h3><b>Location</b> <i className="fa fa-angle-right"/></h3>
              </Link>
              <Carousel responsive={responsive}
                swipeable={true} draggable={false}
                showDots={false}  ssr={true} // means to render carousel on server-side.
                infinite={true}  autoPlay={false}
                autoPlaySpeed={3000} keyBoardControl={true}
                containerClass=""    renderButtonGroupOutside={false}
                renderDotsOutside={false} removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass=""  itemClass=""  additionalTransfrom={25}   arrows={true}
                className=""  focusOnSelect={true}  minimumTouchDrag={80}  sliderClass=""
                slidesToSlide={4}
                >
                  {this.state.countries.map((data) => {
                  return(
                    <Col key={data.TagID}>
                          <CountryCard country={data.TagName}
                          TagID={data.TagID}
                          pic={require("assets/img/countries/flag-"+ data.TagName.toLowerCase() +".jpg")}/>
                    </Col>
                    );
                  })}
                </Carousel>
              <AppFooter/>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
