import React, { Component } from "react";
import {register} from "components/UserFuncstions";

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

class RegisterPage extends Component {
  constructor(){
    super()
    this.state = {
      FirstName: "",
      LastName: "",
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
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password
    }

    register(user).then(res=> {
      // if(res){ //look into why this is stopping the push
      this.props.history.push('/login-page')
      // }
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
              "url(" + require("assets/img/sections/soroush-karimi.jpg") + ")"
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3>We've got you covered</h3>
                    <p>
                      Larger, yet dramatically thinner. More powerful, but
                      remarkably power efficient. Everything you need in a
                      single case.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3>Clear Directions</h3>
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-user-secret" />
                  </div>
                  <div className="description">
                    <h3>We value your privacy</h3>
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    Register
                  </CardTitle>
                  <div className="division">
                    <div className="line l" />
                    <span><i className="fa fa-plane"/> </span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={this.onSubmit}>
                    <Input placeholder="First Name" type="text" name="FirstName" value={this.state.FirstName} onChange={this.onChange} />
                    <Input placeholder="Last Name" type="text" name="LastName" value={this.state.LastName} onChange={this.onChange} />
                    <Input placeholder="Email" type="email" name="Email" value={this.state.Email} onChange={this.onChange} />
                    <Input placeholder="Password" type="password" name="Password" value={this.state.Password} onChange={this.onChange} />
                    {/* <Input placeholder="Confirm Password" type="password" name="ConfirmPassword" onChange={this.onChange}/> */}
                    <Button block className="btn-round" color="default" type="submit">
                      Register
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                      Already have an account?{" "}
                      <a href="/login-page">
                        Log in
                      </a>
                      .
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="demo-footer text-center">
            <h6>
              <i className="fa fa-heart heart" />
            </h6>
          </div>
        </div>
      </div>
    </>
  );
  }
}

export default RegisterPage;
