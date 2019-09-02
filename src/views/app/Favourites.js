import React, { Component } from "react";
import { Link } from "react-router-dom";
import constants from "components/constants.js";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import FavouritesCard from "components/Cards/FavouritesCard.js";
import AppNavbar from "components/Navbars/AppNavbar.js";
import AboutUsHeader from "components/Headers/AboutUsHeader.js";
import BlogPostHeader from "components/Headers/BlogPostHeader.js";
import EcommerceHeader from "components/Headers/EcommerceHeader.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AppHeader from "components/Headers/AppHeader.js";
import PresentationHeader from "components/Headers/PresentationHeader.js";
import ProductPageHeader from "components/Headers/ProductPageHeader.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import SettingsHeader from "components/Headers/SettingsHeader.js";
import TwitterRedesignHeader from "components/Headers/TwitterRedesignHeader.js";


class FavouritesPage extends Component{
  renderList(i){
    var sym = constants.LIST1_SYMBOL;
    if (i==2){
      sym = constants.LIST2_SYMBOL;
    }
    else if (i==3){
      sym = constants.LIST3_SYMBOL;
    }
    return(
      <>
        <h3>
        List {i} <i className={sym} />
        </h3>
        <Row md="3">
        <FavouritesCard />
        </Row>
        <hr/>
      </>
    );
  }
  render(){
    return (
      <>
        <AppNavbar />
        {/* <AboutUsHeader /> */}
        {/* <BlogPostHeader /> */}
        {/* <EcommerceHeader /> */}
        {/* <IndexHeader /> */}
        {/* <PresentationHeader /> */}
        {/* <ProductPageHeader /> */}
        {/* <ProfilePageHeader /> */}
        {/* <SettingsHeader /> */}
        {/* <TwitterRedesignHeader /> */}
        <AppHeader title="Favourites"/>

          <div className="main">
            <Container>
              {this.renderList(1)}
              {this.renderList(2)}
              {this.renderList(3)}
            </Container>
          </div>

      </>
    );
  }
}
export default FavouritesPage;
