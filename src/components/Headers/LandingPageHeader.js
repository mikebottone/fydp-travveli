import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        className="page-header"
        ref={pageHeader}
        style={{
          backgroundImage:
            "url(" + require("assets/img/sections/david-marcu.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="motto">
              <h1 className="title">Welcome to Travveli</h1>
              <h3 className="description"><i>
                "It's not the Destination, It's the Journey."
              </i></h3>
              <br />
              <Button
                className="btn-round mr-1"
                color="neutral"
                to="register-page"
                tag={Link}
                target="_blank"
              >
                Register
              </Button>
              <Button
                className="btn-round"
                color="neutral"
                to="login-page"
                tag={Link}
                type="button"
                outline
              >
                Log In
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
