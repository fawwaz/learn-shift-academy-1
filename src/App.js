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

  render() {
    return (
      <div>
        <Input
          val={this.state.inputText}
          onInputChanged={this.handleInputChange}
          onKeyPressed={this.handleKeyPressed}
        />
        <ListTodo
          listToRender={this.state.todoList}
          onToggleItem={this.handleToggleDone}
        />
        <FilterTodo />
      </div>
    );
  }
}

export default App;
