
//react requirements
var React = require('react');
var ReactDOM = require('react-dom');

//import task.js
var Task = require('../components/task.js');

var Todo = React.createClass({


  getInitialState: function(){
    return {
      singleTaskUrl: "http://localhost:3000/api/task",
      allTasksUrl: "http://localhost:3000/api/allTasks",
      newTask: "",
      taskList: []
    };
  },

  componentWillMount: function(){
    //get all tasks from db
    console.log("trying to get tasks from db");

    $.ajax({
      url: this.state.allTasksUrl,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data){
        this.setState({taskList:data});
      }.bind(this),
      error: function(status, err){
        console.error(this.state.allTasksUrl, status, JSON.stringify(err));
      }.bind(this)
    });   
  },

  authorize: function(){

  },

  addTask: function(e){
    
    var taskDescription = this.refs.taskInput.value;
    var taskObj = {
      completed: false,
      id: this.state.taskList.length,
      description: taskDescription
    }

    //add to database
    if(taskDescription){
      $.ajax({
        url: this.state.singleTaskUrl,
        dataType: 'json',
        data: taskObj,
        type: 'POST',
        cache: false,
        success: function(data){
          this.setState({
            taskList: this.state.taskList.concat(data)
          });
          this.refs.taskInput.value = "";
          console.log("successfully added task to DB");
          console.log("updated taskList:", this.state.taskList)
        }.bind(this),
        error: function(status, err){
          console.error(this.state.singleTaskUrl, status, JSON.stringify(err));
        }.bind(this)
      });  

    }
  },

  updateTask: function(id, newDescription){
    var updatedTasks = this.state.taskList.slice();
    var taskToBeUpdated = updatedTasks[id];
    taskToBeUpdated.description = newDescription;     
    this.setState({taskList: updatedTasks});
  },

  updateTasks: function(){
    //update tasks
    $.ajax({
      url: this.state.allTasksUrl,
      type: 'PUT',
      data: {tasks: this.state.taskList},
      success: function(data) {

        alert('Tasks updated successfully');
      }.bind(this),
      error: function(status, err){
        console.error(this.state.allTasksUrl, status, JSON.stringify(err));
      }.bind(this)
    });
  },

  completeTask: function(id, description){

      var updatedTasks = this.state.taskList.slice();
      var taskToBeUpdated = updatedTasks[id];
      taskToBeUpdated.completed = true;     
      this.setState({taskList: updatedTasks});

      $.ajax({
        url: this.state.singleTaskUrl,
        type: 'DELETE',
        data: taskToBeUpdated,
        success: function(data) {

          alert('Task marked as completed in database');
        }.bind(this),
        error: function(status, err){
          console.error(this.state.singleTaskUrl, status, JSON.stringify(err));
        }.bind(this)
      });

  },

  completeAllTasks: function(){

    var allTasksMarkedAsComplete = this.state.taskList.slice();
    allTasksMarkedAsComplete.forEach(function(task){
      task.completed = true;
    });

    this.setState({taskList: allTasksMarkedAsComplete});

    $.ajax({
        url: this.state.allTasksUrl,
        type: 'DELETE',
        data: {tasks: this.state.taskList},
        success: function(data) {

          alert('ALL Tasks marked as completed in database');
        }.bind(this),
        error: function(status, err){
          console.error(this.state.allTasksUrl, status, JSON.stringify(err));
        }.bind(this)
    });
  },

  renderAllUnfinishedTasks: function(){
    //filters out completed tasks and then maps to an array of jsx elements;
    return this.state.taskList.filter(function(task){
      return task.completed === false;
    }.bind(this)).map(function(task) {
      return <Task key={task.id} task={task} completeTask={this.completeTask} updateTask={this.updateTask}/>;
    }.bind(this))
  },

  render: function(){
     
    var tasksExist = this.state.taskList.length;

    return (
      <div>
        <div>
          <input 
            type="checkbox"
          />
          Authorize User
        </div>
        <div>
          <input 
             id="taskInput"
             placeholder="Enter Task..."
             type="text"
             ref="taskInput"
          />
          <button 
             id="addTask"
             onClick={this.addTask}
          >
            Add Task
          </button>
        </div>
        <div>
          {
            tasksExist ?
            this.renderAllUnfinishedTasks() : 
            null
          }
        </div>
        <div>
          <button 
             id="updateTasks"
             onClick={this.updateTasks}
          >
            Update
          </button>
          <button 
             id="completeTasks"
             onClick={this.completeAllTasks}
          >
            New Day
          </button>
        </div>

      </div>
    )
  }
});




ReactDOM.render(<Todo />, document.getElementById('todo'));