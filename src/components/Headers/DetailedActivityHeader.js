import React, { Component } from "react";
import PropTypes from 'prop-types';

// reactstrap components
import {Container} from "reactstrap";

class DetailedActivityHeader extends Component {
  constructor(props) {
    super(props); //always need in a class
  }
  static defaultProps = {
    title: "",
    pic: require("assets/img/rihanna_cover.jpg")
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

DetailedActivityHeader.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
};

export default DetailedActivityHeader;
