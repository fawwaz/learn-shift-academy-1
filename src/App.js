import React, { useState, useCallback } from "react";
import Input from "./components/Input/Input";
import ListTodo from "./components/ListTodo/ListTodo";
import FilterTodo from "./components/FilterTodo/FilterTodo";
import {
  ambilDataDariServer,
  tambahDataKeserver,
  updateDataDiServer,
} from "./services/TodoService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputhitText: "",
      todoList: [],
      activeFilter: "ALL",
    };
  }

  componentDidMount() {
    // ambil datanya disini .. terus update state di dalam react agar sesuai dengan data yang sudah terisimpan di 'server' ktia
    ambilDataDariServer().then((response) => {
      const data = response.data;
      const parsedData = data.map((element) => {
        return {
          isFinished: element.isDone,
          todoText: element.text,
          id: element.id,
        };
      });

      this.setState({
        todoList: parsedData,
      });
    });
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
      // Tambah data ke server
      tambahDataKeserver({
        isDone: false,
        text: inputText,
      });

      oldTodoList.push({
        isFinished: false,
        todoText: inputText,
      });

      // ini tambah data ke local
      this.setState({
        todoList: oldTodoList,
        inputText: "",
      });
    }
  };

  handleToggleDone = (index) => {
    const currentTodoList = this.state.todoList;
    const todoItem = currentTodoList[index];

    // Ubah value di server
    // Destructure
    const { id, isFinished, todoText } = todoItem;
    updateDataDiServer(id, {
      isDone: !isFinished,
      text: todoText,
    });

    // Ubah value di local browser
    currentTodoList[index].isFinished = !isFinished;

    this.setState({
      todoList: currentTodoList,
    });
  };

  changeFilterType = (filterType) => {
    this.setState({
      activeFilter: filterType,
    });
  };

  handleDeleteTodo = (element) => {
    console.log(element);
  };

  render() {
    const todoList = this.state.todoList;
    const activeFilter = this.state.activeFilter;

    const filteredTodoList = todoList.filter((element) => {
      if (activeFilter === "INACTIVE") {
        return element.isFinished;
      } else if (activeFilter === "ACTIVE") {
        return !element.isFinished;
      } else {
        return true;
      }
    });

    return (
      <>
        <Input
          val={this.state.inputText}
          onInputChanged={this.handleInputChange}
          onKeyPressed={this.handleKeyPressed}
        />
        <ListTodo
          onTodoDelete={this.handleDeleteTodo}
          listToRender={filteredTodoList}
          onToggleItem={this.handleToggleDone}
        />
        <FilterTodo
          onChangeFilter={this.changeFilterType}
          currentFilter={this.state.activeFilter}
        />
      </>
    );
  }
}

export default App;
