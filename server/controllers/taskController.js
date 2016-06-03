var Task = require('../models/taskModel.js');

module.exports = {

  //C(reate)
  add: function(req, res){
    var newTask = new Task({
      id: req.body.id,
      description: req.body.description
    });

    newTask.save(function(err, data){
      if(!err){return console.error(err);}
      else{console.log("new db entry created: " + newTask);}
    })
  },
    
    //R(etrieve)
  getAll: function(req, res){
    Task.find({}, function(err, tasks){
      if(err){return console.error(err);}
      else{res.send(tasks);}
    })

  },

   
    //U(pdate)
  updateAll: function(req, res){

    var tasksToUpdate = req.body.tasksToUpdate;
    
    tasksToUpdate.forEach(fucntion(task){
      Task.update({id: task.id}, {$set: {description: task.description}},function(err, data){
        if(err){return console.error(err);}
        else{console.log("successfully updated task" + task)}
      });
    });

  },

    //D(elete)
  delete: function(req, res){
    // Task.remove({id: req.body.id}, function(err){
    //   if(err){return console.error(err);}
    //   else{console.log("sucessfully deleted task")}
    // });
  },

  deleteAll: function(req,res){
    // Task.remove({}, function(err){
    //   if(err){return console.error(err);}
    //   else{console.log("successfully deleted all tasks")}
    // })
  }
}