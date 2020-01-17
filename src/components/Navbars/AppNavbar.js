import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  NavLink,
  Container,
  UncontrolledTooltip
} from "reactstrap";
// core components

function AppNavbar() {
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
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
          <NavbarBrand to="/homepage" tag={Link}>
            <i className="fa fa-globe" />
            WooshTravel
          </NavbarBrand>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                {/* TODO: Remove Examples dropdown later */}
                <DropdownToggle color="default" caret nav>
                  Examples
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                <DropdownItem to="/index" tag={Link}>
                    <i className="nc-icon nc-world-2" />
                    All Components
                  </DropdownItem>
                  <DropdownItem to="/project-test" tag={Link}>
                    <i className="nc-icon nc-world-2" />
                    Project Test
                  </DropdownItem>
                  <DropdownItem to="/homepage" tag={Link}>
                    <i className="fa fa-home" />
                    Homepage
                  </DropdownItem>
                  <DropdownItem to="/about-us" tag={Link}>
                    <i className="nc-icon nc-bank" />
                    About-us
                  </DropdownItem>
                  <DropdownItem to="/blog-post" tag={Link}>
                    <i className="nc-icon nc-badge" />
                    Blog Post
                  </DropdownItem>
                  <DropdownItem to="/landing-page" tag={Link}>
                    <i className="nc-icon nc-spaceship" />
                    Landing Page
                  </DropdownItem>
                  <DropdownItem to="/login-page" tag={Link}>
                    <i className="nc-icon nc-lock-circle-open" />
                    Login Page
                  </DropdownItem>
                  <DropdownItem to="/product-page" tag={Link}>
                    <i className="nc-icon nc-album-2" />
                    Product Page
                  </DropdownItem>
                  <DropdownItem to="/twitter-redesign" tag={Link}>
                    <i className="nc-icon nc-tie-bow" />
                    Twitter
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button
                  className="btn-just-icon btn-round"
                  color="default"
                  to="/favourites" tag={Link}
                >
                  <i className="fa fa-suitcase" />
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
                      src={require("assets/img/faces/joe-gardner-2.jpg")}
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
                    onClick={e => e.preventDefault()} //will have to perform sign-out on click
                    to="/login-page" tag={Link}
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

export default AppNavbar;
