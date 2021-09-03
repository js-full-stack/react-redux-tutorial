import { createAction } from "@reduxjs/toolkit";

export const onIncrement = createAction("counter/Increment");
export const onDecrement = createAction("counter/Decrement");
export const setStep = createAction("counter/SetStep");

// export const onIncrement = (payload) => ({
//   type: INCREMENT,
//   payload,
// });

// export const onDecrement = (payload) => ({
//   type: DECREMENT,
//   payload,
// });

// export const setStep = (payload) => ({
//   type: SET_STEP,
//   payload,
// });
