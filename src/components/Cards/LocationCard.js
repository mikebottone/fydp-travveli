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
    this.state = {
      listNum: null
    }
  }

  addtoList1 = () => {
    this.setState(state => ({listNum: 1}));
  };

  addtoList2 = () => {
    this.setState(state => ({listNum: 2}));
  };

  addtoList3 = () => {
    this.setState(state => ({listNum: 3}));
  };

  removeFromList = () => {
    this.setState(state => ({listNum: null}));
  };

  render() {
    return (
      <Card className="app-card">
        {this.state.listNum}
        <Link to={{
              pathname: "/city",
              state: {
                tag: this.props.city
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
  city: PropTypes.string
};
export default LocationCard;
