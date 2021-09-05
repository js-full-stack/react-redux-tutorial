import { connect } from "react-redux";
import * as actions from "../../Redux/Counter/counter-actions";
import Counter from "./Counter.presentational";

const mapStateToProps = ({ counter: { value, step } }) => ({
  value,
  step,
});

// const mapDispatchToProps = {
//   onIncrement: actions.increment,
//   onDecrement: actions.decrement,
//   setStep: actions.step,
// };

export default connect(mapStateToProps, actions)(Counter);
