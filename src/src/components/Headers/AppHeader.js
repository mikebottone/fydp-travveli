import React, { Component } from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {Container} from "reactstrap";

class AppHeader extends Component {
  // constructor(props) {
  //   super(props); //always need in a class
  // }
  static defaultProps = {
    title: "",
    pic: require("assets/img/sections/clark-street-mercantile.jpg")
  }
  render(){
    return (
      <>
        <div
          className="page-header page-header-small"
          style={{ backgroundImage:"url(" + this.props.pic + ")" }}
        >
          <div className="content-center">
              <Container>
                <div>
                  <h1><strong>{this.props.title}</strong></h1>
                </div>
              </Container>
            </div>
          <div className="filter" />
        </div>
      </>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
};

export default AppHeader;
