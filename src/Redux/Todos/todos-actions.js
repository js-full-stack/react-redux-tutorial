import shortid from "shortid";
import { ADD, DELETE, TOGGLE_COMPLETED } from "./todos-types";

export const addTodo = (text) => ({
  type: ADD,
  payload: {
    id: shortid.generate(),
    text,
    completed: false,
  },
});

export const deleteTodo = (todoId) => ({
  type: DELETE,
  payload: todoId,
});

export const toggleCompleted = (todoId) => ({
  type: TOGGLE_COMPLETED,
  payload: todoId,
});
