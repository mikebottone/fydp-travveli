//Final landing page in the flow that has a detailed description of a specific activity

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container,
  Row,
  Card,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  Col,
  Badge
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import DetailedActivityHeader from "components/Headers/DetailedActivityHeader.js";
import DetailedActivityCarousel from "components/DetailedActivityCarousel";

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
        <i className="fa fa-hourglass-half"/> <strong>Duration:</strong> *from db*
      </div>
      <div>
        <i className="fa fa-calendar"/> <strong>Ideal Travel Period:</strong> *from db*
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
    </Row>
    );
  }

  getTags(){
    var numbers = [1,2,3,4,5,6,7,8,9,10];
      var output = numbers.map((index) =>
      <div key={index} className="tags">
      <Badge className="btn-lg"> Tag {index} </Badge>
      </div>
      );
      return(<div className="tag-parent">{output}</div>);
  }

  render(){
    return (
      <>
        <AppNavbar />
        <DetailedActivityHeader/>
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
              <DetailedActivityCarousel/>
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
