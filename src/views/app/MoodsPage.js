// Displayed when Mood heading is clicked on homepage
//lists all the mood types

import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import constants from "components/constants.js";
import MoodCard from "components/Cards/MoodCard";


class MoodsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      moods:[]
    }
    this.getMoods = this.getMoods.bind(this);
    this. renderMoodCategoryCards = this.renderMoodCategoryCards.bind(this);
  }

  componentDidMount(){
    this.getMoods();
  }
 getMoods(){
  fetch('http://localhost:4000/moods')
  .then(res => res.json())
  .then(moods => this.setState({ moods }))
 }


  renderMoodCategoryCards(){
      var output = this.state.moods.map((moods) =>
      <Col md="3" key={moods.TagID}>
        <div>
            <MoodCard pic={require("assets/img/faces/erik-lucatero-2.jpg")}
            mood={moods.TagName}
            TagID={moods.TagID}
            icon="nc-icon nc-spaceship"/>
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
              <h2>Mood Categories</h2>
             <this.renderMoodCategoryCards/>
            </Row>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default MoodsPage;
