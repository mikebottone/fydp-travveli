import React from "react";

// reactstrap components
import { Container} from "reactstrap";

// core components

function AppFooter() {
  return (
    <>
      <footer className="footer">
        <Container>
          <br/>
            <div className="text-center">
                {new Date().getFullYear()}
                <i className="fa fa-heart heart" />
                <i className="fa fa-plane fa-spin" />
            </div>

        </Container>
      </footer>
    </>
  );
}

export default AppFooter;
