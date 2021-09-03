import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  step: 5,
};

const { actions, reducer } = createSlice({
  name: "counter/toolkit/slice",
  initialState,
  reducers: {
    onIncrement: ({ value, payload }) => {
      value += payload;
    },
    onDecrement: ({ value, payload }) => {
      value -= payload;
    },
    setStep: ({ step, payload }) => {
      step = payload;
    },
  },
});

export const { onIncrement, onDecrement, setStep } = actions;
export default reducer;
