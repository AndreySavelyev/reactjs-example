/** @jsx React.DOM */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      items: [
        { text: "First item", checked: false },
        { text: "Second item", checked: true }
      ],
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

  handleCheck: function(item) {
    // TODO: Сделать нормально
    item.checked = !item.checked;
    this.setState({});
  },

  render: function() {
    var _this = this
    function createItem(item) {
      return <TodoItem item={item} handleCheck={_this.handleCheck.bind(_this, item)}/>;
    };

    return (
      <div>
        <h3>TodoList</h3>


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
        <button>Remove</button>
        <input type="checkbox" onChange={this.props.handleCheck} checked={this.props.item.checked} />
        {this.props.item.text}
      </li>
    );
  }
});


$(function() {
  React.renderComponent(<TodoApp />, document.getElementById('todo_app'));
});
