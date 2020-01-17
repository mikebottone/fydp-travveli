//connection to mySQL DB and API setup using Express
//need to run 'npm run expressApp' from the fydp-project-code directory to start the express app

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const expressApp = express();

const con = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'VT12mnJgGm',
  password: 'lzrxvZeJlc',
  database: 'VT12mnJgGm'
});
con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

expressApp.use(cors());

expressApp.get('/user_info', function( req,res) {
  con.query('SELECT * FROM user_info', function(error,results,fields){
    if(error) throw error;
    res.send(results);
  });
});

expressApp.listen(4000, ()=> {
  console.log('Go to http://localhost:4000/user_info to see the data')
});

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });
