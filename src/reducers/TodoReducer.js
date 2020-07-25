export const initialState = {
  todoList: [
    { id: "1", isFinished: false, todoText: "test aja" },
    { id: "2", isFinished: false, todoText: "test aja 2" },
    { id: "3", isFinished: false, todoText: "test aja 3" },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todoList: [...state.todoList, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter((el) => el.id !== action.payload),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((el) => {
          if (el.id === action.idTodo) {
            return {
              id: el.id,
              isFinished: !el.isFinished,
              todoText: el.todoText,
            };
          } else {
            return el;
          }
        }),
      };
    default:
      return state;
  }
}

export function addTodo(payload) {
  return {
    type: "ADD_TODO",
    payload,
  };
}

export function deleteTodo(id) {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
}
