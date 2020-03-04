//Displayed when a specific activity is selected (ie. hiking)
//displays all the specific activity (ie. all hiking) activities

import React, { Component } from "react";
import PropTypes from 'prop-types';
// reactstrap components
import {
  Container,
  Col,
  Row,

} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import ProductPageHeader from "components/Headers/ProductPageHeader";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class ActivitySpecificPage extends Component{
  constructor(props){
    super(props);
    this.state = {};
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
              <h2> {this.props.location.state.secondaryActivity}</h2>
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

ActivitySpecificPage.propTypes = {
  secondaryActivity: PropTypes.string,
  TagID: PropTypes.number
};

export default ActivitySpecificPage;
