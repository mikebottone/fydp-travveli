// clicking on a country card will bring you to this page
//will display cities within the country and activities within the cities

import React, { Component } from "react";
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
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class LocationCityPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.renderActivityCards = this.renderActivityCards.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
  }

  renderActivityCards(){
    //displays all activities in a city
    var output = [1,2,3].map((city) =>
      <Col key={city}>
        <div>
            <ActivityDetailCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                        city= {city}
                        country= "France"
                        detail="Hiking Trip in the Alps"
              />
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
              <h2> {this.props.location.state.city}</h2>
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
  city: PropTypes.string,
};

export default LocationCityPage;
