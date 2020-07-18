import React from "react";

class ItemTodo extends React.Component {
  render() {
    return (
      <li>
        <button onClick={() => this.props.onToggleTodo(this.props.indexTodo)}>
          I've Done doing this !
        </button>
        {this.props.isFinishedTodo ? (
          <u>{this.props.text}</u>
        ) : (
          <i>{this.props.text}</i>
        )}
      </li>
    );
  }
}

export default ItemTodo;
