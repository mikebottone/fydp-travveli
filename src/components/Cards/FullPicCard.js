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
class FullPicCard extends Component {
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
      <Card className="app-card"
        data-background="image"
        style={{
          backgroundImage:"url(" + this.props.pic + ")"
        }}>
        {this.state.listNum}
        <CardBody>
          <UncontrolledDropdown direction="left">
            <DropdownToggle className="btn-just-icon btn-sm btn-success btn-right">
              <i className="fa fa-list" />
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
          <Link to="/detailed-activity"> {/* TODO: Pass in link to appropriate page*/}
            <h3>
                CardTitle
              </h3>
            <CardImg src={this.props.pic} />
              <CardText>{this.props.description}</CardText>
              {/* Get and display tags   */}
                {this.getTags()}
          </Link>
        </CardBody>
      </Card>
    );
  }
}

FullPicCard.propTypes = {
  pic: PropTypes.string,
  description: PropTypes.string,
};

export default FullPicCard;
