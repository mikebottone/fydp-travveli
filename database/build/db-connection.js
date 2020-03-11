//connection to mySQL DB and API setup using Express
//need to run 'npm run expressApp' from the fydp-project-code directory to start the express app

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const path = require('path');
const port = process.env.PORT || 4000;

const expressApp = express();
expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();

var db_conn_info = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'ba709ddde64af9',
  password: '096f03b7',
  database: 'heroku_2e52a7e26390f81'
};

// if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  const staticFiles = express.static(path.join('__dirname', '../../src/build'));
  // Handle React routing, return all requests to React app
  expressApp.use(staticFiles)
  // });
// }

//keep in alphabetical
const queries = {
  addUser: "",
  //Generic Table Pulls
  airports: "SELECT * FROM airports;",
  countries: "SELECT TagID, TagName, TagLongDescription FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'Country' Order by TagName ASC;",
  moods: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'Mood' Order by TagName ASC;",
  primaryactivities: "SELECT TagID, TagName FROM heroku_2e52a7e26390f81.`tag-details` Where TagType = 'PrimaryActivity' Order by TagName ASC;",

  //Specific Lists
  popularactivities: "SELECT activity.ActivityID, activity.Title, activity.City, activity.Country, Count(fav.ActivityID) AS 'Total Favourited' FROM heroku_2e52a7e26390f81.`activity-details` as activity RIGHT JOIN heroku_2e52a7e26390f81.`user-favourites` as fav ON activity.ActivityID = fav.ActivityID GROUP BY ActivityID ORDER BY Count(fav.ActivityID) DESC, ActivityID ASC LIMIT 20;",
  popularcities: "SELECT tagdetails.TagID, tagdetails.TagName, tagdetails.TagType, Temp.TagCount FROM heroku_2e52a7e26390f81.`tag-details` as tagdetails JOIN(  SELECT activitydetailstags.TagID, COUNT(activitydetailstags.TagID) AS TagCount FROM heroku_2e52a7e26390f81.`activity-details-tags` as activitydetailstags  RIGHT JOIN (SELECT activity.ActivityID, activity.Title FROM heroku_2e52a7e26390f81.`activity-details` as activity  RIGHT JOIN heroku_2e52a7e26390f81.`user-favourites` as fav  ON activity.ActivityID = fav.ActivityID    ORDER BY ActivityID ASC) AS TopActivities    ON activitydetailstags.ActivityID = TopActivities.ActivityID    GROUP BY TagID) AS TEMP ON tagdetails.TagID = Temp.TagID WHERE TagType='City' GROU BY TagID ORDER BY TagCount DESC;"
};

expressApp.listen(port, () => {
  console.log('Listening on port: ' + port);
});

//handles GET requests for '/' path
router.get('/', (req, res) => {
  // anonymous function
  // console.log("GET request received for /");
  res.status(200).json({ "message": "Welcome to Travveli REST-based web service",
    "links": [{ "rel": "main", "href": "http://localhost:4000/" }, { "rel": "aiports", "href": "http://localhost:4000/airports" }, { "rel": "countries", "href": "http://localhost:4000/countries" }, { "rel": "moods", "href": "http://localhost:4000/moods" }, { "rel": "primaryactivities", "href": "http://localhost:4000/primaryactivities" }, { "rel": "popularactivities", "href": "http://localhost:4000/popularactivities" }, { "rel": "popularcities", "href": "http://localhost:4000/popularcities" }] });
});

