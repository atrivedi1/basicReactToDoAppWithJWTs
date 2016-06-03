
//react requirements
var React = require('react');
var ReactDOM = require('react-dom');

//import task.js
var Task = require('../components/task.js');

var Todo = React.createClass({


  getInitialState: function(){
    return {
      newTask: "",
      tasksInDb: [],
      currentTasks: []
    };
  },

  componentWillMount: function(){

    //get all tasks from db
  //   $.ajax({
  //     //ajax request takes in a url to which to make a request to, a dataType, type (e.g. GET/POST), and success/error
  //     //caeses
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'GET',
  //     cache: false,
  //     success: function(data){
  //       this.setState({data:data})
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.error(this.props.url, status, err.toString())
  //     }.bind(this)
  //   });   
  },

  authorize: function(){

  },

  addTask: function(e){
    
    //add to database

    //render
    if (this.refs.taskInput.value) {
      this.setState({
        currentTasks: this.state.currentTasks.concat({
          completed: false,
          id: this.state.currentTasks.length,
          description: this.refs.taskInput.value
        })
      });
    }
    
    this.refs.taskInput.value = "";
  },

  updateTasks: function(){
    //update tasks
  },

  completeTask: function(id, description){
    var updatedTasks = this.state.currentTasks.slice();
    updatedTasks[id].completed = true;
    this.setState({currentTasks: updatedTasks});
  },

  completeAllTasks: function(){
    var allTasksMarkedAsComplete = this.state.currentTasks.slice();
    allTasksMarkedAsComplete.forEach(function(task){
      task.completed = true;
    });
    this.setState({currentTasks: allTasksMarkedAsComplete});
  },

  renderAllUnfinishedTasks: function(){
    //filters out completed tasks and then maps to an array of jsx elements;
    return this.state.currentTasks.filter(function(task){
      return task.completed === false;
    }.bind(this)).map(function(task) {
      return <Task key={task.id} task={task} completeTask={this.completeTask}/>;
    }.bind(this))
  },

  render: function(){
     
    var tasksExist = this.state.currentTasks.length;

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