import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";

function LoginPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 75);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("full-screen");
    };
  });
  return (
    <>
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/sections/bruno-abatti.jpg") + ")"
          }}
        >
          <div className="filter" />
          <Container>
            {/*TODO: Remove button later*/}
          <Button to="/presentation" tag={Link} target="_blank">
            Back to Presentation Page
          </Button>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Welcome</CardTitle>
                  <Form className="register-form">
                    <label>Email</label>
                    <Input
                      className="no-border"
                      placeholder="Email"
                      type="email"
                    />
                    <label>Password</label>
                    <Input
                      className="no-border"
                      placeholder="Password"
                      type="password"
                    />
                    <Button block className="btn-round" color="danger"
                      onClick={e => e.preventDefault()} //verify login and redirect to discover page
                      to="/login-page" tag={Link}
                    >
                     Login
                    </Button>
                    <div className="login">
                      <p>
                        Don't have an account yet?{" "}
                        <a href="/register-page" tag={Link}>
                          Register
                        </a>
                        .
                      </p>
                    </div>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="demo-footer text-center">
              <h6>
                <i className="fa fa-heart heart" />
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
