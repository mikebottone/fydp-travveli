import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
// reactstrap components
import {
  Container, Row, Col, Button, Badge, Card, CardHeader
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppHeader from "components/Headers/AppHeader.js";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import AppFooter from "components/Footers/AppFooter";

class FavouritesPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      UserID: null,
      FirstName: null,
      favourites: [],
      favMoods: [],
      favActivities: [],
      favCountries: [],
      favCities: []
    }
    this.fetchTopMoods = this.fetchTopMoods.bind(this);
    this.fetchTopActivities = this.fetchTopActivities.bind(this);
    this.fetchTopCountries = this.fetchTopCountries.bind(this);
    this.fetchTopCities = this.fetchTopCities.bind(this);
    this.fetchUserFavourites = this.fetchUserFavourites.bind(this);
    this.getTopMoods = this.getTopMoods.bind(this);
    this.getTopActivities = this.getTopActivities.bind(this);
    this.getTopCountries = this.getTopCountries.bind(this);
    this.getTopCities = this.getTopCities.bind(this);
    this.getDetailedActivityCards = this.getDetailedActivityCards.bind(this);
  }
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      UserID: decoded.UserID,
      FirstName: decoded.FirstName
    })
    this.fetchTopMoods();
    this.fetchTopActivities();
    this.fetchTopCountries();
    this.fetchTopCities();
    this.fetchUserFavourites();
  }

  fetchTopMoods(){
    fetch('/fav-moods?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favMoods => this.setState({ favMoods }))
  }

  fetchTopActivities(){
    fetch('/fav-secondary-activities?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favActivities => this.setState({ favActivities }))
  }

  fetchTopCountries(){
    fetch('/fav-countries?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favCountries => this.setState({ favCountries }))
  }

  fetchTopCities(){
    fetch('/fav-cities?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favCities => this.setState({ favCities }))
  }

  fetchUserFavourites(){
    fetch('/favourites-details?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favourites => this.setState({ favourites }))
  }

  getTopMoods(){
    var output = this.state.favMoods.map((mood, index) =>
      <Row key={mood.TagID}>
        {mood.TagName !== null ? (
          <Badge className="mr-1 badge badge-secondary badge-pill">{index+1 + ". " +  mood.TagName}</Badge>
        ):(
          <span></span>
        )}
      </Row>
       );
      return( <Col>{output}</Col>);
  }
  getTopActivities(){
    var output = this.state.favActivities.map((activity, index) =>
      <Row key={activity.TagID}>
        {activity.TagName !== null ? (
          <Badge className="mr-1 badge badge-secondary badge-pill">{index+1 + ". " +  activity.TagName}</Badge>
        ):(
          <span></span>
        )}
      </Row>
       );
      return( <Col>{output}</Col>);
  }
  getTopCountries(){
    var output = this.state.favCountries.map((country,index) =>
      <Row key={country.TagID}>
        {country.TagName !== null ? (
         <Badge className="mr-1 badge badge-secondary badge-pill">{index+1 + ". " +  country.TagName}</Badge>
        ):(
          <span></span>
        )}
      </Row>
       );
      return( <Col>{output}</Col>);
  }
  getTopCities(){
    var output = this.state.favCities.map((city, index) =>
      <Row key={city.TagID}>
        {city.TagName !== null ? (
          <Badge className="mr-1 badge badge-secondary badge-pill">{index+1 + ". " +  city.TagName}</Badge>
        ):(
          <span></span>
        )}
      </Row>
       );
      return( <Col>{output}</Col>);
  }

  getDetailedActivityCards(){
    //displays all favourites
    var output = this.state.favourites.map((favourite) =>
      <Col md="3" key={favourite.ActivityID}>
        <div>
            <ActivityDetailCard
            ActivityID = {favourite.ActivityID}
            city = {favourite.City}
            country = {favourite.Country}
            title = {favourite.Title}
            favs = {this.state.favourites}
            pic={require("assets/img/countries/flag-"+ favourite.Country.toLowerCase() +".jpg")}/>
        </div>
      </Col>
    )
    return( <Row>{output}</Row>);
  }

  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader title="Favourites"/>
          <div className="main">
            <Container>
              <Row>
              {this.state.FirstName !== null ?
                  (<h2>{this.state.FirstName}'s Top Favourites</h2>)
                  :
                  (<h3>Your Top Favourites</h3>)}
              </Row>
              <Row>
                <Col>
                <Card>
                  <CardHeader className="top-favs">
                    <h4>Top Moods</h4>
                    <this.getTopMoods />
                  </CardHeader>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardHeader className="top-favs">
                    <h4>Top Activities</h4>
                    <this.getTopActivities />
                  </CardHeader>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardHeader className="top-favs">
                    <h4>Top Countries</h4>
                    <this.getTopCountries />
                  </CardHeader>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardHeader className="top-favs">
                    <h4>Top Cities</h4>
                    <this.getTopCities />
                  </CardHeader>
                </Card>
                </Col>
              </Row>
              <Row>
                  {this.state.FirstName !== null ?
                  (<h3>{this.state.FirstName}'s Favourited Activities</h3>)
                  :
                  (<h3>Your Favourited Activities</h3>)}
              </Row>
              {this.state.favourites.length ?
              (<this.getDetailedActivityCards/>)
              :
              (<Col><h4>You currently have no favourited activities. <br/>
                To add to your favourites, click
                the <Button className="btn-just-icon btn-sm btn-danger heart-btn-right">
                <i className="fa fa-heart" />
                </Button> button on the activities you are interested in.</h4></Col>)}
            <AppFooter />
            </Container>
          </div>

      </>
    );
  }
}
export default FavouritesPage;
