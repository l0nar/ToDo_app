import React, { Component } from "react";
import Header from "./Todo/Header";
import TodoItem from "./Todo/TodoItem";
import Filter from "./Todo/Filter";
import { orderBy } from "lodash";

const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filterInput: "",
      sortDirection: null,
      selectedTodos: false,
    };
  }

  setSelectedTodos = (value) => {
    this.setState({ selectedTodos: value });
  };

  getShownList = () => {
    let shownTodos = this.state.todos;

    if (this.state.filterInput) {
      const modyfiedValue = new RegExp(`${this.state.filterInput}`, "i");

      shownTodos = shownTodos.filter((el) => el.task.match(modyfiedValue));
    }

    if (this.state.sortDirection) {
      shownTodos = orderBy(shownTodos, ["task"], [this.state.sortDirection]);
    }

    return shownTodos;
  };

  setFilterInput = (value) => {
    this.setState({
      filterInput: value,
    });
  };
  clearFilterInput = () => {
    this.setState({
      filterInput: "",
    });
  };

  createUniqueKey = () => {
    const rNum = () => {
      const num = Math.ceil(Math.random() * 10);
      return num;
    };
    const rLetter = () => {
      const alfabet = "qwertyuiopasdfghjklzxcvbnm";
      const randomInt = () => {
        return Math.ceil(Math.random() * (alfabet.length - 0) + 0);
      };
      return alfabet[randomInt()];
    };
    const result = [
      rNum(),
      rNum(),
      rLetter(),
      rNum(),
      "-",
      rNum(),
      rLetter(),
      rLetter(),
      rNum(),
      "-",
      rLetter(),
      rLetter(),
      rNum(),
      rNum(),
    ].join("");
    return result;
  };

  handleAddTodo = (taskName, priorityValue) => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          task: taskName,
          priority: priorityValue,
          id: this.createUniqueKey(),
          isSelected: false,
        },
      ],
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.todos !== prevState.todos) {
      const arr = [...this.state.todos].map((el) => el.isSelected);
      this.setState({ selectedTodos: arr.includes(true) });
    }
  };

  setSelectedItem = (value, id) => {
    this.setState({
      todos: this.state.todos.map((el) => {
        if (el.id === id) {
          el.isSelected = value;
        }
        return el;
      }),
    });
  };

  deleteSelectedItems = () => {
    this.setState({
      todos: [...this.state.todos].filter((el) => el.isSelected === false),
    });
  };

  // добавить через map______________________________

  setEditedTask = (value, id, index) => {
    // this.setState({
    //   todos: [
    //     ...this.state.todos.slice(0,index),
    //     {...this.state.todos[index], task: value},
    //     ...this.state.todos.slice(index + 1)
    //   ]
    // })

    this.setState({
      todos: this.state.todos.map((item) => {
        if (item.id === id) {
          item.task = value;
        }
        return item;
      }),
    });
  };

  removeTodoItem = (id) => {
    this.setState((state) => {
      return {
        todos: state.todos.filter((el) => el.id !== id),
      };
    });
  };

  setSort = () => {
    const sortConfig = [
      { curr: null, next: SORT_ORDER.asc },
      { curr: SORT_ORDER.asc, next: SORT_ORDER.desc },
      { curr: SORT_ORDER.desc, next: SORT_ORDER.asc },
    ];

    const configItem = sortConfig.find(
      (el) => el.curr === this.state.sortDirection
    );

    this.setState({ sortDirection: configItem.next });

    //   if (this.state.sortDirection === null){
    //     this.setState({sortDirection: SORT_ORDER.asc})

    //   } else if (this.state.sortDirection === SORT_ORDER.asc){
    //     this.setState({sortDirection: SORT_ORDER.desc})

    //   } else if (this.state.sortDirection === SORT_ORDER.desc){
    //     this.setState({sortDirection: SORT_ORDER.asc})
    // }
  };

  render() {
    return (
      <div className="wrap">
        <Header handleAddTodo={this.handleAddTodo} />

        <Filter
          setSort={this.setSort}
          filterInput={this.state.filterInput}
          setFilterInput={this.setFilterInput}
          clearFilterInput={this.clearFilterInput}
          selectedTodos={this.state.selectedTodos}
          deleteSelectedItems={this.deleteSelectedItems}
        />

        {this.getShownList().map((item, i) => {
          return (
            <TodoItem
              todo={item}
              num={i + 1}
              key={item.id}
              index={i}
              setEditedTask={this.setEditedTask}
              removeTodoItem={this.removeTodoItem}
              setSelectedItem={this.setSelectedItem}
            />
          );
        })}
      </div>
    );
  }
}

export default App;