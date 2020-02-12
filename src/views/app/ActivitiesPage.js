//Displayed when Activities heading is clicked on homepage
//displays all the different categories of activites (ie. adventurous)

import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import constants from "components/constants.js";
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProductPageHeader from "components/Headers/ProductPageHeader";
import AppFooter from "components/Footers/AppFooter";
import ActivityCard from "components/Cards/ActivityCard";

class ActivitiesPage extends Component{
  constructor(props){
    super(props);
    this.renderActivityCategoryCards = this.renderActivityCategoryCards.bind(this);
  }

  renderActivityCategoryCards(){
    //displays all categories at top of page
    var output = constants.ACTIVITY_CATEGORIES.map((category) =>
      <Col  key={category}>
        <div>
          <Link to={{
              pathname: "/activity-category",
              state: {
                tag: category
              }
            }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <ActivityCard activity={category} pic={require("assets/img/sections/leonard-cotte.jpg")}/>
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
              <h2>Activity Categories</h2>
              <this.renderActivityCategoryCards/>
            </Row>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default ActivitiesPage;
