import React, {Component} from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
class MoodCard extends Component {
  constructor(props) {
    super(props); //always need in a class
    this.state = {}
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
        <Link to={{
              pathname: "/mood-specific",
              state: {
                mood: this.props.mood
              }
            }}>
        <CardBody>
          <div className="card-mood">
            <div className="card-icon">
              <i className= {this.props.icon}/>
            </div>
            <h3 className="card-category"> {this.props.mood} </h3>
          </div>
        </CardBody>
        </Link>
      </Card>
    );
  }
}

MoodCard.propTypes = {
  pic: PropTypes.string,
  icon: PropTypes.string,
  mood: PropTypes.string,
  TagID: PropTypes.string
};
export default MoodCard;
