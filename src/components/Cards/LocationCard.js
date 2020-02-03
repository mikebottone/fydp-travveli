import React, {Component} from "react";
import { Link } from "react-router-dom";
import constants from "components/constants.js";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  CardImg,
  CardLink,
  Container,
  Row,
  Col,
  UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
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

  getTags(){
      var numbers = [1,2,3,4,5,6];
      var output = numbers.map((index) =>
      <div key={index} className="tags">
      <Badge className="btn-sm" to="/moods" tag={Link}> Tag {index} </Badge>
      </div>
    );
    return(<div className="tag-parent">{output}</div>);
  }

  removeFromList = () => {
    this.setState(state => ({listNum: null}));
  };

  render() {
    return (
      <Card className="app-card">
        {this.state.listNum}
        <Link to="/detailed-activity"> {/* TODO: Pass in link to appropriate page*/}
          <CardImg src={this.props.pic} />
          <CardBody>
            <CardText>{this.props.description}</CardText>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

LocationCard.propTypes = {
  pic: PropTypes.string,
  description: PropTypes.string
};
export default LocationCard;
