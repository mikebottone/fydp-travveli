//Displayed when Activities heading is clicked on homepage
//displays all the different categories of activites (ie. adventurous)

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
import ActivityCard from "components/Cards/ActivityCard";

class ActivitiesPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      primaryActivities: []
    }
    this.renderActivityCategoryCards = this.renderActivityCategoryCards.bind(this);
    this.getPrimaryActivities = this.getPrimaryActivities.bind(this);
  }

  componentDidMount(){
    this.getPrimaryActivities();
  }

  getPrimaryActivities(){
    fetch('/primaryactivities')
    .then(res => res.json())
    .then(primaryActivities => this.setState({ primaryActivities }))
  }

  renderActivityCategoryCards(){
    //displays all categories at top of page
    var output = this.state.primaryActivities.map((primaryActivity) =>
      <Col md="3" key={primaryActivity.TagID}>
        <div>
            <ActivityCard activity={primaryActivity.TagName}
             TagID={primaryActivity.TagID}
             pic={require("assets/TagImages/Cities and Countries/"+ primaryActivity.TagID +"/Card.jpg")}/>
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
            <Container>
            <Row>
              <h2>Activity Categories</h2>
              <this.renderActivityCategoryCards/>
            </Row>
            </Container>
            <AppFooter/>
        </div>
      </>
    );
  }
}
export default ActivitiesPage;
