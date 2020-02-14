//Final landing page in the flow that has a detailed description of a specific activity

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
  Badge
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import DetailedActivityHeader from "components/Headers/DetailedActivityHeader.js";
import DetailedActivityCarousel from "components/Carousels/DetailedActivityCarousel";

class DetailedActivityPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.getTags = this.getTags.bind(this);
    this.getPics = this.getPics.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getDurationAndTravelPeriod = this.getDurationAndTravelPeriod.bind(this);
  }

  getDescription(){
    return <div>
            <h3>Some title of the activity</h3>
            <p>A few sentences that talk about the activity.
            A few sentences that talk about the activity.
            A few sentences that talk about the activity.
            A few sentences that talk about the activity.
            </p>
          </div>
  }

  getDurationAndTravelPeriod(){
    return <div className="durationBox">
      <div>
        <i className="fa fa-hourglass-half"/> <strong>Duration:</strong>
        <p>*from db*</p>
      </div>
      <div>
        <i className="fa fa-calendar"/> <strong>Ideal Travel Period:</strong>
        <p>*from db*</p>
      </div>
    </div>
  }

  getPics(){
    return(
    <Row>
      <Col md="3" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={require("assets/img/sections/pavel-kosov.jpg")}
          />
        </Card>
      </Col>
      <Col md="5" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={require("assets/img/sections/pavel-kosov.jpg")}
          />
        </Card>
      </Col>
      <Col md="4" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={require("assets/img/sections/pavel-kosov.jpg")}
          />
        </Card>
      </Col>
    </Row>
    );
  }

  getTags(){
    var testTag = ["Monument","Rome","Italy","Family-friendly","Walking","Historical"];
      var output = testTag.map((index) =>
      <div key={index} className="tags">
      <Badge className="btn-round mr-1 btn btn-outline-default"> {index} </Badge>
      </div>
      );
      return(<div className="tag-parent">{output}</div>);
  }

  render(){
    return (
      <>
        <AppNavbar />
        <DetailedActivityHeader pic={require("assets/img/faces/erik-lucatero-2.jpg")}
            activity="Name of Activity"
            city="City Name"
            country="Country"
        />
        <div className="main">
          <div className="section">
            <Container>
              <Row>
                <div className="leftCol">
                {this.getTags()}
                <this.getDescription/>
                </div>
                <div className="rightCol">
                {this.getDurationAndTravelPeriod()}
                </div>
              </Row>
              <Row>
              <DetailedActivityCarousel
                pic1={require("assets/img/sections/pedro-lastra.jpg")}
                pic2={require("assets/img/sections/fabio-mangione.jpg")}
                pic3={require("assets/img/cover.jpg")}
              />
              </Row>
                {this.getPics()}
            </Container>
          <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

DetailedActivityPage.propTypes = {
  tag: PropTypes.string,
};

export default DetailedActivityPage;
