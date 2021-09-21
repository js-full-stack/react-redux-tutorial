const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [...state, action.payload.newTodo];

    case "removeTodo":
      return state.filter((todo) => todo.id !== action.payload.todoId);

    case "toggleCompleted":
      return state.map((todo) =>
        todo.id === action.payload.todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
};
