import shortid from "shortid";
import { createAction } from "@reduxjs/toolkit";

// * Если payload представляет собой сложный объект (как в addTodo), для передачи всех свойств нужно использовать prepare callback
export const addTodo = createAction("todos/Add", (text) => ({
  payload: {
    id: shortid.generate(),
    text,
    completed: false,
  },
}));
export const deleteTodo = createAction("todos/Delete");
export const toggleCompleted = createAction("todos/ToggleCompleted");
export const changeFilter = createAction("todos/ChangeFilter");

// import { ADD, DELETE, TOGGLE_COMPLETED, CHANGE_FILTER } from "./todos-types";

// export const addTodo = (text) => ({
//   type: ADD,
//   payload: {
//     id: shortid.generate(),
//     text,
//     completed: false,
//   },
// });

// export const deleteTodo = (todoId) => ({
//   type: DELETE,
//   payload: todoId,
// });

// export const toggleCompleted = (todoId) => ({
//   type: TOGGLE_COMPLETED,
//   payload: todoId,
// });
