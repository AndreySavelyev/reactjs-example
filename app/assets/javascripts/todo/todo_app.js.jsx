/** @jsx React.DOM */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      text: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([{ text: this.state.text, checked: false }]);
    
    this.setState({ items: nextItems, text: ''});
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleCheck: function(e) {
    e.target.
    this.setState({});
  },

  render: function() {
    return (
      <div>
        <h3>TodoList</h3>

        function createItem(item) {
          return <TodoItem item={item} handleCheck={this.handleCheck}/>
        };

        <ul>
          {this.state.items.map(createItem)}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>Add</button>
        </form>
      </div>
    );
  }
});

var TodoItem = React.createClass({
  render: function() {
    return (
      <li>
        <input type="checkbox" onChange={this.props.handleCheck} checked={this.props.item.checked} />
        <span style="{if (this.props.item.checked) { 'text-decoration: line-through;' } }">
          {this.props.item.text}
        </span>
      </li>
    );
  }
});


$(function() {
  React.renderComponent(<TodoApp />, document.getElementById('todo_app'));
});
