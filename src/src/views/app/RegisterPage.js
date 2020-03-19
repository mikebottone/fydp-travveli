import React, { Component } from "react";
import {register} from "components/UserFunctions";
import ReactGA from 'react-ga';

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
import Select from "react-select";

class RegisterPage extends Component {
  constructor(){
    super()
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      HomeAirport: null,
      airports: []
    }

    this.getAirports = this.getAirports.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.getAirports();
  }

  //retrieves the list of users from Express App
  getAirports(){
    fetch('/airports')
    .then(res => res.json())
    .then(airports => {
      const airportsDrop = airports.map((items) => {
        const container = {};

        container.value = items.AirportCode;
        container.label=items.AirportCode + "  |  " + items.AirportCity;
        return container;
       })
      this.setState({airports: airportsDrop});
    })
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSelect = (HomeAirport) => {
    this.setState({HomeAirport})
  }

  onSubmit(e){
    e.preventDefault()
    const user = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
      HomeAirport: this.state.HomeAirport.value
    }

    register(user).then(res=> {
      if(res !== "User already exists" ){
      alert(res)
      this.props.history.push('/login-page')
      }
      else{
        alert(res);
      }
      ReactGA.event({
        category: "Register",
        action: "User Registered",
      });
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
          <div className="MainPageFilter" />
          <Container>
            <Row>
              <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
                <div className="info info-horizontal">
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="icon">
                    <i className="fa fa-umbrella" />
                  </div>
                  <div className="description">
                    <h3><b>We've got you covered</b></h3>
                    <p>
                    Everything you need to know to finalize your next vacation destination, we have it here.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="fa fa-map-signs" />
                  </div>
                  <div className="description">
                    <h3> <b>Navigate experiences</b></h3>
                    <p>
                      Efficiently unleash your ability to discover vacations using our unorthodox navigation style.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon">
                    <i className="nc-icon nc-bulb-63"></i>
                  </div>
                  <div className="description">
                    <h3> <b>Discover with no fear </b> </h3>
                    <p>
                      Spend multiple hours discovering  new places and learn about all the activities available in your favorite cities without worrying about being cached by pricing predators.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="mr-auto" lg="6" md="6" sm="4" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                   <b>Register</b>
                  </CardTitle>
                  <div className="division">
                    <div className="line l" />

                    <div className="line r" />
                  </div>
                  <br></br>
                  <Form className="register-form" onSubmit={this.onSubmit}>
                    <Input placeholder="First Name" type="text" name="FirstName" value={this.state.FirstName} onChange={this.onChange} />  &nbsp;
                    <Input placeholder="Last Name" type="text" name="LastName" value={this.state.LastName} onChange={this.onChange} /> &nbsp;
                    <Input placeholder="Email" type="email" name="Email" value={this.state.Email} onChange={this.onChange} /> &nbsp;
                    <Input placeholder="Password" type="password" name="Password" value={this.state.Password} onChange={this.onChange} /> &nbsp;
                    <Select placeholder="Choose Preferred Airport" options={this.state.airports} onChange={this.onSelect}/>
                    <Button block className="btn-round" color="default" type="submit">
                     <b>  Register</b>
                     <br></br>
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                     <br></br>
                     &ensp; &ensp; Already have an account?{" "}
                      <a href="/login-page">
                        Log-in
                      </a>

                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="demo-footer text-center">
            <h6>
            <span><i className="fa fa-plane"/> </span>
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
