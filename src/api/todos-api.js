import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export const fetchTodos = async () => {
  const { data } = await axios.get("/todos");
  return data;
};

export const postTodo = async (todo) => {
  const { data } = await axios.post("/todos", todo);
  return data;
};

export const deleteTodoById = async (todoId) => {
  return await axios.delete(`/todos/${todoId}`);
};

export const updateTodo = async (todoId, update) => {
  return await axios
    .patch(`/todos/${todoId}`, {
      update,
    })
    .then(({ data }) => data);
};
