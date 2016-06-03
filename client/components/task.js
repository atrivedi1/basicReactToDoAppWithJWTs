var React = require('react');

var Task = React.createClass({

  getInitialState: function(){
    return {
      taskDescription: ""
    };
  },

  componentWillMount: function(){
    this.setState({taskDescription: this.props.task.description});
  },

  updateTask: function(e){
    var updatedDescription = e.target.value;
    this.setState({taskDescription: updatedDescription});
  },

  completedTaskEmitter: function(id) {
      this.props.completeTask(id);
  },

  render: function(){
    return(
      <div>
        <button 
           id="completeTask"
           value={this.props.task}
           onClick={function() {this.completedTaskEmitter(this.props.task.id, this.props.task.description)}.bind(this)}
        >
          Completed
        </button>
        <input 
           id={this.props.task.id}
           value={this.state.taskDescription}
           type="text"
           onChange={this.updateTask}
        />
      </div>
    )
  }
});

module.exports = Task;