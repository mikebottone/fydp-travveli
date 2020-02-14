import React from "react";
import { Link } from "react-router-dom";

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
  Container
} from "reactstrap";
// core components

function LandingNavbar() {
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
          <NavbarBrand>
            <i className="fa fa-globe" />
           Travveli
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
                  className="btn-round"
                  color="default"
                  to="/login-page" tag={Link}
                >
                  Login
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  className="btn-round"
                  color="default"
                  to="/register-page" tag={Link}
                >
                  Register
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default LandingNavbar;
