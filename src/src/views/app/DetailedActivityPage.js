//Final landing page in the flow that has a detailed description of a specific activity

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import {addFav} from "components/UserFunctions";

// reactstrap components
import {
  Container,
  Row,
  Card,
  Col,
  Badge,
  Button
} from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter";
import DetailedActivityHeader from "components/Headers/DetailedActivityHeader.js";
import DetailedActivityCarousel from "components/Carousels/DetailedActivityCarousel";
import { Link } from "react-router-dom";

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
      activityPicUrls: [],
      UserID: null,
      selected: false
    };
    this.getTags = this.getTags.bind(this);
    this.getPics = this.getPics.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getCarousel = this.getCarousel.bind(this);
    this.getDurationAndTravelPeriod = this.getDurationAndTravelPeriod.bind(this);
    this.fetchDetailedActivityInfo = this.fetchDetailedActivityInfo.bind(this);
    this.fetchActivityTags = this.fetchActivityTags.bind(this);
    this.fetchActivityPics = this.fetchActivityPics.bind(this);
    this.getDetailedActivityHeader = this.getDetailedActivityHeader.bind(this);
    this.checkIfSelected = this.checkIfSelected.bind(this);
    this.updateFavourites = this.updateFavourites.bind(this);
  }

  componentDidMount(){
    this.setState({ActivityID: this.props.location.state.ActivityID})
    this.setState({city: this.props.location.state.city})
    this.setState({country: this.props.location.state.country})
    this.setState({title: this.props.location.state.title})
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      UserID: decoded.UserID
    })
    this.checkIfSelected();
    window.scrollTo(0,0)
    this.fetchActivityTags();
    this.fetchDetailedActivityInfo();
    this.fetchActivityPics();
  }

  checkIfSelected(){
    this.props.location.state.favs.map((fav) => {
      if(fav.ActivityID === this.props.location.state.ActivityID){
        this.setState({selected: true})
      }
      return true;
    });
   }

   updateFavourites(e){
    e.preventDefault();
    const fav = {
      UserID: this.state.UserID,
      ActivityID: this.props.location.state.ActivityID
    }
    if(this.state.selected){
      //remove from favourites
      fetch('/delete-fav?UserID=' + this.state.UserID + '&ActivityID=' + this.props.location.state.ActivityID, {method: 'delete'})
      .then(res =>
        res.json().then(json => {
          alert("Activity was removed from your favourites")
        })
      );
      this.setState({selected: false})
    }
    else {
      //add to favourites
      addFav(fav).then(res =>
        alert("Activity was added to your favourites")
      )
      this.setState({selected: true})
    }
  }

  fetchActivityTags(){
    fetch('/activity-tags?ActivityID='+this.props.location.state.ActivityID)
    .then(res => res.json())
    .then(activityTags => this.setState({ activityTags }))
  }

  fetchDetailedActivityInfo(){
    fetch('/detailed-activity-info?ActivityID='+this.props.location.state.ActivityID)
    .then(res => res.json())
    .then(activityInfo => this.setState({ activityInfo }))
  }

  fetchActivityPics(){
    fetch('/activity-pictures?ActivityID='+this.props.location.state.ActivityID)
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
    return this.state.activityPicUrls.map((data) => {
      return <DetailedActivityCarousel
                  key={data.ActivityID}
                  pic1={data.img4}
                  pic2={data.img5}
                  pic3={data.img6}
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
          //check if tag type is country
          data.TagType === 'Country' ?
          (
          <Badge className="btn-round mr-1 btn btn-outline-default"
          to={{
            pathname: "/country",
            state: {
              country: data.TagName,
              TagID: data.TagID,
              description: data.TagLongDescription
            }
          }}
          tag={Link}
          >
          {data.TagName}
          </Badge>
          )
          :
          (
            //check if tag type is city
            data.TagType === 'City' ? (
            <Badge className="btn-round mr-1 btn btn-outline-default"
            to={{
              pathname: "/city",
              state: {
                city: data.TagName,
                TagID: data.TagID,
                description: data.TagLongDescription
              }
            }}
            tag={Link}
            >
            {data.TagName}
            </Badge>
            )
            :
            (
              //check if tag type is mood
              data.TagType === 'Mood' ? (
              <Badge className="btn-round mr-1 btn btn-outline-default"
              to={{
                pathname: "/mood-specific",
                state: {
                  mood: data.TagName,
                  TagID: data.TagID
                }
              }}
              tag={Link}
              >
              {data.TagName}
              </Badge>
              )
              :
              (
                //check if tag type is PrimaryActivity
                data.TagType === 'PrimaryActivity' ? (
                <Badge className="btn-round mr-1 btn btn-outline-default"
                to={{
                  pathname: "/activity-category",
                  state: {
                    primaryActivity: data.TagName,
                    TagID: data.TagID
                  }
                }}
                tag={Link}
                >
                {data.TagName}
                </Badge>
                )
                :
                (
                  //check if tag type is SecondaryActivity
                  data.TagType === 'SecondaryActivity' ? (
                  <Badge className="btn-round mr-1 btn btn-outline-default"
                  to={{
                    pathname: "/activity-specific",
                    state: {
                      secondaryActivity: data.TagName,
                      TagID: data.TagID
                    }
                  }}
                  tag={Link}
                  >
                  {data.TagName}
                  </Badge>
                  )
                  :
                  (
                    <span></span>
                  )
                )
              )
            )
          )
        )
        :
        (<span></span>)
        }
    </div>
    );
    return(<div className="tag-parent">{output}</div>)
  }

  getDetailedActivityHeader(){
    return this.state.activityPicUrls.map((data) => {
      return(
        <DetailedActivityHeader key={data.ActivityID}
        pic={data.CoverImage}
        city={this.state.city}
        country={this.state.country}
        activity={this.state.title}
        />
      )
    })
  }

  render(){
    return (
      <>
        <AppNavbar />
        <this.getDetailedActivityHeader />
        <div className="main">
          <div className="section">
            <Container>
              <Row>
                <div className="leftCol">
                {this.getTags()}
                <this.getDescription/>
                </div>
                <div className="rightCol">
                <Button className="btn-just-icon btn-lg btn-neutral heart-btn-right"
                  onClick={this.updateFavourites}
                >
                  <i className="fa fa-heart" style={{color: this.state.selected ? 'red' : 'white'}}/>
                </Button>
                {this.getDurationAndTravelPeriod()}
                </div>
              </Row>
                {this.getPics()}
              <this.getCarousel/>
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
  ActivityID: PropTypes.number,
  favs: PropTypes.array
};

export default DetailedActivityPage;
