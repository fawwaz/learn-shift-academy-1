import React from "react";
import ItemTodo from "../ItemTodo/ItemTodo";

class ListTodo extends React.Component {
  render() {
    const listToRender = this.props.listToRender;
    return (
      <ul>
        {listToRender.map((element, index) => {
          return (
            <ItemTodo
              key={index}
              text={element.todoText}
              onToggleTodo={this.props.onToggleItem}
              isFinishedTodo={element.isFinished}
              onDeleteTodo={this.props.onTodoDelete}
              element={element}
              indexTodo={index}
            />
          );
        })}
      </ul>
    );
  }
}

export default ListTodo;
