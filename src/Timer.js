import React, { Component } from "react";

/**
 * React builds a virtual DOM when it renders JSX, allowing it to update the actual DOM in a very efficient way.Accessing the DOM directly comes with some caution as it circumvents React's default behavior. For this reason, it is better to handle most style changes using an external CSS file or in-line within JSX, if possible.
 * */

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here
  componentDidUpdate() {
    // using ref here will override the style property in the DOM but does not set the state
    this.timer.current.style.color =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.time !== nextState.time
  }


  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
