import React from "react";
import Counter from "../components/Counter/Counter";
import CounterSlices from "../components/Counter/CounterSlices";

function CounterView() {
  return (
    <div>
      <Counter />
      <CounterSlices />
    </div>
  );
}

export default CounterView;
