const express = require("express");
const favsRoute = express.Router();
const cors = require('cors');
const Favourite = require("../database/models/Favourite")
favsRoute.use(cors());

//add favourite
favsRoute.post('/add-fav', (req, res)=>{
  const today = new Date()
  const favData = {
    UserID: req.body.UserID,
    ActivityID: req.body.ActivityID,
    Time: today
  }

  Favourite.findOne({
    where: {
      UserID: req.body.UserID,
      ActivityID: req.body.ActivityID
    }
  })
  .then(fav =>{
    if(!fav){
        Favourite.create(favData)
        .then(fav => {
          res.json({status: fav.ActivityID + ' added'})
        })
        .catch(err => {
          res.send('error: ' + err)
        })

    } else{
      res.json({status: "Something went wrong!"})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

module.exports = favsRoute;
