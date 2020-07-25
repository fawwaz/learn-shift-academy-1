import React from "react";
import { connect } from "react-redux";

class ItemTodo extends React.Component {
  render() {
    const { onToggleTodo, onDeleteTodo, element } = this.props;

    return (
      <li>
        <button onClick={() => onToggleTodo(element.id)}>
          I've Done doing this !
        </button>
        <button onClick={() => onDeleteTodo(element.id)}>Delete</button>
        {element.isFinished ? (
          <u>{element.todoText}</u>
        ) : (
          <i>{element.todoText}</i>
        )}
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTodo: (id) => dispatch({ type: "DELETE_TODO", payload: id }),
    onToggleTodo: (id) => dispatch({ type: "UPDATE_TODO", idTodo: id }),
  };
};

export default connect(null, mapDispatchToProps)(ItemTodo);
