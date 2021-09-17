import React, {  useState } from "react";
import Controls from "./Controls";
import Value from "./Value";
import CheckForNumber from "./CheckForNumber";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleIncrement2 = () => {
    setCount2((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleDecrement2 = () => {
    setCount2((prevCount) => prevCount - 1);
  };

  return (
    <div className="Counter">
      <Value value={count} />
      <Controls onIncrement={handleIncrement} onDecrement={handleDecrement} />
      <CheckForNumber value={count} />

      <Value value={count2} />
      <Controls onIncrement={handleIncrement2} onDecrement={handleDecrement2} />
    </div>
  );
};

// class Counter extends Component {
//   static defaultProps = {
//     initialValue: 0,
//   };

//   state = {
//     value: this.props.initialValue,
//   };

//   handleIncrement = () => {
//     let i = 0;
//     while (i < 500000000) i++;

//     this.setState((prevState) => ({
//       value: prevState.value + 1,
//     }));
//   };

//   handleDecrement = () => {
//     let i = 0;
//     while (i < 500000000) i++;
//     this.setState((prevState) => ({
//       value: prevState.value - 1,
//     }));
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <div className="Counter">
//         <Value value={value} />

//         <Controls
//           onIncrement={this.handleIncrement}
//           onDecrement={this.handleDecrement}
//         />
//       </div>
//     );
//   }
// }

export default Counter;
