import { useState, useEffect } from "react";
import TodoFilterRedux from "../components/TodosRedux/TodoFilterRedux";
import TodoListRedux from "../components/TodosRedux/TodoListRedux";
import TodoEditorRedux from "../components/TodosRedux/TodoEditorRedux";
import StatsRedux from "../components/Todos/Stats";

const TodosViewRedux = () => {
  return (
    <>
      <TodoEditorRedux />
      {/* <TodoFilter onChangeFilter={filterTodoList} value={filter} />   */}
      <TodoListRedux />
    </>
  );
};

export default TodosViewRedux;
