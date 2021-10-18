import { Component } from "react";

export default class Clock extends Component {
  state = {
    time: new Date(),
  };

  intervalId = null;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop = () => {
    clearInterval(this.intervalId);
  };

  render() {
    return (
      <>
        <p>Текущее время: {this.state.time.toLocaleTimeString()}</p>
        <button type="button" onClick={this.stop}>
          Stop
        </button>
      </>
    );
  }
}
