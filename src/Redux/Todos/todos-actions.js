// import shortid from "shortid";
import { createAction } from "@reduxjs/toolkit";

export const fetchTodosRequest = createAction("todos/fetchTodosRequest");
export const fetchTodosSuccess = createAction("todos/fetchTodosSuccess");
export const fetchTodosError = createAction("todos/fetchTodosError");

export const addTodoRequest = createAction("todos/addTodoRequest");
export const addTodoSuccess = createAction("todos/addTodoSuccess");
export const addTodoError = createAction("todos/addTodoError");

export const deleteTodoRequest = createAction("todos/deleteTodoRequest");
export const deleteTodoSuccess = createAction("todos/deleteTodoSuccess");
export const deleteTodoError = createAction("todos/deleteTodoError");

export const toggleCompletedRequest = createAction(
  "todos/toggleCompletedTodoRequest"
);
export const toggleCompletedSuccess = createAction(
  "todos/toggleCompletedTodoSuccess"
);
export const toggleCompletedError = createAction(
  "todos/toggleCompletedTodoError"
);

export const changeFilter = createAction("todos/ChangeFilter");

//  *Redux Toolkit

// export const addTodo = createAction("todos/Add", (text) => ({
//   payload: {
//     id: shortid.generate(),
//     text,
//     completed: false,
//   },
// }));

// export const deleteTodo = createAction("todos/Delete");
// export const toggleCompleted = createAction("todos/ToggleCompleted");
// export const changeFilter = createAction("todos/ChangeFilter");

// * Vanilla Redux
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
