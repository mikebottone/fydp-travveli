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
    this.state = {
      TagID: null,
      activityDetails: []
    };
    this.renderActivityCards = this.renderActivityCards.bind(this);
    this.fetchActivityDetails = this.fetchActivityDetails.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.setState({TagID: this.props.location.state.TagID});
    this.fetchActivityDetails();
  }

  fetchActivityDetails(){
    fetch('http://localhost:4000/activity-details?TagID='+ this.props.location.state.TagID)
    .then(res => res.json())
    .then(activityDetails => this.setState({ activityDetails }))
  }

  renderActivityCards(){
    //displays all detailed activity cards
    var output = this.state.activityDetails.map((detail) =>
    <Col md="3" key={detail.ActivityID}>
            <ActivityDetailCard
              pic={require("assets/img/placeholder.jpg")}
              title={detail.Title}
              city={detail.City}
              country={detail.Country}
              ActivityID={detail.ActivityID}
            />;
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
  TagID: PropTypes.string
};

export default LocationCityPage;
