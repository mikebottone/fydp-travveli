//connection to mySQL DB and API setup using Express
//need to run 'npm run expressApp' from the fydp-project-code directory to start the express app

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const expressApp = express();
expressApp.use(cors());

var db_conn_info = {
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'ba709ddde64af9',
  password: '096f03b7',
  database: 'heroku_2e52a7e26390f81'
}

const queries = {
  airports: "SELECT * FROM airports;"
};

expressApp.listen(4000, ()=> {
  console.log('Go to http://localhost:4000/ to see more instruction')
});

//handles GET requests for '/' path
expressApp.get('/', (req, res) => { // anonymous function
  console.log("GET request received for /");
  res.status(200).json({ "message": "Welcome to Travveli REST-based web service",
  "links": [{"rel" : "aiports", "href" : "http://localhost:4000/airports"},
            {"rel" : "main", "href" : "http://localhost:4000/"}]});
})

expressApp.get('/airports', function( req,res) {
  console.log("GET request received for /airports");
  var querystring = queries.airports;
  getDBData(req,res,db_conn_info,querystring);
});

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
