//Displayed when user selects a specific mood
//displays the activities associated with that mood

import React, { Component } from "react";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import AppFooter from "components/Footers/AppFooter";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class MoodSpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  renderCards(){
    return <ActivityDetailCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            title={"words words words"}
            city={"Paris"}
            country={"France"}
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
             <h3>{this.props.location.state.mood}</h3>
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
  mood: PropTypes.string,
};

export default MoodSpecificPage;
