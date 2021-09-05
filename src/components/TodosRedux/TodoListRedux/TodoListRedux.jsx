import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import {
  deleteTodo,
  toggleCompleted,
} from "../../../Redux/Todos/todos-actions";

import "./TodoList.scss";
const TodoListRedux = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  return (
    <>
      <ul className="TodoList">
        {todos.map(({ id, text, completed }) => (
          <li
            key={id}
            className={classNames("TodoList__item", {
              "TodoList__item--completed": completed,
            })}
          >
            <input
              type="checkbox"
              className="TodoList__checkbox"
              checked={completed}
              onChange={() => onToggleCompleted(id)}
            />
            <p className="TodoList__text">{text}</p>
            <button
              type="button"
              className="TodoList__btn"
              onClick={() => onDeleteTodo(id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.items,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
  onToggleCompleted: (todoId) => dispatch(toggleCompleted(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRedux);
