import React, { Component } from "react";
import { Link } from "react-router-dom";
import {login} from "components/UserFunctions";
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

class LoginPage extends Component {
  constructor(){
    super()
    this.state = {
      Email: "",
      Password: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    const user = {
      Email: this.state.Email,
      Password: this.state.Password
    }

    login(user).then(res=> {
      if(res !== "Invalid Email or Password"){
        this.props.history.push('/homepage')
      }
      else{
        alert(res)
      }
    })

  }

  render(){
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
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Welcome</CardTitle>
                  <Form className="register-form" onSubmit={this.onSubmit}>
                    <label>Email</label>
                    <Input
                      className="no-border"
                      placeholder="Email"
                      type="email"
                      name="Email"
                      value={this.state.Email}
                      onChange={this.onChange}
                    />
                    <label>Password</label>
                    <Input
                      className="no-border"
                      placeholder="Password"
                      type="password"
                      name="Password"
                      value={this.state.Password}
                      onChange={this.onChange}
                    />
                    <Button block className="btn-round" color="danger"
                    type="submit"
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
                  {/* <div className="forgot">
                    <Button
                      className="btn-link"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div> */}
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
}

export default LoginPage;
