import { useState, useReducer, useMemo } from "react";
import todosReducer from "./reducer";

const Todos = () => {
  const [todoList, dispatch] = useReducer(todosReducer, []);

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");

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
    dispatch({ type: "addTodo", payload: { newTodo } });
    setText("");
  };

  const removeTodo = (todoId) => {
    dispatch({ type: "removeTodo", payload: { todoId } });
  };

  const toggleCompleted = (todoId) => {
    dispatch({ type: "toggleCompleted", payload: { todoId } });
  };

  const filterTodo = (e) => {
    const { value } = e.currentTarget;
    setFilter(value.toLowerCase());
  };

  const visibleTodos = useMemo(() => {
    console.log("function called");
    return todoList.filter(({ text }) => text.toLowerCase().includes(filter));
  }, [filter, todoList]);

  // const getVisibleTodos = () => {
  //   console.log("function called");
  //   return todoList.filter(({ text }) => text.toLowerCase().includes(filter));
  // };
  // const visibleTodos = getVisibleTodos();

  return (
    <>
      <label>
        <input
          onChange={filterTodo}
          value={filter}
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
