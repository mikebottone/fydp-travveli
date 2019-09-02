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
import CategoryCard from "components/Cards/CategoryCard.js";
import AppCard from "components/Cards/AppCard";
import FullPicCard from "components/Cards/FullPicCard";
import AppFooter from "components/Footers/AppFooter";
import constants from "components/constants.js";


class MoodsPage extends Component{
  constructor(props){
    super(props);
    this.getMoodCards = this.getMoodCards.bind(this);
    this.renderMoodsList = this.renderMoodsList.bind(this);
    this.renderMoodCategoryCards = this.renderMoodCategoryCards.bind(this);
  }

  getMoodCards(){
    return <Row>
            <Col>
            <FullPicCard
            pic={require("assets/img/sections/leonard-cotte.jpg")}
            description={"words words words"}
            />
            </Col>
            <Col>
            <FullPicCard
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

  renderMoodCategoryCards(){
      var output = constants.MOODS.map((mood) =>
      <Col  key={mood}>
        <div>
          <Link to={{
              pathname: "/mood-specific",
              state: {
                tag: mood
              }
            }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}

            <CategoryCard title={mood}/>
          </Link>
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderMoodsList(){
    var output = constants.MOODS.map((mood) =>
      <div key={mood}>
        <Link to={{
            pathname: "/mood-specific",
            state: {
              tag: mood
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{mood}</h4>
        </Link>
        {this.getMoodCards()}
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
              <h2>Mood Categories</h2>
             <this.renderMoodCategoryCards/>
            </Row>
            <hr/>
              <this.renderMoodsList/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}
export default MoodsPage;
