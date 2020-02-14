import React, {Component} from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
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
        <Link to={{
              pathname: "/country",
              state: {
                tag: this.props.country
              }
            }}> {/* TODO: Pass in link to appropriate page*/}
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
  country: PropTypes.string,
};
export default CountryCard;
