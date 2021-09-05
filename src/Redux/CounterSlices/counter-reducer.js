import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  step: 5,
};

const { actions, reducer } = createSlice({
  name: "counter/toolkit/slice",
  initialState,
  reducers: {
    onIncrement: (state, { payload }) => {
      state.value += payload;
    },
    onDecrement: (state, { payload }) => {
      state.value -= payload;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
  },
});

export const { onIncrement, onDecrement, setStep } = actions;
export default reducer;
