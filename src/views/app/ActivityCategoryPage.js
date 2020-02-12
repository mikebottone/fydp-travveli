//displayed when an activity category is selected (ie. adventurous)
//displays the specific activity categories with associated activities (ie. hiking)

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
import ProductPageHeader from "components/Headers/ProductPageHeader";
import AppFooter from "components/Footers/AppFooter";
import constants from "components/constants";
import ActivityCategoryCard from "components/Cards/ActivityCategoryCard";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class ActivityCategoryPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.getCategoryCards = this.getCategoryCards.bind(this);
    this.renderActivityCategoriesList = this.renderActivityCategoriesList.bind(this);
  }

  getCategoryCards(){
    return <Row>
            <Col>
            <ActivityDetailCard
              pic={require("assets/img/sections/leonard-cotte.jpg")}
              detail={"words words words"}
              city="Rome"
              country="Italy"
            />
            </Col>
            <Col>
            <ActivityDetailCard
              pic={require("assets/img/sections/leonard-cotte.jpg")}
              detail={"words words words"}
              city="Rome"
              country="Italy"
            />
            </Col>
            <Col>
              <ActivityDetailCard
                pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                detail={"Some text"}
                city="Rome"
                country="Italy"
              />
            </Col>
          </Row>;
  }
  renderActivityCategoryCards(){
    //TODO: fetch the correct 2nd level categories
    //displays all categories at top of page
    var output = constants.ACTIVITY_CATEGORIES.map((category) =>
      <Col key={category}>
        <div>
          <Link to={{
              pathname: "/activity-specific",
              state: {
                tag: category
              }
            }}> {/*Passes category to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

              <ActivityCategoryCard activity={category}
              pic={require("assets/img/faces/erik-lucatero-2.jpg")}
            />
          </Link>
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderActivityCategoriesList(){
    //TODO: get the correct 2nd level activity categories
    var output = constants.ACTIVITY_CATEGORIES.map((category) =>
      <div key={category}>
        <Link to={{
            pathname: "/activity-category",
            state: {
              tag: category
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{category}</h4>
        </Link>
        {this.getCategoryCards()}
      </div>
       );
      return( <div>{output}</div>);
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
              <h2>{this.props.location.state.tag} Categories</h2>
              {/* <this.renderActivityCategoryCards/> */}
            </Row>
            <hr/>
              {/* <this.renderActivityCategoriesList/> */}
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

ActivityCategoryPage.propTypes = {
  tag: PropTypes.string,
};

export default ActivityCategoryPage;
