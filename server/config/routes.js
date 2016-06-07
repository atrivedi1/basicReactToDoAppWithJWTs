var task = require('../controllers/taskController.js');
var config = require('./config');
var jwt = require('jsonwebtoken');

var authToken = jwt.sign({}, config.secret);
var isAuthenticated = function(req, res, next) {
	if(req.headers.authorization === authToken){
		return next();
	}
    else {
    	console.log("not authenticated");
    	res.status(404).send('need to authenticate before you can delete');
    }
};



module.exports = function(app) {

  //*Authenticate
  app.get('/authentication', function(req, res){
  	res.send({authToken});
  });

  //C(reate)
  /*Note: normally would handle this case via the update route, however included it for the purposes of this exercise*/
  app.post('/api/task', task.add);

  //R(etrieve)
  app.get('/todoHome', task.getAll);

  //U(pdate)
  app.put('/api/allTasks', task.updateAll);

  //D(elete)
  /*NOTE: normally would handle both of these cases via the update route, however included them for the purposes
  of this exercise*/
  app.delete('/api/task', isAuthenticated, task.delete);

  app.delete('/api/allTasks', isAuthenticated, task.deleteAll);

};
