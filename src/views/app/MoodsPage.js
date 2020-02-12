// Displayed when Mood heading is clicked on homepage
//lists all the mood types

import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProductPageHeader from "components/Headers/ProductPageHeader";
import AppFooter from "components/Footers/AppFooter";
import constants from "components/constants.js";
import MoodCard from "components/Cards/MoodCard";


class MoodsPage extends Component{
  constructor(props){
    super(props);
    this.renderMoodCategoryCards = this.renderMoodCategoryCards.bind(this);
  }

  renderMoodCategoryCards(){
      var output = constants.MOODS.map((mood) =>
      <Col  key={mood}>
        <div>
          <Link to={{
              pathname: "/mood-specific",
              state: {
                tag: mood
              }
            }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <MoodCard pic={require("assets/img/faces/erik-lucatero-2.jpg")} mood={mood}  icon="nc-icon nc-spaceship"/>
          </Link>
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
              <h2>Mood Categories</h2>
             <this.renderMoodCategoryCards/>
            </Row>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default MoodsPage;
