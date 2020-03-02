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
  //Generic Table Pulls
  airports: "SELECT * FROM airports;",
  countries: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'Country' Order by TagName ASC;",
  moods: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'Mood' Order by TagName ASC;",
  primaryactivities: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'PrimaryActivity' Order by TagName ASC;",

  //Specific Lists
  popularactivities: "SELECT activity.ActivityID, activity.Title, Count(fav.ActivityID) AS 'Total Favourited' FROM heroku_2e52a7e26390f81.`activity-details` as activity RIGHT JOIN heroku_2e52a7e26390f81.`user-favourites` as fav ON activity.ActivityID = fav.ActivityID GROUP BY ActivityID ORDER BY Count(fav.ActivityID) DESC, ActivityID ASC;",
  popularcities: "SELECT tagdetails.TagID, tagdetails.TagName, tagdetails.TagType, Temp.TagCount FROM heroku_2e52a7e26390f81.`tag-details` as tagdetails JOIN(  SELECT activitydetailstags.TagID, COUNT(activitydetailstags.TagID) AS TagCount FROM heroku_2e52a7e26390f81.`activity-details-tags` as activitydetailstags  RIGHT JOIN (SELECT activity.ActivityID, activity.Title FROM heroku_2e52a7e26390f81.`activity-details` as activity  RIGHT JOIN heroku_2e52a7e26390f81.`user-favourites` as fav  ON activity.ActivityID = fav.ActivityID    ORDER BY ActivityID ASC) AS TopActivities    ON activitydetailstags.ActivityID = TopActivities.ActivityID    GROUP BY TagID) AS TEMP ON tagdetails.TagID = Temp.TagID WHERE TagType='City' GROU BY TagID ORDER BY TagCount DESC;"
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
    {"rel" : "countries", "href" : "http://localhost:4000/countries"},
    {"rel" : "moods", "href" : "http://localhost:4000/moods"},
    {"rel" : "primaryactivities", "href" : "http://localhost:4000/primaryactivites"},
    {"rel" : "popularactivities", "href" : "http://localhost:4000/popularactivities"},
    {"rel" : "popularcities", "href" : "http://localhost:4000/popularcities"}
    ]});
})
//Get Airports
expressApp.get('/airports', function( req,res) {
  console.log("GET request received for /airports");
  var querystring = queries.airports;
  getDBData(req,res,db_conn_info,querystring);
});
//Get Countries
expressApp.get('/countries', function( req,res) {
  console.log("GET request received for /countries");
  var querystring = queries.countries;
  getDBData(req,res,db_conn_info,querystring);
});
//Get Moods
expressApp.get('/moods', function( req,res) {
  console.log("GET request received for /moods");
  var querystring = queries.moods;
  getDBData(req,res,db_conn_info,querystring);
});
//Get Primary Activities
expressApp.get('/primaryactivities', function( req,res) {
  console.log("GET request received for /primaryactivities");
  var querystring = queries.primaryactivities;
  getDBData(req,res,db_conn_info,querystring);
});
//Get Popular Activities
expressApp.get('/popularactivities', function( req,res) {
  console.log("GET request received for /popularactivities");
  var querystring = queries.popularactivities;
  getDBData(req,res,db_conn_info,querystring);
});
//Get Popular Cities
expressApp.get('/popularcities', function( req,res) {
  console.log("GET request received for /popularcities");
  var querystring = queries.popularcities;
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
