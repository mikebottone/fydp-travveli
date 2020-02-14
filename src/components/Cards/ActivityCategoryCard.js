import React, {Component} from "react";
// import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
//Second level of the activity category breakdown on ActivityCategoryPage
class ActivityCategoryCard extends Component {
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
        {/* Link to correct section of the activity category page */}
        <CardBody>
          <div className="card-activity">
            <h3 className="card-category"> {this.props.activity} </h3>
          </div>
        </CardBody>
      </Card>
    );
  }
}

ActivityCategoryCard.propTypes = {
  pic: PropTypes.string,
  activity: PropTypes.string
};
export default ActivityCategoryCard;
