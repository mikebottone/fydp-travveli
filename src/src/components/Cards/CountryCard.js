import React, {Component} from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  CardText,
  CardImg
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
//Used on the locations page to display the country and like to country page only
class CountryCard extends Component {
  constructor(props) {
    super(props); //always need in a class
    this.state = {}
  }

  render() {
    return (
      <Card className="app-card">
        <Link to={{
              pathname: "/country",
              state: {
                TagID: this.props.TagID,
                country: this.props.country
              }
            }}>
          <CardImg src={this.props.pic} />
          <CardBody className="card-location">
            <CardText>
              <h4>{this.props.country}</h4>
            </CardText>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

CountryCard.propTypes = {
  pic: PropTypes.string,
  TagID: PropTypes.number,
  country: PropTypes.string
};
export default CountryCard;
