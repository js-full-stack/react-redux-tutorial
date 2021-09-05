import { combineReducers } from "redux";
import { ADD, DELETE, TOGGLE_COMPLETED } from "./todos-types";

const items = (state = [], { type, payload }) => {
  switch (type) {
    case ADD:
      return [...state, payload];

    case DELETE:
      return state.filter(({ id }) => id !== payload);

    case TOGGLE_COMPLETED:
      return state.map((todo) =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );

    default:
      return state;
  }
};

const filter = (state = [], action) => {
  return state;
};

export default combineReducers({
  items,
  filter,
});

// toggleCompleted = (todoId) => {
//   this.setState(({ todos }) => ({
//     todos: todos.map((todo) =>
//       todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
//     ),
//   }));
// };
