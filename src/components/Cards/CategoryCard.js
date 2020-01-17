//used to link the different categories of mood, activity, and location

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
class CategoryCard extends Component {
  constructor(props) {
    super(props); //always need in a class
  }
  static defaultProps = {
    title: "CardTitle",
    description: "words, words, words",
    pic: require("assets/img/faces/erik-lucatero-2.jpg")
  }

  getTags(){
      var numbers = [1,2,3,4,5,6,7,8,9,0];
      var output = numbers.map((index) =>
       <div key={index} className="tags">
          <Badge className="btn-sm" to="/moods" tag={Link}> Tag {index} </Badge>
        </div>
       );
      return(<div className="category-tags">{output}</div>);
  }

  render() {
    return (
      <Card className="app-card"
        data-background="image"
        style={{
          backgroundImage:"url(" + this.props.pic + ")"
        }}>
         {/*<Link to="/locations"> TODO: Pass in link to appropriate page*/}
          <CardBody>
            <h3>
              {this.props.title}
            </h3>
            <CardText>{this.props.description}</CardText>
            {/* Get and display tags   */}
              {this.getTags()}
          </CardBody>
         {/* </Link> */}
      </Card>
    );
  }
}

CategoryCard.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
  description: PropTypes.string,
};

export default CategoryCard;
