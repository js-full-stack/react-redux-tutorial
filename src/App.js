import Counter from "./components/Counter/";
import TodoList from "./components/Todos/TodoList";
import TodoFilter from "./components/Todos/TodoFilter";
import TodoEditor from "./components/Todos/TodoEditor";
import { useState } from "react";
import { Transition } from "react-transition-group";

/* <Counter /> */

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
