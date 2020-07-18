import React from "react";

class FilterTodo extends React.Component {
  render() {
    return (
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Inactive</button>
      </div>
    );
  }
}

export default FilterTodo;
