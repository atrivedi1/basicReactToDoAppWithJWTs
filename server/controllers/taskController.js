var Task = require('../models/taskModel.js');

module.exports = {

  //C(reate)
  add: function(req, res){
    console.log("trying to ADD ONE task:", req.body)
   
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
    Task.find({}, function(err, tasks){
      if(err){return console.error(err);}
      else{
        console.log("successfully sending data");
        res.send(tasks);
      }
    })

  },

   
    //U(pdate)
  updateAll: function(req, res){
    console.log("trying to UDPATE all tasks -->", req.body.tasks);
    var tasksToUpdate = req.body.tasks;
    
    tasksToUpdate.forEach(function(task){
      Task.update({id: task.id}, {$set: {description: task.description}},function(err, data){
        if(err){return console.error(err);}
        else{console.log("successfully updated ALL tasks" + task)}
      });
    });

  },

    //D(elete)
  delete: function(req, res){
    console.log("trying to DELETE ONE task");
    var task = req.body;
    Task.update({id: task.id}, {$set: {completed: true}},function(err, data){
      if(err){return console.error(err);}
      else{
        console.log("successfully marked task as complete:" + task);
        this.getAll(req, res);
      }
    });
  },

  deleteAll: function(req,res){
    console.log("trying to DELETE ALL tasks:", req.body.tasks);
    var tasksToUpdate = req.body.tasks;
    tasksToUpdate.forEach(function(task){
      Task.update({id: task.id}, {$set: {completed: true}},function(err, data){
        if(err){return console.error(err);}
        else{
          console.log("successfully marked ALL tasks as complete" + task);
          this.getAll(req, res);
        }
      });
    });
  }
}