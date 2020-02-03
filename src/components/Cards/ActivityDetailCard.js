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
class ActivityDetailCard extends Component {
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
      <Card className="app-card" >
        <CardImg src={this.props.pic}/>
        <CardTitle className="card-activity-detail text-center"> <h4> {this.props.detail} </h4> </CardTitle>
        <CardFooter className="card-activity-detail">
          <hr/>
        <Row>
          <Col>
            <h6> {this.props.city}, {this.props.country} </h6>
          </Col>

          {this.state.listNum}
          <UncontrolledDropdown direction="left">
            <DropdownToggle className="btn-just-icon btn-sm btn-danger heart-btn-right">
              <i className="fa fa-heart" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dLabel" right>

            {/* List 1 Symbol and function to add */}
              <DropdownItem>
              <div className="action-line"
                onClick={this.addtoList1}
              >
                <Row>
                  <Col sm="2">
                  <i className= {constants.LIST1_SYMBOL} />
                  </Col>
                  <Col sm="9">
                  Add to List 1
                  </Col>
                </Row>
              </div>
              </DropdownItem>
              <DropdownItem divider />

              {/* List 2 Symbol and function to add */}
              <DropdownItem>
              <div className="action-line"
                onClick={this.addtoList2}
              >
                <Row>
                  <Col sm="2">
                  <i className= {constants.LIST2_SYMBOL} />
                  </Col>
                  <Col sm="9">
                    Add to List 2
                  </Col>
                </Row>
              </div>
              </DropdownItem>
              <DropdownItem divider />

              {/* List 3 Symbol and function to add */}
              <DropdownItem>
              <div className="action-line"
                onClick={this.addtoList3}
              >
                <Row>
                  <Col sm="2">
                  <i className= {constants.LIST3_SYMBOL} />
                  </Col>
                  <Col sm="9">
                  Add to List 3
                  </Col>
                </Row>
              </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Row>
        </CardFooter>
      </Card>
    );
  }
}

ActivityDetailCard.propTypes = {
  pic: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  detail: PropTypes.string
};
export default ActivityDetailCard;
