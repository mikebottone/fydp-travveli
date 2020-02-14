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
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default LandingNavbar;
