import { useState } from "react";

const Todos = () => {
  const [text, setText] = useState("");
  const [filterTodos, setfilterTodos] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setText(value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!text) return;
    const id = Date.now();
    const completed = false;
    const newTodo = { text, id, completed };
    setTodoList((prev) => [...prev, newTodo]);
    setText("");
  };

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(({ id }) => id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleCompleted = (todoId) => {
    const toggleCompletedTodo = todoList.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(toggleCompletedTodo);
  };

  const filterTodo = (e) => {
    const { value } = e.currentTarget;
    setfilterTodos(value.toLowerCase());
  };

  const getVisibleTodos = () =>
    todoList.filter(({ text }) => text.toLowerCase().includes(filterTodos));

  const visibleTodos = getVisibleTodos();

  return (
    <>
      <label>
        <input
          onChange={filterTodo}
          type="text"
          placeholder="Enter the title todo"
        />
      </label>

      <form onSubmit={addTodo}>
        <input onChange={handleChange} type={text} value={text} />
        <button type="submit">Add todo</button>
        <ul>
          {visibleTodos.map(({ text, id }) => (
            <li key={id}>
              <p> {text}</p>
              <input type="checkbox" onChange={() => toggleCompleted(id)} />
              <button onClick={() => removeTodo(id)} type="button">
                Remove todo
              </button>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default Todos;
