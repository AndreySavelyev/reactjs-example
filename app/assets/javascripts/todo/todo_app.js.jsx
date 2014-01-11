/** @jsx React.DOM */
var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      items: [
        { text: "First item", checked: false, id: 1, edit_text: null },
        { text: "Second item", checked: true, id: 2, edit_text: null }
      ],
      text: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([{ text: this.state.text, checked: false, id: this.state.items.length, edit: false }]);

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

  handleDelete: function(item) {
    newItems = _.without(this.state.items, item);
    this.setState({items: newItems});
    // console.debug(this.state.items);
  },

  handleEdit: function(item) {
    // TODO: Сделать нормально
    item.edit = !item.edit;
    item.edit_text = item.text
    this.setState({});
  },

  handleChangeItem: function(item, newName) {
    item.edit_text = newName;
    this.setState({items: this.state.items});
  },

  updateSubmitHandle: function(item) {
    item.text = item.edit_text;
    item.edit = !item.edit;
    this.setState({});
    return false;
  },

  render: function() {
    function createItem(item) {
      return(
        <TodoItem
          item={item}
          handleCheck={this.handleCheck.bind(this, item)}
          handleEdit={this.handleEdit.bind(this, item)}
          handleDelete={this.handleDelete.bind(this, item)}
          handleChangeItem={this.handleChangeItem.bind(this, item)}
          updateSubmitHandle={this.updateSubmitHandle.bind(this, item)} />
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
  handleChange:  function(e) {
    this.props.handleChangeItem(e.target.value)
  },
  render: function() {
    var tmpName = null;
    var cx = React.addons.classSet;
    var classes = cx({
      'completed': this.props.item.checked
    });
    if (this.props.item.edit) {
      return (
        <li>
          <form onSubmit={this.props.updateSubmitHandle}>
            <input onChange={this.handleChange} value={this.props.item.edit_text} />
            <button>Save</button>
          </form>
        </li>
      );
    } else {
      return (
        <li>
          <input type="checkbox" onChange={this.props.handleCheck} checked={this.props.item.checked} />
          <span className={classes} onClick={this.props.handleEdit}>
            {this.props.item.text}
          </span>
          <button onClick={this.props.handleDelete}>Remove</button>
        </li>
      );
    }
  }
});

$(function() {
  React.renderComponent(<TodoApp />, document.getElementById('todo_app'));
});
