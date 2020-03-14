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
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import AppHeader from "components/Headers/AppHeader";
import ComingSoonCard from "components/Cards/ComingSoonCard";

class LocationCityPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagID: null,
      activityDetails: [],
      favs: []
    };
    this.renderActivityCards = this.renderActivityCards.bind(this);
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({TagID: this.props.location.state.TagID});
    this.getFavourites();
    this.fetchActivityDetails();
  }

  getFavourites(){
    fetch('/check-favs?UserID=' + jwt_decode(localStorage.usertoken).UserID)
    .then(res => res.json())
    .then(favs => this.setState({favs}))
  }

  fetchActivityDetails(){
    fetch('/activity-details?TagID='+ this.props.location.state.TagID)
    .then(res => res.json())
    .then(activityDetails => this.setState({ activityDetails }))
  }

  renderActivityCards(){
    //displays all detailed activity cards
    var output = this.state.activityDetails.map((detail) =>
    <Col md="3" key={detail.ActivityID}>
            <ActivityDetailCard
              pic={detail.CardImage}
              title={detail.Title}
              city={detail.City}
              country={detail.Country}
              ActivityID={detail.ActivityID}
              favs={this.state.favs}
            />;
    </Col>
      );
    return( <Row>{output}</Row>);
  }

  render(){
    return (
      <>
        <AppNavbar />
        <AppHeader
          title={this.props.location.state.city}
        />
        <div className="main">
            <Container>
            <Row>
              <h2> {this.props.location.state.city}</h2>
              {this.props.location.state.description}
            </Row>
            {this.state.activityDetails.length ?
            (<Row>
              <this.renderActivityCards/>
            </Row>)
            :
            (
              <Row>
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
              </Row>
            )
            }


            <hr/>
            </Container>
            <AppFooter/>
        </div>
      </>
    );
  }
}

LocationCityPage.propTypes = {
  city: PropTypes.string,
  TagID: PropTypes.string,
  description: PropTypes.string
};

export default LocationCityPage;
