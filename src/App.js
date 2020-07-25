import React, { useState, useCallback } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer, { initialState } from "./reducers/TodoReducer";
import Input from "./components/Input/Input";
import ListTodo from "./components/ListTodo/ListTodo";
import FilterTodo from "./components/FilterTodo/FilterTodo";
import {
  ambilDataDariServer,
  tambahDataKeserver,
  updateDataDiServer,
  deleteDataDiServer,
} from "./services/TodoService";

const store = createStore(reducer, initialState);

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

  changeFilterType = (filterType) => {
    this.setState({
      activeFilter: filterType,
    });
  };

  // TAMBAH INI :

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
      <Provider store={store}>
        <Input
          val={this.state.inputText}
          onInputChanged={this.handleInputChange}
          onKeyPressed={this.handleKeyPressed}
        />
        <ListTodo />
        <FilterTodo
          onChangeFilter={this.changeFilterType}
          currentFilter={this.state.activeFilter}
        />
      </Provider>
    );
  }
}

export default App;
