import React, {Component} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardImg
} from "reactstrap";
// import PropTypes from 'prop-types';

//classes keep state and functional components don't
class FavouritesCard extends Component {
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
        <Badge className="btn-sm" to="/activities" tag={Link}> Tag {index} </Badge>
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
        <Button className="btn-just-icon btn-sm btn-danger btn-right">
          <i className="nc-icon nc-simple-remove" />
        </Button>
        <Link to="/homepage"> {/* TODO: Pass in link to appropriate page*/}
          <CardImg src={require("assets/img/faces/erik-lucatero-2.jpg")} />
          <CardBody>
            <CardText>This is some text</CardText>
            <this.getTags/>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

export default FavouritesCard;
