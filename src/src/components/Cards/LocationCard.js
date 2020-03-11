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
//Used on the locations page to display the country
class LocationCard extends Component {
  constructor(props) {
    super(props); //always need in a class
    this.state = {}
  }

  render() {
    return (
      <Card className="app-card">
        <Link to={{
              pathname: "/city",
              state: {
                city: this.props.city,
                TagID: this.props.TagID
              }
            }}> {/* TODO: Pass in link to appropriate page*/}
          <CardImg src={this.props.pic} />
          <CardBody className="card-location">
            <CardText>
              <h4>{this.props.city}, <br/> {this.props.country}</h4>
            </CardText>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

LocationCard.propTypes = {
  pic: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  TagID: PropTypes.number
};
export default LocationCard;
