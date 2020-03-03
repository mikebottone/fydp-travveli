//connection to mySQL DB and API setup using Express
//need to run 'npm run expressApp' from the fydp-project-code directory to start the express app

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const mysql = require('mysql');

const expressApp = express();
expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended: false}))

var db_conn_info = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'ba709ddde64af9',
  password: '096f03b7',
  database: 'heroku_2e52a7e26390f81'
}

//keep in alphabetical
const queries = {
  addUser: "",
  airports: "SELECT * FROM airports;",
  countries: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'Country' Order by TagName ASC;"
};

expressApp.listen(4000, ()=> {
  console.log('Go to http://localhost:4000/ to see more instruction')
});

//handles GET requests for '/' path
expressApp.get('/', (req, res) => { // anonymous function
  console.log("GET request received for /");
  res.status(200).json({ "message": "Welcome to Travveli REST-based web service",
  "links": [{"rel" : "main", "href" : "http://localhost:4000/"},
    {"rel" : "aiports", "href" : "http://localhost:4000/airports"},
    {"rel" : "countries", "href" : "http://localhost:4000/countries"}
    ]});
})

expressApp.get('/airports', function( req,res) {
  console.log("GET request received for /airports");
  var querystring = "SELECT * FROM airports;"; // Where AirportCode = " + req.query.q +";"
  getDBData(req,res,db_conn_info,querystring);
});

expressApp.get('/countries', function( req,res) {
  console.log("GET request received for /countries");
  var querystring = queries.countries;
  getDBData(req,res,db_conn_info,querystring);
});

//Gets the cities for a specific country
expressApp.get('/country-cities', function( req,res) {
  console.log("GET request received for /country-cities");
  var querystring = "Select td.TagID, td1.TagName FROM `tag-details` td " +
                    "INNER JOIN `tag-heirarchy` th ON td.TagID = th.PrimaryTagID " +
                    "INNER JOIN `tag-details` td1 ON td1.TagID=th.SecondaryTagID " +
                    "Where td.TagID=" + req.query.TagID + ";";
  getDBData(req,res,db_conn_info,querystring);
});

//Execute Query
function getDBData(req, res, db_conn_info, inputstring) {
  var con = mysql.createConnection(db_conn_info);
  con.connect((err) => {
    if(err){
      res.status(400).json({error: "Could not establish connection to DB"})
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
    console.log("SQL query submitted: " + inputstring);
    con.query(inputstring, function(error,results,fields){
        if(error) throw error;
        res.send(results);
      });
    con.end((err)=> {})
  });
}

//Handle User Post
var Users = require("../database/UsersRoute");
expressApp.use("/users",Users);
