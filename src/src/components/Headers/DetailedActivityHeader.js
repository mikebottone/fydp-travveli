import React, { Component } from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {Container} from "reactstrap";

class DetailedActivityHeader extends Component {
  // constructor(props) {
  //   super(props); //always need in a class
  // }
  static defaultProps = {
    activity: "Coming Soon",
    pic: require("assets/img/sections/rawpixel-comm.jpg"),
    city:"Coming",
    country:"Soon"
  }
  render(){
    return (
      <>
        <div
          className="page-header page-header-small"
          style={{ backgroundImage:"url(" + this.props.pic + ")" }}
        >
          <div className="d-activity-header">
              <Container>
                <div className="d-activity-header">
                  <h1>{this.props.activity}</h1>
                  <h3>{this.props.city}, {this.props.country}</h3>
                </div>
              </Container>
            </div>
          <div className="filter" />
        </div>
      </>
    );
  }
}

DetailedActivityHeader.propTypes = {
  activity: PropTypes.string,
  pic: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string
};

export default DetailedActivityHeader;
