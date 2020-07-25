import React from "react";
import { connect } from "react-redux";
import ItemTodo from "../ItemTodo/ItemTodo";

class ListTodo extends React.Component {
  render() {
    const listToRender = this.props.listToRender;
    return (
      <ul>
        {listToRender.map((element, index) => {
          return <ItemTodo key={index} element={element} />;
        })}
      </ul>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    listToRender: reduxState.todoList,
  };
};

export default connect(mapStateToProps, null)(ListTodo);
