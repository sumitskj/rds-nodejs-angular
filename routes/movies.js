var express = require('express'),
    mysql = require('mysql'),
    request = require('request')
    bodyParser = require('body-parser');

var router = express.Router();

var MYSQL_HOST = process.env.MYSQL_HOST || 'meandb.czhjzwt8yzla.us-east-1.rds.amazonaws.com',
    MYSQL_USER = process.env.MYSQL_USER || 'skj',
    MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'Sumit123',
    MYSQL_DB = process.env.MYSQL_DB || 'meandb';


con = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
})

con.connect(function(err){
  if(err) throw err;
  console.log('Connected')
})

router.use(bodyParser.json());

router.get('/movies', function(req, res){
  con.query('SELECT * FROM movies', function(err, result){
    if(err){
      res.status(500).send({"status": "Something went wrong !"})
    }
    res.json(result)
  })
});

router.post('/movies', function(req, res){
  var movie = req.body;
  con.query('INSERT INTO movies SET ?', movie, function(err, result){
    if(err){
      res.status(400).send({"status": "Invalid request payload"})
    }
    movie.id = result.insertId;
      res.status(201).send({"status":"Success"})
  })
});


module.exports = router;
