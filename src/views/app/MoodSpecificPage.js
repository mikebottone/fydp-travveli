//Displayed when user selects a specific mood
//displays the activities associated with that mood

import React, { Component } from "react";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container,
  Col,
  Row
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";
import ComingSoonCard from "components/Cards/ComingSoonCard";

class MoodSpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      TagID: null,
      activityDetails: []
    }
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({TagID: this.props.location.state.TagID});
    this.fetchActivityDetails();
  }

  fetchActivityDetails(){
    fetch('http://localhost:4000/activity-details?TagID='+ this.props.location.state.TagID)
    .then(res => res.json())
    .then(activityDetails => this.setState({ activityDetails }))
  }

  renderCards(){
     //displays all detailed activity cards
     var output = this.state.activityDetails.map((detail) =>
     <Col md="3" key={detail.ActivityID}>
       <div>
            <ActivityDetailCard
              pic={require("assets/img/placeholder.jpg")}
              title={detail.Title}
              city={detail.City}
              country={detail.Country}
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
        <ProfilePageHeader/>
        <div className="main">
          <div className="section">
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
