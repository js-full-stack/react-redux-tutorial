import { combineReducers } from "redux";
import { createReducer, createSlice } from "@reduxjs/toolkit";
import {
  addTodo,
  deleteTodo,
  toggleCompleted,
  changeFilter,
} from "./todos-actions";

const items = createReducer([], {
  [addTodo]: (state, { payload }) => [...state, payload],

  [deleteTodo]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),

  [toggleCompleted]: (state, { payload }) =>
    state.map((todo) =>
      todo.id === payload ? { ...todo, completed: !todo.completed } : todo
    ),
});

const filter = createReducer("", {
  [changeFilter]: (state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
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
