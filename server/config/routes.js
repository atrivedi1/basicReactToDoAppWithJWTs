var task = require('../controllers/taskController.js');


module.exports = function(app) {

  //C(reate)
  /*Note: normally would handle this case via the update route, however included it for the purposes of this exercise*/
  app.post('/api/task', task.add);

  //R(etrieve)
  app.get('/api/allTasks', task.getAll);

  //U(pdate)
  app.put('/api/allTasks', task.updateAll);

  //D(elete)
  /*NOTE: normally would handle both of these cases via the update route, however included them for the purposes
  of this exercise*/
  app.delete('/api/task', task.delete);

  app.delete('/api/allTasks', task.deleteAll);

};
