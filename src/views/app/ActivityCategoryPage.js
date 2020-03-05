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
import AppFooter from "components/Footers/AppFooter";
import ActivityCategoryCard from "components/Cards/ActivityCategoryCard";
import ActivityDetailCard from "components/Cards/ActivityDetailCard";

class ActivityCategoryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      primaryActivity: "", //primary activity name
      TagID: null, //primary activity ID
      secondaryActivities:[]
    };
    this.getSecondaryCategoryCards = this.getSecondaryCategoryCards.bind(this);
    this.renderSecondaryActivityCategoriesList = this.renderSecondaryActivityCategoriesList.bind(this);
    this.renderSecondaryActivityCategoryCards = this.renderSecondaryActivityCategoryCards.bind(this);
    this.fetchSecondaryActivitiesFromDB = this.fetchSecondaryActivitiesFromDB.bind(this);
  }

  componentDidMount(){
    this.setState({TagID: this.props.location.state.TagID})
    this.setState({primaryActivity: this.props.location.state.primaryActivity})
    window.scrollTo(0,0);
    this.fetchSecondaryActivitiesFromDB();
  }

  fetchSecondaryActivitiesFromDB(){
    //gets the secondary activity category of the primary activity from the DB
    fetch('http://localhost:4000/secondary-level?TagID='+this.props.location.state.TagID)
    .then(res => res.json())
    .then(secondaryActivities => this.setState({ secondaryActivities }))
  }

  renderSecondaryActivityCategoryCards(){
    //displays all secondary categories at top of page
    var output = this.state.secondaryActivities.map((secondaryActivity) =>
      <Col md="3" key={secondaryActivity.TagID}>
        <div>
          <ActivityCategoryCard activity={secondaryActivity.TagName}
            TagID={secondaryActivity.TagID}
            pic={require("assets/img/faces/erik-lucatero-2.jpg")}
          />
        </div>
      </Col>
       );
      return( <Row>{output}</Row>);
  }

  renderSecondaryActivityCategoriesList(){
    //Links with each secondary category
    var output = this.state.secondaryActivities.map((secondaryActivity) =>
      <div key={secondaryActivity.TagID}>
        <Link to={{
            pathname: "/activity-specific",
            state: {
              secondaryActivity: secondaryActivity.TagName,
              TagID: secondaryActivity.TagID
            }
          }}> {/* TODO: Pass mood to linked page: https://www.youtube.com/watch?v=nmbX2QL7ZJc */}
          <h4>{secondaryActivity.TagName}</h4>
        </Link>
        {this.getSecondaryCategoryCards()}
      </div>
       );
      return( <div>{output}</div>);
  }

  getSecondaryCategoryCards(){
    return <Row>
            <Col>
            <ActivityDetailCard
              pic={require("assets/img/sections/leonard-cotte.jpg")}
              title={"words words words"}
              city="Rome"
              country="Italy"
            />
            </Col>
            <Col>
            <ActivityDetailCard
              pic={require("assets/img/sections/leonard-cotte.jpg")}
              title={"words words words"}
              city="Rome"
              country="Italy"
            />
            </Col>
            <Col>
              <ActivityDetailCard
                pic={require("assets/img/faces/erik-lucatero-2.jpg")}
                title={"Some text"}
                city="Rome"
                country="Italy"
              />
            </Col>
          </Row>;
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
              <h2>{this.props.location.state.primaryActivity} Categories</h2>
              <this.renderSecondaryActivityCategoryCards/>
            </Row>
            <hr/>
              <this.renderSecondaryActivityCategoriesList/>
            </Container>
            <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

ActivityCategoryPage.propTypes = {
  primaryActivity: PropTypes.string,
  TagID: PropTypes.number
};

export default ActivityCategoryPage;
