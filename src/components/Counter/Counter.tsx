import React from "react";
import "./Counter.css";

interface CounterProps {
  initialValue?: number;
}

interface CounterState {
  value: number;
}

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { value: props.initialValue ?? 0 };
  }

  increment = () => this.setState(({ value }) => ({ value: value + 1 }));
  decrement = () => this.setState(({ value }) => ({ value: value - 1 }));

  render() {
    return React.createElement(
      "div",
      { className: "counter" },
      React.createElement(
        "button",
        { className: "counter-btn", onClick: this.decrement },
        "-"
      ),
      React.createElement(
        "span",
        { className: "counter-value" },
        this.state.value
      ),
      React.createElement(
        "button",
        { className: "counter-btn", onClick: this.increment },
        "+"
      )
    );
  }
}
