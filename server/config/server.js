//requirements
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

//connect to db
mongoose.connect('mongodb://localhost/todoApp');


//create instance of express server
var app = express();

//middleware
app.use(express.static(path.join(__dirname, '../../')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//listen on routes
require('./routes.js')(app);

//determine port 
var port = process.env.PORT || 3000;

//point server to port 3000 and confirm that it's listening
app.listen(port, function(){
	console.log('listening on port ' + port);
});
