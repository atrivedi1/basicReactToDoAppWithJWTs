var Task = require('../models/taskModel.js');

//used in multiple functions below
var getAllTasks = function(res){
  Task.find({}, function(err, tasks){
    if(err){return console.error(err);}
    else{
      console.log("successfully sending data");
      res.status(200).send(tasks);
    }
  })
}


module.exports = {

  //C(reate)
  add: function(req, res){   
    var newTask = new Task({
      id: req.body.id,
      completed: req.body.completed,
      description: req.body.description
    });

    newTask.save(function(err, data){
      if(err){return console.error(err);}
      else{
        console.log("post saved");
        res.send(data);
      }
    })
  },
    
    //R(etrieve)
  getAll: function(req, res){
    getAllTasks(res);
  },

   
    //U(pdate)
  updateAll: function(req, res){
    var tasksToUpdate = req.body.tasks;
    tasksToUpdate.forEach(function(task){
      Task.update({id: task.id}, {$set: {description: task.description}},function(err, data){
        if(err){return console.error(err);}
      });
    });
    
    getAllTasks(res);
  },

    //D(elete)
  delete: function(req, res){

    var task = req.body;
    Task.update({id: task.id}, {$set: {completed: true}},function(err, data){
      if(err){return console.error(err);}
      else{
        console.log("successfully marked task as complete:" + task);
        getAllTasks(res);
      }
    });
  },

  deleteAll: function(req,res){
    var tasksToUpdate = req.body.tasks;
    tasksToUpdate.forEach(function(task){
      Task.update({id: task.id}, {$set: {completed: true}},function(err, data){
        if(err){return console.error(err);}
        else{
          console.log("successfully marked ALL tasks as complete" + task);
        }
      });
    });
    getAllTasks(res);
  }
}