import { useState, useEffect } from "react";
import TodoFilter from "../components/Todos/TodoFilter";
import TodoList from "../components/Todos/TodoList/";
import TodoEditor from "../components/Todos/TodoEditor";
import Stats from "../components/Todos/Stats";
import {
  fetchTodos,
  postTodo,
  deleteTodoById,
  updateTodo,
} from "../api/todos-api";

const TodosView = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");

  // Подсчет общего количества задач
  const totalTodoCount = todos.length;

  // Подсчет количества выполненных задач
  const completedTodoCount = todos.reduce(
    (total, todo) => (todo.completed === true ? total + 1 : total),
    0
  );

  // *Получение текущего списка задач при маунтинге
  useEffect(() => {
    fetchTodos()
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  //   *Добавление новой задачи
  const addTodo = async (text) => {
    const todo = {
      text,
      completed: false,
    };
    await postTodo(todo).then((data) => {
      setTodos([data, ...todos]);
    });
  };

  // *Удаление задачи
  const deleteTodo = async (todoId) => {
    await deleteTodoById(todoId).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    });
  };

  // *Добавление задачи в список выполненных
  const toggleCompleted = async (todoId) => {
    const currentTodo = todos.find(({ id }) => id === todoId);
    const { completed } = currentTodo;
    const update = { completed: !completed };

    await updateTodo(todoId, update).then((updatedTodo) => {
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    });
  };

  // Запись в стейт значения инпута для фильтрации
  const filterTodoList = (e) => setFilter(e.currentTarget.value);

  // Фильтрация + нормализация
  const getVisibleTodos = () => {
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(({ text }) =>
      text.toLowerCase().includes(normalizedFilter)
    );
  };
  const visibleTodos = getVisibleTodos();

  return (
    <>
      <Stats total={totalTodoCount} completed={completedTodoCount} />
      <TodoEditor onSubmit={addTodo} />
      <TodoFilter onChangeFilter={filterTodoList} value={filter} />

      <TodoList
        todos={visibleTodos}
        onDeleteTodo={deleteTodo}
        onToggleCompleted={toggleCompleted}
      />
    </>
  );
};

export default TodosView;
