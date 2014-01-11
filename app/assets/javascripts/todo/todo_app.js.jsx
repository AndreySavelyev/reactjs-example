/** @jsx React.DOM */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      items: [
        { text: "First item", checked: false, id: 1 },
        { text: "Second item", checked: true, id: 2 }
      ],
      text: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([{ text: this.state.text, checked: false, id: this.state.items.length }]);

    this.setState({ items: nextItems, text: ''});
    console.debug(this.state.items);
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleCheck: function(item) {
    // TODO: Сделать нормально
    item.checked = !item.checked;
    this.setState({});
  },

  handleDelete: function(item) {
    newItems = _.without(this.state.items, item);
    this.setState({items: newItems});
    // console.debug(this.state.items);
  },

  render: function() {
    function createItem(item) {
      return(
        <TodoItem
          item={item}
          handleCheck={this.handleCheck.bind(this, item)}
          handleDelete={this.handleDelete.bind(this, item)} />
      );
    };

    return (
      <div>
        <h3>TodoList</h3>


        <ul>
            {_.map(this.state.items, createItem, this )}
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
        {this.props.item.text}
        <button onClick={this.props.handleDelete}>Remove</button>
      </li>
    );
  }
});


$(function() {
  React.renderComponent(<TodoApp />, document.getElementById('todo_app'));
});
