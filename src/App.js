import React from "react";
import Input from "./components/Input/Input";
import ListTodo from "./components/ListTodo/ListTodo";
import FilterTodo from "./components/FilterTodo/FilterTodo";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputhitText: "",
      todoList: [],
      activeFilter: "ALL",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  handleKeyPressed = (event) => {
    if (event.keyCode === 13) {
      const oldTodoList = this.state.todoList;
      const inputText = this.state.inputText;
      oldTodoList.push({
        isFinished: false,
        todoText: inputText,
      });

      this.setState({
        todoList: oldTodoList,
      });
      console.log(oldTodoList);
    }
  };

  handleToggleDone = (index) => {
    const currentTodoList = this.state.todoList;
    currentTodoList[index].isFinished = !currentTodoList[index].isFinished;

    this.setState({
      todoList: currentTodoList,
    });
  };

  changeFilterType = (filterType) => {
    this.setState({
      activeFilter: filterType,
    });
  };

  render() {
    const todoList = this.state.todoList;
    const activeFilter = this.state.activeFilter;

    const filteredTodoList = todoList.filter((element) => {
      if (activeFilter === "INACTIVE") {
        return !element.isFinished;
      } else if (activeFilter === "ACTIVE") {
        return element.isFinished;
      } else if (activeFilter === "ALL") {
        return true;
      }
    });

    return (
      <div>
        <Input
          val={this.state.inputText}
          onInputChanged={this.handleInputChange}
          onKeyPressed={this.handleKeyPressed}
        />
        <ListTodo
          listToRender={filteredTodoList}
          onToggleItem={this.handleToggleDone}
        />
        <FilterTodo onChangeFilter={this.changeFilterType} />
      </div>
    );
  }
}

export default App;
