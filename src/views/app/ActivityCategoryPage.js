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
import AppCard from "components/Cards/AppCard";
import FullPicCard from "components/Cards/FullPicCard";
import AppFooter from "components/Footers/AppFooter";
import CategoryCard from "components/Cards/CategoryCard";
import constants from "components/constants";

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
            <CategoryCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />
            </Col>
            <Col>
            <CategoryCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />
            </Col>
            <Col>
            <AppCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                      description={"Some text"}/>
            </Col>
          </Row>;
  }
  renderActivityCategoryCards(){
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

            <CategoryCard title={category}/>
          </Link>
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderActivityCategoriesList(){
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
