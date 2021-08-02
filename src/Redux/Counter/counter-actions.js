import { INCREMENT, DECREMENT } from "./counter-types";

export const increment = (value) => ({
  type: INCREMENT,
  payload: value,
});

export const decrement = (value) => ({
  type: DECREMENT,
  payload: value,
});
