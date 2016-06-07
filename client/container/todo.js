
//react requirements
var React = require('react');
var ReactDOM = require('react-dom');

//import task.js
var Task = require('../components/task.js');
var Todo = React.createClass({

  getInitialState: function(){
    return {
      authenticated: false,
      authenticationCode: null,
      authenticationURL: "http://localhost:3000/authentication",
      homeUrl: "http://localhost:3000/todoHome",
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
      url: this.state.homeUrl,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data){
        this.setState({taskList:data});
      }.bind(this),
      error: function(status, err){
        console.error(this.state.homeUrl, status, JSON.stringify(err));
      }.bind(this)
    });   
  },

  cloneObject: function(obj){
    var result = {}
    for(var key in obj){
      result[key] = obj[key];
    }
    return result;
  },

  authenticationSwitch: function(){
    
    var isNowAuthenticated = !this.state.authenticated;
    this.setState({authenticated: isNowAuthenticated});
    
    if(isNowAuthenticated){
      $.ajax({
        url: this.state.authenticationURL,
        dataType: 'json',
        data: {isAuthenticated: isNowAuthenticated},
        type: 'GET',
        cache: false,
        success: function(data){
          this.setState({authenticationCode: data.authToken});
          console.log("successfully received authentication code");
        }.bind(this),
        error: function(status, err){
          console.error(this.state.singleTaskUrl, status, JSON.stringify(err));
        }.bind(this)
      });  
    }

    else{
      this.setState({authenticationCode: null});
    }
  },

  authenticationWarning: function(){
    return 'Click the checkbox to authenticate; you will not be able to delete tasks otherwise';
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
        console.log('Tasks updated successfully');
      }.bind(this),
      error: function(status, err){
        console.error(this.state.allTasksUrl, status, JSON.stringify(err));
      }.bind(this)
    });
  },

  completeTask: function(id){
      
      //mark task as complete
      console.log('state after clicking complete ONE -->', this.state.taskList);
      var taskToBeUpdated = this.state.taskList[id];
      var copyOfTargetTask = this.cloneObject(taskToBeUpdated);
      copyOfTargetTask.completed = true;   

      //make a request to update task in database; if user is not authorized, will respond with an error
      $.ajax({
        url: this.state.singleTaskUrl,
        type: 'DELETE',
        data: copyOfTargetTask,
        headers: {'authorization': this.state.authenticationCode},
        success: function(data) {
          this.setState({taskList: data});
          console.log('Task marked as completed in database');
        }.bind(this),
        error: function(status, err){
          console.error(this.state.singleTaskUrl, status, JSON.stringify(err));
        }.bind(this)
      });

  },

  completeAllTasks: function(){

    //create a copy of taskList and mark all tasks as completed
    console.log('state after clicking complete ALL -->', this.state.taskList);
    var completedCopyOfTaskList = this.state.taskList.map(function(task){
      var taskClone = this.cloneObject(task);
      taskClone.completed = false;
      return taskClone;
    }.bind(this));


    //make a request to mark all tasks as completed in database; if user is not authenticated will return error;
    $.ajax({
        url: this.state.allTasksUrl,
        type: 'DELETE',
        data: {tasks: completedCopyOfTaskList},
        headers: {'authorization': this.state.authenticationCode},
        success: function(data) {
          this.setState({taskList: data});
          console.log('ALL Tasks marked as completed in database');
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
    
    var authenticated = this.state.authenticated;
    var tasksExist = this.state.taskList.length;

    return (
      <div>
        <div>
          {
            authenticated ? 
            null :
            this.authenticationWarning()
          }
        </div>
        <div>
          <input 
            type="checkbox"
            checked={this.state.authenticated}
            onChange={this.authenticationSwitch}
          />
          Authenticate
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
             type="button"
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
             type="button"
             onClick={this.updateTasks}
          >
            Update
          </button>
          <button 
             id="completeTasks"
             type="button"
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