//Displayed when the Location heading is clicked on the homepage
//displays countries and cities maybe

import React, { Component } from "react";
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
import CountryCard from "components/Cards/CountryCard";

class LocationsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      countries: []
    }
    this.renderCountryCards = this.renderCountryCards.bind(this);
  }
  componentDidMount() {
    this.getCountries();
  }

  getCountries(){
    fetch('http://localhost:4000/countries')
    .then(res => res.json())
    .then(countries => this.setState({ countries }))
  }
  renderCountryCards(){
    //displays all countries
    var output = this.state.countries.map((country) =>
      <Col  key={country.TagID}>
        <div>
            <CountryCard
            TagID = {country.TagID}
            TagName = {country.TagName}
            pic={require("assets/img/countries/flag-"+ country.TagName.toLowerCase() +".jpg")}/>
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
              <h2>Countries</h2>
              <this.renderCountryCards/>
            </Row>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default LocationsPage;
