//Final landing page in the flow that has a detailed description of a specific activity

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
  Badge
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import DetailedActivityHeader from "components/Headers/DetailedActivityHeader.js";
import DetailedActivityCarousel from "components/Carousels/DetailedActivityCarousel";

class DetailedActivityPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      ActivityID: null,
      city: '',
      country:'',
      title: '',
      activityInfo: [],
      activityTags: [],
      activityPicUrls: []

    };
    this.getTags = this.getTags.bind(this);
    this.getPics = this.getPics.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getCarousel = this.getCarousel.bind(this);
    this.getDurationAndTravelPeriod = this.getDurationAndTravelPeriod.bind(this);
    this.fetchDetailedActivityInfo = this.fetchDetailedActivityInfo.bind(this);
    this.fetchActivityTags = this.fetchActivityTags.bind(this);
    this.fetchActivityPics = this.fetchActivityPics.bind(this);
  }

  componentDidMount(){
    this.setState({ActivityID: this.props.location.state.ActivityID})
    this.setState({city: this.props.location.state.city})
    this.setState({country: this.props.location.state.country})
    this.setState({title: this.props.location.state.title})
    window.scrollTo(0,0)
    this.fetchActivityTags();
    this.fetchDetailedActivityInfo();
    this.fetchActivityPics();
  }

  fetchActivityTags(){
    fetch('http://localhost:4000/activity-tags?ActivityID='+this.props.location.state.ActivityID)
    .then(res => res.json())
    .then(activityTags => this.setState({ activityTags }))
  }

  fetchDetailedActivityInfo(){
    fetch('http://localhost:4000/detailed-activity-info?ActivityID='+this.props.location.state.ActivityID)
    .then(res => res.json())
    .then(activityInfo => this.setState({ activityInfo }))
  }

  fetchActivityPics(){
    fetch('http://localhost:4000/activity-pictures?ActivityID='+this.props.location.state.ActivityID)
    .then(res => res.json())
    .then(activityPicUrls => this.setState({ activityPicUrls }))
  }


  getDescription(){
    return this.state.activityInfo.map((data)=>{
      return <div key={data.ActivityID}>
        {data.ShortDescription !== null ?
        (<h3>
          {data.ShortDescription}
        </h3>)
        :
        (<div>
          <h3>
            {data.Title}
          </h3>
        </div>)
        }
        {data.LongDescription !== null ?
        (<div>
          {data.LongDescription}
        </div>)
        :
        (<div>
          Take a look at the page to discover more about the activity!
        </div>)
        }
      </div>
    })
  }

  getCarousel(){
    return this.state.activityInfo.map((data) => {
      return <DetailedActivityCarousel
                  key={data.ActivityID}
                  pic1={require("assets/img/sections/pedro-lastra.jpg")}
                  pic2={require("assets/img/sections/fabio-mangione.jpg")}
                  pic3={require("assets/img/cover.jpg")}
                />
      })
  }

  getDurationAndTravelPeriod(){
    return this.state.activityInfo.map((data) => {
      return <div key={data.ActivityID} className="durationBox">
      <div>
        <i className="fa fa-hourglass-half"/> <strong>Duration:</strong>
        {data.DurationMins !== null ?
        (<p>{data.DurationMins}</p>)
        :
        (<p> Varies </p>)
        }
      </div>
      <div>
        <i className="fa fa-calendar"/> <strong>Ideal Travel Period:</strong>
        {data.PrimeTime !== null ?
        (<p>{data.PrimeTime}</p>)
        :
        (<p> Anytime </p>)
        }
      </div>
    </div>
    })
  }

  getPics(){
    return this.state.activityPicUrls.map((data) => {
      return(
      <Row key={data.ActivityID}>
        {data.img1 !== null ?
        (<Col md="3" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={data.img1}
          />
        </Card>
        </Col>)
        :
        (<span></span>)
        }

        {data.img2 !== null ?
        (<Col md="5" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={data.img2}
          />
        </Card>
        </Col>)
        :
        (<span></span>)
        }

        {data.img3 !== null ?
        (<Col md="4" sm="4">
        <Card>
          <img
            alt="..."
            className="img-rounded img-responsive"
            src={data.img3}
          />
        </Card>
        </Col>)
        :
        (<span></span>)
        }
      </Row>
      )
    })
  }

  getTags(){
    var output = this.state.activityTags.map((data) =>
    <div key={data.ActivityID} className="tags">
        {data.TagName !== null ?
        (
        <Badge className="btn-round mr-1 btn btn-outline-default"> {data.TagName} </Badge>
        )
        :
        (<span></span>)
        }
    </div>
    );
    return(<div className="tag-parent">{output}</div>)
  }

  render(){
    return (
      <>
        <AppNavbar />
        <DetailedActivityHeader pic={require("assets/img/faces/erik-lucatero-2.jpg")} //TODO - pull from folder
            activity={this.state.title}
            city={this.state.city}
            country={this.state.country}
        />
        <div className="main">
          <div className="section">
            <Container>
              <Row>
                <div className="leftCol">
                {this.getTags()}
                <this.getDescription/>
                </div>
                <div className="rightCol">
                {this.getDurationAndTravelPeriod()}
                </div>
              </Row>
                {this.getPics()}
              <Row>
              <this.getCarousel/>
              </Row>
            </Container>
          <AppFooter/>
          </div>
        </div>
      </>
    );
  }
}

DetailedActivityPage.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  title: PropTypes.string,
  ActivityID: PropTypes.number

};

export default DetailedActivityPage;
