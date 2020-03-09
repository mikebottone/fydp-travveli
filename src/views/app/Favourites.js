import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
// reactstrap components
import {
  Container, Row, Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppHeader from "components/Headers/AppHeader.js";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class FavouritesPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      UserID: null,
      FirstName: null,
      favourites: []
    }
    this.fetchUserFavourites = this.fetchUserFavourites.bind(this);
    this.getDetailedActivityCards = this.getDetailedActivityCards.bind(this);
  }
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      UserID: decoded.UserID,
      FirstName: decoded.FirstName
    })
    this.fetchUserFavourites()
  }

  fetchUserFavourites(){
    fetch('http://localhost:4000/favourites-details?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favourites => this.setState({ favourites }))
  }

  getDetailedActivityCards(){
    //displays all favourites
    var output = this.state.favourites.map((favourite) =>
      <Col md="3" key={favourite.ActivityID}>
        <div>
            <ActivityDetailCard
            ActivityID = {favourite.TagID}
            city = {favourite.City}
            country = {favourite.Country}
            title = {favourite.Title}
            pic={require("assets/img/countries/flag-"+ favourite.Country.toLowerCase() +".jpg")}/>
        </div>
      </Col>
       );
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
                  (<h3>{this.state.FirstName}'s Favourited Activities</h3>)
                  :
                  (<h3>Your Favourited Activities</h3>)}
              </Row>
              <this.getDetailedActivityCards/>
            </Container>
          </div>

      </>
    );
  }
}
export default FavouritesPage;
