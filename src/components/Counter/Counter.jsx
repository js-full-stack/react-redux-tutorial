import React from "react";
import Controls from "./Controls";
import Value from "./Value";
import "./Counter.css";
import { connect } from "react-redux";
import { increment, decrement } from "../../Redux/Counter/counter-actions";
const Counter = ({ value, step, onIncrement, onDecrement }) => {
  return (
    <div className="Counter">
      <Value value={value} />

      <Controls
        onIncrement={() => onIncrement(step)}
        onDecrement={() => onDecrement(step)}
        step={step}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    value: state.counter.value,
    step: state.counter.step,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: (value) => dispatch(increment(value)),
    onDecrement: (value) => dispatch(decrement(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
