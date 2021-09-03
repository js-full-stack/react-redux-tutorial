import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { onIncrement, onDecrement, setStep } from "./counter-actions";
const initialState = {
  value: 0,
  step: 5,
};

const valueReducer = createReducer(initialState.value, {
  [onIncrement]: (state, { payload }) => state + payload,
  [onDecrement]: (state, { payload }) => state - payload,
});

const stepReducer = createReducer(initialState.step, {
  [setStep]: (_, { payload }) => payload,
});

const counterReducer = combineReducers({
  value: valueReducer,
  step: stepReducer,
});

export default counterReducer;

// const valueReducer = (state = initialState.value, { type, payload }) => {
//   switch (type) {
//     case INCREMENT:
//       return state + payload;

//     case DECREMENT:
//       return state - payload;

//     default:
//       return state;
//   }
// };

// const stepReducer = (state = initialState.step, { type, payload }) => {
//   switch (type) {
//     case SET_STEP:
//       return payload;

//     default:
//       return state;
//   }
// };
