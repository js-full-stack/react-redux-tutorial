import React from "react";
import CounterStateComponent from "../components/Counter/CounterStateComponent";
import Counter from "../components/Counter/Counter";
import CounterSlices from "../components/Counter/CounterSlices";

function CounterView() {
  return (
    <div>
      <Counter />
      <CounterSlices />
      <CounterStateComponent />
    </div>
  );
}

export default CounterView;
