var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var movies = require('./routes/movies');

var port = 3306;

var app = express();

app.use(cors());
//view engine
//app.set('views',path.join(__dirname,'views'));
//app.set('view engine','ejs');
//app.engine('html',require('ejs').renderFile);


//set static folder
app.use(express.static(path.join(__dirname,'views')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api', movies);

app.listen(port, function(){
  console.log("server started on port "+port);
});
