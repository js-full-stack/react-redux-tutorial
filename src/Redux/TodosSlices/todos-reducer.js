import { createSlice, combineReducers } from "@reduxjs/toolkit";
import shortid from "shortid";

const { actions, reducer } = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    deletedTodo: (state, { payload }) =>
      state.filter(({ id }) => id !== payload),
  },
});

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: (text) => {
        const id = shortid.generate();
        const completed = { completed: false };
        return { payload: { id, text, completed } };
      },
    },
    deleteTodo: {
      reducer: (state, { payload }) => {
        state.filter(({ id }) => id !== payload);
      },
    },
    toggleCompleted: {
      reducer: (state, { payload }) => {
        state.map((todo) =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        );
      },
    },
  },
});

export const { addTodo, deleteTodo, toggleCompleted } = actions;
export default reducer;

// import { ADD, DELETE, TOGGLE_COMPLETED, CHANGE_FILTER } from "./todos-types";

// const items = (state = [], { type, payload }) => {
//   switch (type) {
//     case ADD:
//       return [...state, payload];

//     case DELETE:
//       return state.filter(({ id }) => id !== payload);

//     case TOGGLE_COMPLETED:
//       return state.map((todo) =>
//         todo.id === payload ? { ...todo, completed: !todo.completed } : todo
//       );

//     default:
//       return state;
//   }
// };

//     (state = "", { type, payload }) => {
//   switch (type) {
//     case CHANGE_FILTER:
//       return payload;

//     default:
//       return state;
//   }
// };
