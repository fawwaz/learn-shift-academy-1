import React from "react";

class FilterTodo extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.onChangeFilter("ALL")}>All</button>
        <button onClick={() => this.props.onChangeFilter("ACTIVE")}>
          Active
        </button>
        <button onClick={() => this.props.onChangeFilter("INACTIVE")}>
          Inactive
        </button>
      </div>
    );
  }
}

export default FilterTodo;
