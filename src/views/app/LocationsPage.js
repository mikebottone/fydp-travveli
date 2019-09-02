//Displayed when the Location heading is clicked on the homepage
//displays countries and cities maybe

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
import AppCard from "components/Cards/AppCard";
import AppFooter from "components/Footers/AppFooter";
import CategoryCard from "components/Cards/CategoryCard";

class LocationsPage extends Component{
  constructor(props){
    super(props);
    this.getCountryCards = this.getCountryCards.bind(this);
    this.renderCountryList = this.renderCountryList.bind(this);
    this.renderCountryCards = this.renderCountryCards.bind(this);
  }

  getCountryCards(){
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
  renderCountryCards(){
    //displays all categories at top of page
    var output = constants.COUNTRIES.map((country) =>
      <Col  key={country}>
        <div>
          <Link to={{
              pathname: "/country",
              state: {
                tag: country
              }
            }}> {/* passes country to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <CategoryCard title={country} pic={require("assets/img/countries/flag-"+ country.toLowerCase() +".jpg")}/>
          </Link>
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderCountryList(){

    var output = constants.COUNTRIES.map((category) =>
      <div key={category}>
        <Link to={{
            pathname: "/country",
            state: {
              tag: category
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{category}</h4>
        </Link>
        {this.getCountryCards()}
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
              <h2>Countries</h2>
              <this.renderCountryCards/>
            </Row>
            <hr/>
              <this.renderCountryList/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default LocationsPage;