//Gets the activity pictures for a given activity
router.get('/activity-pictures', function (req, res) {
  console.log("GET request received for /activity-pictures");
  var querystring = "SELECT * FROM `activity-pictures` Where ActivityID=" + req.query.ActivityID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

//Get Airports
router.get('/airports', function (req, res) {
  console.log("GET request received for /airports");
  var querystring = "SELECT * FROM airports;";
  getDBData(req, res, db_conn_info, querystring);
});
//Get Countries
router.get('/countries', function (req, res) {
  // console.log("GET request received for /countries");
  var querystring = queries.countries;
  getDBData(req, res, db_conn_info, querystring);
});
//Get Moods
router.get('/moods', function (req, res) {
  // console.log("GET request received for /moods");
  var querystring = queries.moods;
  getDBData(req, res, db_conn_info, querystring);
});
//Get Primary Activities
router.get('/primaryactivities', function (req, res) {
  // console.log("GET request received for /primaryactivities");
  var querystring = queries.primaryactivities;
  getDBData(req, res, db_conn_info, querystring);
});
//Get Popular Activities
router.get('/popularactivities', function (req, res) {
  // console.log("GET request received for /popularactivities");
  var querystring = queries.popularactivities;
  getDBData(req, res, db_conn_info, querystring);
});
//Get Popular Cities
router.get('/popularcities', function (req, res) {
  // console.log("GET request received for /popularcities");
  var querystring = queries.popularcities;
  getDBData(req, res, db_conn_info, querystring);
});

//Gets the cities for a specific country or secondary activity categories for a primary activity
router.get('/secondary-level', function (req, res) {
  // console.log("GET request received for /secondary-level");
  var querystring = "Select td1.TagID, td1.TagLongDescription, td1.TagName FROM `tag-details` td " + "INNER JOIN `tag-heirarchy` th ON td.TagID = th.PrimaryTagID " +
                    "INNER JOIN `tag-details` td1 ON td1.TagID=th.SecondaryTagID " + "Where td.TagID=" + req.query.TagID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

//Gets the activity details for a specific TagID to be used in the ActivityDetailCard
router.get('/activity-details', function (req, res) {
  // console.log("GET request received for /activity-details");
  var querystring = "SELECT adt.ActivityID, adt.TagID, ad.Title, ad.City, ad.Country " + "FROM `activity-details-tags` adt INNER JOIN `activity-details` ad " + "ON adt.ActivityID = ad.ActivityID " + "Where TagID=" + req.query.TagID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

//Gets the activity details for a specific ActivityID for the DetailedActivityPage
router.get('/detailed-activity-info', function (req, res) {
  // console.log("GET request received for /detailed-activity-info");
  var querystring = "SELECT * FROM `activity-details` " + "Where ActivityID=" + req.query.ActivityID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

//Gets the activity detail tags a specific ActivityID for the DetailedActivityPage
router.get('/activity-tags', function (req, res) {
  console.log("GET request received for /activity-tags");
  var querystring = "SELECT activity.ActivityID, activity.Title, details.TagID, tagdetails.TagType, tagdetails.TagName, tagdetails.TagLongDescription " +
                    "FROM `activity-details` as activity " +
                    "LEFT JOIN `activity-details-tags` as details ON activity.ActivityID = details.ActivityID " +
                    "LEFT JOIN `tag-details` as tagdetails ON tagdetails.TagID = details.TagID " +
                    "Where activity.ActivityID=" + req.query.ActivityID + " " +
                    "GROUP BY ActivityID, TagID " + "ORDER BY ActivityID ASC;";
  getDBData(req, res, db_conn_info, querystring);
});

//Gets the favourites details for the Favourites page
router.get('/favourites-details', function (req, res) {
  console.log("GET request received for /favourites-details");
  var querystring = "SELECT uf.ActivityID, ad.Title, ad.City, ad.Country " + "From `user-favourites` uf " + "LEFT JOIN `activity-details` ad " + "ON uf.ActivityID = ad.ActivityID " + "Where UserID=" + req.query.UserID + " " + "ORDER BY uf.ActivityID;";
  getDBData(req, res, db_conn_info, querystring);
});
//check favourites for ActivityID
router.get('/check-favs', function (req, res) {
  console.log("GET request received for /check-favs");
  var querystring = "SELECT ActivityID FROM `user-favourites` " + "Where UserID=" + req.query.UserID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

//Execute Query
function getDBData(req, res, db_conn_info, inputstring) {
  var con = mysql.createConnection(db_conn_info);
  con.connect(err => {
    if (err) {
      res.status(400).json({ error: "Could not establish connection to DB" });
      // console.log('Error connecting to Db');
      return;
    }
    // console.log('Connection established');
    // console.log("SQL query submitted: " + inputstring);
    con.query(inputstring, function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
    con.end(err => {});
  });
}

//Handle delete of favourites
router.delete('/delete-fav', function (req, res) {
  var querystring = "DELETE FROM `user-favourites` " + "WHERE UserID=" + req.query.UserID + " AND " + "ActivityID=" + req.query.ActivityID + ";";
  getDBData(req, res, db_conn_info, querystring);
});

expressApp.use(router);
expressApp.use('/*', staticFiles)

//Handle User Post
var Users = require("./UsersRoute");
expressApp.use("/users", Users);

//add favourite
var Favourites = require("./FavouritesRoute");
expressApp.use("/user-favourites", Favourites);
