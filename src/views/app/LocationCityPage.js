// clicking on a country card will bring you to this page
//will display cities within the country and activities within the cities

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
import CategoryCard from "components/Cards/CategoryCard";

class LocationCityPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.renderActivityCards = this.renderActivityCards.bind(this);
  }

  renderActivityCards(){
    //displays all activities in a city
    var output = [1,2,3].map((city) =>
      <Col key={city}>
        <div>
          <Link to={{
              pathname: "/detailed-activity",
              state: {
                tag: city
              }
            }}> {/* pass city to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <CategoryCard title={city}/>
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
              <h2> {this.props.location.state.tag}</h2>
            </Row>
            <Row>
              <this.renderActivityCards/>
            </Row>
            <hr/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

LocationCityPage.propTypes = {
  tag: PropTypes.string,
};

export default LocationCityPage;
