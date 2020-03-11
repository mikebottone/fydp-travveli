const express = require("express");
const usersRoute = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");
usersRoute.use(cors());
process.env.SECRET_KEY = 'secret';

//Handle Post Methods
//Register
usersRoute.post('/register', (req, res)=>{
  const today = new Date()
  const userData = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
    JoinDate: today,
    HomeAirport: req.body.HomeAirport
  }

  User.findOne({
    where: {
      Email: req.body.Email
    }
  })
  .then(user =>{
    if(!user){
      bcrypt.hash(req.body.Password, 10, (err, hash) =>{
        userData.Password = hash
        User.create(userData)
        .then(user => {
          res.json({status: user.Email + ' registered'})
        })
        .catch(err => {
          res.send('error: ' + err)
        })
      })
    } else{
      res.json({status: "User already exists"})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })

})

//Login
usersRoute.post('/login', (req, res) => {
  User.findOne({
    where: {
      Email: req.body.Email
    }
  })
  .then(user => {
    if(user){
      if(bcrypt.compareSync(req.body.Password, user.Password)){
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
          expiresIn: 1440
        })
        res.send(token)
      }else{
        res.json({status: 'Invalid Email or Password'})
      }
    }else{
      res.json({status: 'Invalid Email or Password'})
    }
  })
  .catch(err => {
    res.status(400).json({status: err})
  })
})

module.exports = usersRoute;
