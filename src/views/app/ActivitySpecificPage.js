//Displayed when a specific activity is selected (ie. hiking)
//displays all the specific activity (ie. all hiking) activities

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";

class ActivitySpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <>
        <AppNavbar />
        <div className="main">
          <div className="section">
            <Container>

            </Container>
          <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

ActivitySpecificPage.propTypes = {
  tag: PropTypes.string,
};

export default ActivitySpecificPage;
