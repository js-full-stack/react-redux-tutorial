import axios from "axios";
import { toast } from "react-toastify";

import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosError,
  addTodoRequest,
  addTodoSuccess,
  addTodoError,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,
  toggleCompletedRequest,
  toggleCompletedSuccess,
  toggleCompletedError,
} from "./todos-actions";
import { createAsyncThunk } from "@reduxjs/toolkit";

const errorHandler = (errorMessage) => toast.error(errorMessage);

export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch(fetchTodosRequest());
    const { data } = await axios.get("http://localhost:4040/todos");
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    errorHandler(error.message);
    fetchTodosError(error.message);
  }
};

export const fetchTodosAsync = createAsyncThunk("fetchTodos", async () => {
  const { data } = await axios.get("http://localhost:4040/todos");
  return data;
});

// export const fetchTodos = () => (dispatch) => {
//   dispatch(fetchTodosRequest());
//   axios
//     .get("/todos")
//     .then(({ data }) => dispatch(fetchTodosSuccess(data)))
//     .catch((error) => fetchTodosError(error));
// };

export const addTodo = (text) => async (dispatch) => {
  const todo = {
    text,
    completed: false,
  };
  try {
    dispatch(addTodoRequest());

    const { data } = await axios.post("http://localhost:4040/todos", todo);
    dispatch(addTodoSuccess(data));
  } catch (error) {
    errorHandler(error.message);
    dispatch(addTodoError(error.message));
  }
};

// export const addTodo = (text) => (dispatch) => {
//   const todo = {
//     text,
//     completed: false,
//   };

//   dispatch(addTodoRequest());
//   axios
//     .post("/todos", todo)
//     .then(({ data }) => dispatch(addTodoSuccess(data)))
//     .catch((error) => dispatch(addTodoError(error)));
// };

export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    dispatch(deleteTodoRequest());
    await axios.delete(`http://localhost:4040/todos/${todoId}`);
    dispatch(deleteTodoSuccess(todoId));
  } catch (error) {
    errorHandler(error.message);

    deleteTodoError(error.message);
  }
};

// export const deleteTodo = (todoId) => (dispatch) => {
//   dispatch(deleteTodoRequest());

//   axios
//     .delete(`todos/${todoId}`)
//     .then(() => dispatch(deleteTodoSuccess(todoId)))
//     .catch((error) => deleteTodoError(error));
// };

export const toggleCompleted = ({ id, completed }) => async (dispatch) => {
  try {
    const update = { completed };
    dispatch(toggleCompletedRequest());
    const { data } = await axios.patch(
      `http://localhost:4040/todos/${id}`,
      update
    );
    dispatch(toggleCompletedSuccess(data));
  } catch (error) {
    errorHandler(error.message);

    dispatch(toggleCompletedError(error.messgae));
  }
};

// export const toggleCompleted = ({ id, completed }) => (dispatch) => {
//   const update = { completed };
//   dispatch(toggleCompletedRequest());
//   axios
//     .patch(`/todos/${id}`, update)
//     .then(({ data }) => dispatch(toggleCompletedSuccess(data)))
//     .catch((error) => dispatch(toggleCompletedError(error)));
// };
