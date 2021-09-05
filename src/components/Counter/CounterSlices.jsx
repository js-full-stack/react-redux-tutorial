import { connect } from "react-redux";
import * as actions from "../../Redux/CounterSlices/counter-reducer";
import Counter from "./Counter.presentational";

const mapStateToProps = ({ counterSlices: { value, step } }) => ({
  value,
  step,
});

export default connect(mapStateToProps, actions)(Counter);
