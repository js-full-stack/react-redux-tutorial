import React from "react";
import classNames from "classnames";
import "./TodoList.scss";
const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  // const completedTodoCount = todos.reduce(
  //   (total, todo) => (todo.completed === true ? total + 1 : total),
  //   0
  // );
  return (
    <>
      {/* <p>Всего задач: {todos.length}</p>
      <p>Выполнено: {completedTodoCount}</p> */}
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
export default TodoList;
