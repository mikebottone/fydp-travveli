//Displayed when user selects a specific mood
//displays the activities associated with that mood

import React, { Component } from "react";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
// reactstrap components
import {
  Container,
  Col,
  Row
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import ComingSoonCard from "components/Cards/ComingSoonCard";
import AppHeader from "components/Headers/AppHeader";

class MoodSpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagID: null,
      activityDetails: [],
      favs: [],
      tagDetails: []
    }
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
    this.renderCards = this.renderCards.bind(this);
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

  renderCards(){
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
              favs= {this.state.favs}
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
             <h2>{this.props.location.state.mood}</h2>

             {this.state.activityDetails.length ? (
              <Row>
                <this.renderCards/>
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
            </Container>
            <AppFooter/>
        </div>
      </>
    );
  }
}

MoodSpecificPage.propTypes = {
  mood: PropTypes.string,
  TagID: PropTypes.number
};

export default MoodSpecificPage;
