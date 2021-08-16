import React, { Component } from "react";
import debounce from "lodash/debounce";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.debouncedHandleInput = debounce(this.handleInput, 1000);
    this.state = {
      localFilterInput: "",
    };
  }

  setBtnRemoveSelectedTodosStyle = () => {
    if (this.props.selectedTodos) {
      return {
        display: "block",
      };
    } else {
      return {
        display: "none",
      };
    }
  };

  handleChangeFilerInput = (e) => {
    this.setState({ localFilterInput: e.target.value }, () =>
      this.debouncedHandleInput()
    );
  };

  clearFilterInput = () => {
    this.props.clearFilterInput();
    this.setState({ localFilterInput: "" });
  };

  handleInput = () => {
    this.props.setFilterInput(this.state.localFilterInput);
  };

  render() {
    return (
      <div className="filter_wrap">
        <div>
          <input
            className="filter_inp"
            type="text"
            placeholder="search..."
            value={this.state.localFilterInput}
            onChange={this.handleChangeFilerInput}
          />
        </div>
        <i
          className="fas fa-ban"
          id="btn_clear_filter_input"
          onClick={this.clearFilterInput}
        ></i>
        <button id="btn_sort" onClick={this.props.setSort}>
          Sort
        </button>
        <button
          id="btn_delete_selected_items"
          style={this.setBtnRemoveSelectedTodosStyle()}
          onClick={this.props.deleteSelectedItems}
        >
          Delete selected
        </button>

        <span id="line"></span>
      </div>
    );
  }
}

export default Filter;
