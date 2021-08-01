import React from "react";
import Controls from "./Controls";
import Value from "./Value";
import "./Counter.css";
import { connect } from "react-redux";

const Counter = ({ value }) => {
  return (
    <div className="Counter">
      <Value value="" />

      <Controls onIncrement="" onDecrement="" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    value: state.counterValue,
  };
};

export default connect(mapStateToProps)(Counter);
