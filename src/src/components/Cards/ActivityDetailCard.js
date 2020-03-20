import React, {Component} from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {addFav} from "components/UserFunctions";

// reactstrap components
import {
  Card,
  CardFooter,
  CardTitle,
  CardImg,
  Row,
  Col,
  Button
} from "reactstrap";
import PropTypes from 'prop-types';

//classes keep state and functional components don't
class ActivityDetailCard extends Component {
  constructor(props) {
    super(props); //always need in a class
    this.state = {
      UserID: null,
      selected: false
    }
    this.checkIfSelected = this.checkIfSelected.bind(this)
    this.updateFavourites = this.updateFavourites.bind(this);
  }

  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      UserID: decoded.UserID
    })
    this.checkIfSelected()
  }
  checkIfSelected(){
   this.props.favs.map((fav) => {
     if(fav.ActivityID === this.props.ActivityID){
       this.setState({selected: true})
     }
     return true;
   });
  }

  updateFavourites(e){
    e.preventDefault();
    const fav = {
      UserID: this.state.UserID,
      ActivityID: this.props.ActivityID
    }
    if(this.state.selected){
      //remove from favourites
      fetch('/delete-fav?UserID=' + this.state.UserID + '&ActivityID=' + this.props.ActivityID, {method: 'delete'})
      .then(res =>
        res.json().then(json => {
          console.log(res)
          // alert("Activity was removed from your favourites")
        })
      );
      this.setState({selected: false})
    }
    else {
      //add to favourites
      addFav(fav).then(res =>
        console.log(res)
        // alert("Activity was added to your favourites")
      )
      this.setState({selected: true})
    }
  }

  render() {
    return (

      <Card className="app-card" >
        <Link to={{
              pathname: "/detailed-activity",
              state: {
                city: this.props.city,
                ActivityID: this.props.ActivityID,
                country: this.props.country,
                title: this.props.title,
                favs: this.props.favs
              }
            }}>
          <CardImg src={this.props.pic}/>
          <CardTitle className="card-activity-detail text-center"> <h4> {this.props.title} </h4> </CardTitle>
        </Link>
          <CardFooter className="card-activity-detail">
            <hr/>
          <Row>
            <Col>
              <h6> {this.props.city}, {this.props.country} </h6>
            </Col>
            <div>
              <Button className="btn-just-icon btn-sm btn-neutral heart-btn-right"
                onClick={this.updateFavourites}
              >
                <i className="fa fa-heart" style={{color: this.state.selected ? 'red' : 'white'}}/>
              </Button>
            </div>
          </Row>
          </CardFooter>
      </Card>
    );
  }
}

ActivityDetailCard.propTypes = {
  pic: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  title: PropTypes.string,
  ActivityID: PropTypes.number,
  favs: PropTypes.array
};
export default ActivityDetailCard;
