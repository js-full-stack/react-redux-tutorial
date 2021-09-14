import { createSelector } from "@reduxjs/toolkit";

export const getLoading = (state) => state.todos.loading;

export const getFilterValue = (state) => state.todos.filter;
export const getAllTodos = (state) => state.todos.items;

// export const getVisibleTodos = (state) => {
//   const filter = getFilterValue(state);
//   const allTodos = getAllTodos(state);
//   const normalizedFilter = filter.toLowerCase();
//   return allTodos.filter(({ text }) =>
//     text.toLowerCase().includes(normalizedFilter)
//   );
// };

export const getVisibleTodos = createSelector(
  [getFilterValue, getAllTodos],
  (filter, allTodos) => {
    const normalizedFilter = filter.toLowerCase();
    return allTodos.filter(({ text }) =>
      text.toLowerCase().includes(normalizedFilter)
    );
  }
);
