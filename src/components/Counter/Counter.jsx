import React from "react";
import Controls from "./Controls";
import Value from "./Value";
import "./Counter.css";
import { connect } from "react-redux";
import * as actions from "../../Redux/Counter/counter-actions";

const Counter = ({ value, step, setStep, onIncrement, onDecrement }) => {
  const handleChangeStep = (e) => setStep(Number(e.target.value));
  const handleIncrement = () => onIncrement(step);
  const handleDecrement = () => onDecrement(step);

  return (
    <div className="Counter">
      <select value={step} onChange={handleChangeStep}>
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <Value value={value} />

      <Controls
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
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

// const mapDispatchToProps = {
//   onIncrement: actions.increment,
//   onDecrement: actions.decrement,
//   setStep: actions.step,
// };

export default connect(mapStateToProps, actions)(Counter);
