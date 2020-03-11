//Displayed when a specific activity is selected (ie. hiking)
//displays all the specific activity (ie. all hiking) activities

import React, { Component } from "react";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
// reactstrap components
import {
  Container,
  Col,
  Row,

} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import ProductPageHeader from "components/Headers/ProductPageHeader";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import ComingSoonCard from "components/Cards/ComingSoonCard";

class ActivitySpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagID: null,
      activityDetails: [],
      favs:[]
    };
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
    this.renderActivityCards = this.renderActivityCards.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({TagID: this.props.location.state.TagID});
    this.fetchActivityDetails();
    this.getFavourites();
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
      <div>
            <ActivityDetailCard
              pic={require("assets/img/placeholder.jpg")}
              title={detail.Title}
              city={detail.City}
              country={detail.Country}
              ActivityID={detail.ActivityID}
              favs={this.state.favs}
            />;
      </div>
    </Col>
      );
    return( <Row>{output}</Row>);
  }

  render(){
    return (
      <>
        <AppNavbar />
        <ProductPageHeader/>
        <div className="main">
          <div className="section">
            <Container>
            <Row>
              <h2> {this.props.location.state.secondaryActivity}</h2>
            </Row>

            {this.state.activityDetails.length ? (
              <Row>
                <this.renderActivityCards/>
              </Row>
            ) : (
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
        </div>
      </>
    );
  }
}

ActivitySpecificPage.propTypes = {
  secondaryActivity: PropTypes.string,
  TagID: PropTypes.number
};

export default ActivitySpecificPage;
