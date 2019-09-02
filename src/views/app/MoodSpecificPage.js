//Displayed when user selects a specific mood
//displays the activities associated with that mood

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  CardImg,
  CardLink,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import FullPicCard from "components/Cards/FullPicCard";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import AppFooter from "components/Footers/AppFooter";

class MoodSpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  renderCards(){
    return <FullPicCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />;
  }

 render(){
    return (
      <>
        <AppNavbar />
        <ProfilePageHeader/>
        <div className="main">
          <div className="section">
            <Container>
             <h3>{this.props.location.state.tag}</h3>
              <this.renderCards/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

MoodSpecificPage.propTypes = {
  tag: PropTypes.string,
};

export default MoodSpecificPage;
