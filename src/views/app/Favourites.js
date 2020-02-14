import React, { Component } from "react";
import constants from "components/constants.js";
// reactstrap components
import {
  Container,
  Row
} from "reactstrap";

// core components
import FavouritesCard from "components/Cards/FavouritesCard.js";
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppHeader from "components/Headers/AppHeader.js";

class FavouritesPage extends Component{
  renderList(i){
    var sym = constants.LIST1_SYMBOL;
    if (i===2){
      sym = constants.LIST2_SYMBOL;
    }
    else if (i===3){
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
