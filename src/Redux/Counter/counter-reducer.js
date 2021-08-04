import { combineReducers } from "redux";
import { INCREMENT, DECREMENT, SET_STEP } from "./counter-types";

const initialState = {
  value: 0,
  step: 5,
};

const valueReducer = (state = initialState.value, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + payload;

    case DECREMENT:
      return state - payload;

    default:
      return state;
  }
};

const stepReducer = (state = initialState.step, { type, payload }) => {
  switch (type) {
    case SET_STEP:
      return payload;

    default:
      return state;
  }
};

const counterReducer = combineReducers({
  value: valueReducer,
  step: stepReducer,
});

export default counterReducer;
