export const increment = (value) => ({
  type: "counter/Increment",
  payload: value + 1,
});

export const decrement = (value) => ({
  type: "counter/Decrement",
  payload: value - 1,
});
