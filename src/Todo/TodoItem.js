import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localTask: "",
      checkboxState: false,
    };
  }

  setItemStyle = () => {
    if (this.state.checkboxState) {
      return {
        transition: ".5s",
        boxShadow: "0 0 10px green",
        backgroundColor: "#FFC0C0",
      };
    }
    return {
      transition: ".5s",
      backgroundColor: "rgb(232, 233, 255)",
    };
  };

  setEditMode = () => {
    this.setState({
      isEdit: true,
      localTask: this.props.todo.task,
    });
  };

  cancelEditMode = () => {
    this.setState({
      isEdit: false,
      localTask: "",
    });
  };

  acceptEdition = () => {
    this.props.setEditedTask(
      this.state.localTask,
      this.props.todo.id,
      this.props.index
    );
    this.cancelEditMode();
  };

  handleInputChange = (e) => {
    this.setState({ localTask: e.target.value });
  };

  handleSetSelectedTodo = (e) => {
    this.setState({ checkboxState: e.target.checked });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.checkboxState !== prevState.checkboxState) {
      this.props.setSelectedItem(this.state.checkboxState, this.props.todo.id);
    }
  };

  render() {
    const { todo, num } = this.props;

    return (
      <div className="todo_item_wrap" style={this.setItemStyle()}>
        <div className="todo_item">
          {this.state.isEdit ? (
            <div>
              <h3>{num}. </h3>
              <input
                className="todo_item_inp"
                type="text"
                value={this.state.localTask}
                onChange={this.handleInputChange}
              ></input>
              <i className="fas fa-check" onClick={this.acceptEdition}></i>
              <i className="fas fa-ban" onClick={this.cancelEditMode}></i>
            </div>
          ) : (
            <h3>
              <span>{num}. </span>
              {todo.task}
            </h3>
          )}
          <span className="todo_item_btn">
            <i className="fas fa-edit" onClick={this.setEditMode}></i>
            <i
              className="fas fa-trash-alt"
              onClick={() => this.props.removeTodoItem(this.props.todo.id)}
            ></i>
          </span>
        </div>
        <span>Priority: {todo.priority}</span>
        <input
          type="checkbox"
          className="todo_item_check"
          onClick={this.handleSetSelectedTodo}
        />
      </div>
    );
  }
}

export default TodoItem;
