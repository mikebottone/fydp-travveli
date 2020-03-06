import React, {Component} from "react";

// reactstrap components
import {
  Card, CardBody,
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
class ComingSoonCard extends Component {
  constructor(props) {
    super(props); //always need in a class
    this.state = {

    }
  }

  render() {
    return (
      <Card
          className="app-card"
          data-background="image"
          style={{
            backgroundImage:"url(" + this.props.pic + ")"
          }}
      >
      <CardBody>

      </CardBody>
      </Card>
    );
  }
}

ComingSoonCard.propTypes = {
  pic: PropTypes.string
};
export default ComingSoonCard;
