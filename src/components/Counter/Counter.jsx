import React from "react";
import Controls from "./Controls";
import Value from "./Value";
import "./Counter.css";
import { connect } from "react-redux";
import { increment, decrement } from "../../Redux/actions";
const Counter = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="Counter">
      <Value value={value} />

      <Controls onIncrement={onIncrement} onDecrement={onDecrement} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    value: state.counterValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
