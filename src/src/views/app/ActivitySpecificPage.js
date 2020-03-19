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
import AppHeader from "components/Headers/AppHeader";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import ComingSoonCard from "components/Cards/ComingSoonCard";

class ActivitySpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagID: null,
      activityDetails: [],
      favs:[],
      tagDetails: []
    };
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
    this.renderActivityCards = this.renderActivityCards.bind(this);
    this.renderAppHeader = this.renderAppHeader.bind(this);
    this.getTagDetails = this.getTagDetails.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({TagID: this.props.location.state.TagID});
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
              pic={detail.CardImage}
              title={detail.Title}
              city={detail.City}
              country={detail.Country}
              ActivityID={detail.ActivityID}
              favs={this.state.favs}
            />
      </div>
    </Col>
      );
    return( <Row>{output}</Row>);
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
              <h2> {this.props.location.state.secondaryActivity}</h2>
            </Row>

            {this.state.activityDetails.length ? (
                <this.renderActivityCards/>
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
      </>
    );
  }
}

ActivitySpecificPage.propTypes = {
  secondaryActivity: PropTypes.string,
  TagID: PropTypes.number
};

export default ActivitySpecificPage;
