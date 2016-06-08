//requirements
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

//connect to db
mongoose.connect('mongodb://'+ process.env.MLAB_USER + ':' + process.env.MLAB_PASS+'@ds037095.mlab.com:37095/reacttodoapp');


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
	console.log('listening on port: ' + port, 'MLAB_PASS: ' + process.env.MLAB_PASS, 'PORT: ', process.env.PORT);
});
