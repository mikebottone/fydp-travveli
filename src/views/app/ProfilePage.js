import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import AppFooter from "components/Footers/AppFooter";

class ProfilePage extends Component {
  constructor(){
    super()
    this.state = {
      FirstName:'',
      LastName:'',
      Email:''
    }
  }
  //might need to do this on the homepage with constructor
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      FirstName: decoded.FirstName,
      LastName: decoded.LastName,
      Email: decoded.Email
    })

  }
  render(){
  return (
    <>
      <AppNavbar />
      <ProfilePageHeader />
      <div className="wrapper">
        <div className="profile-content section">
          <Container>
            <Row>
              <div className="profile-picture">
                <div
                  className="fileinput fileinput-new"
                  data-provides="fileinput"
                >
                  <div className="fileinput-new img-no-padding">
                    <img
                      alt="..."
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
                    />
                  </div>
                  <div className="name">
                    <h4 className="title text-center">
                      {this.state.FirstName} {this.state.LastName} <br />
                      <small>{this.state.Email}</small>
                    </h4>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure.
                </p>
                <br />
                <Button to="/settings" tag={Link} className="btn-round" color="default" outline>
                  <i className="fa fa-cog mr-1" />
                  Settings
                </Button>
              </Col>
            </Row>
            <br />
          </Container>
        </div>
      </div>
      <AppFooter />
    </>
  );
}
}

export default ProfilePage;
