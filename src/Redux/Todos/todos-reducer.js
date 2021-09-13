import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  addTodoRequest,
  addTodoSuccess,
  addTodoError,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosError,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,
  toggleCompletedRequest,
  toggleCompletedSuccess,
  toggleCompletedError,
  changeFilter,
} from "./todos-actions";

const items = createReducer([], {
  [fetchTodosSuccess]: (_, { payload }) => payload,
  [addTodoSuccess]: (state, { payload }) => [...state, payload],

  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),

  [toggleCompletedSuccess]: (state, { payload }) =>
    state.map((todo) => (todo.id === payload.id ? payload : todo)),
});

const filter = createReducer("", {
  [changeFilter]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchTodosRequest]: () => true,
  [fetchTodosSuccess]: () => false,
  [fetchTodosError]: () => false,
  [addTodoRequest]: () => true,
  [addTodoSuccess]: () => false,
  [addTodoError]: () => false,
  [deleteTodoRequest]: () => true,
  [deleteTodoSuccess]: () => false,
  [deleteTodoError]: () => false,
  [toggleCompletedRequest]: () => true,
  [toggleCompletedSuccess]: () => false,
  [toggleCompletedError]: () => false,
});

const error = createReducer(null, {
  [fetchTodosError]: (_, { payload }) => payload,
  [addTodoError]: (_, { payload }) => payload,
  [deleteTodoError]: (_, { payload }) => payload,
  [toggleCompletedError]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});

// import { ADD, DELETE, TOGGLE_COMPLETED, CHANGE_FILTER } from "./todos-types";

// const items = (state = [], { type, payload }) => {
//   switch (type) {
//     case ADD:
//       return [...state, payload];

//     case DELETE:
//       return state.filter(({ id }) => id !== payload);

//     case TOGGLE_COMPLETED:
//       return state.map((todo) =>
//         todo.id === payload ? { ...todo, completed: !todo.completed } : todo
//       );

//     default:
//       return state;
//   }
// };

//     (state = "", { type, payload }) => {
//   switch (type) {
//     case CHANGE_FILTER:
//       return payload;

//     default:
//       return state;
//   }
// };
