import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  Nav,
  NavLink,
  Container
} from "reactstrap";
// core components

class AppNavbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      bodyClick: false,
      setBodyClick: false,
      collapseOpen: false,
      setCollapseOpen: false,
    }
  }
  logOut(e){
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push('/')
  }
  render(){
  return (
    <>
      {this.state.bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            // setBodyClick(false);
            // setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        className="fixed-top"
        expand="lg"
        id="navbar-main"
        color="success"
      > {/*see _variables.scss for colour variables*/}
        <Container>
          <Button to="/homepage" tag={Link}>
            <i className="fa fa-globe" />
           Travveli Home
          </Button>
          <Collapse navbar isOpen={this.state.collapseOpen}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button
                  className="btn-just-icon btn-round"
                  color="default"
                  to="/favourites" tag={Link}
                >
                  <i className="fa fa-heart" />
                </Button>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  data-toggle="dropdown"
                  height="30"
                  width="30"
                  tag={NavLink}
                >
                  <div className="profile-photo-small">
                    <img
                      alt="..."
                      className="img-circle img-responsive img-no-padding"
                      src={require("assets/img/user-icon.png")}
                    />
                  </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-info" right>
                  <DropdownItem
                    to="/profile-page" tag={Link}
                  >
                    <i className="fa fa-user-circle" />
                    Me
                  </DropdownItem>
                  <DropdownItem
                    to="/settings" tag={Link}
                  >
                    <i className="nc-icon nc-settings-gear-65" />
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={this.logOut.bind(this)}
                  >
                    <i className="fa fa-lock" />
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
}

export default withRouter(AppNavbar);
