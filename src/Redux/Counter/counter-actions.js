import { INCREMENT, DECREMENT, SET_STEP } from "./counter-types";

export const onIncrement = (payload) => ({
  type: INCREMENT,
  payload,
});

export const onDecrement = (payload) => ({
  type: DECREMENT,
  payload,
});

export const setStep = (payload) => ({
  type: SET_STEP,
  payload,
});
