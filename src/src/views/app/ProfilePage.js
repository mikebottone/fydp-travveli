import React, { Component } from "react";
import jwt_decode from 'jwt-decode';

// reactstrap components
import {
  Container,
  Row
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
      Email:'',
      HomeAirport:''
    }
  }
  //might need to do this on the homepage with constructor
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      FirstName: decoded.FirstName,
      LastName: decoded.LastName,
      Email: decoded.Email,
      HomeAirport: decoded.HomeAirport
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
                      src={require("assets/img/placeholder.jpg")}
                    />
                  </div>
                  <div className="name">
                    <h4 className="title text-center">
                      {this.state.FirstName} {this.state.LastName}<br />
                      <small>{this.state.Email}</small> <br/>
                      <small>Home Airport: {this.state.HomeAirport}</small>
                    </h4>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
      <AppFooter />
    </>
  );
}
}

export default ProfilePage;
