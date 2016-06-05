var React = require('react');

var Task = React.createClass({

  updateTaskEmitter: function(id, newDescription){
    this.props.updateTask(id, newDescription);
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
           value={this.props.task.description}
           type="text"
           onChange={function(e){this.updateTaskEmitter(this.props.task.id, e.target.value);}.bind(this)}
        />
      </div>
    )
  }
});

module.exports = Task;