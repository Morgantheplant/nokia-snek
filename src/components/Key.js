import React, { Component } from "react";

export class Key extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.name);
  }
  render() {
    const { isOn, name, isPressed } = this.props;
    const keyName = `key ${name}`;
    const pressedClass = isPressed ? "pressed" : "";
    return (
      <div className={`${keyName} ${pressedClass}`} onClick={this.handleClick}>
        <img
          className={isOn ? "" : "hidden"}
          src={`./images/${name}-on.png`}
          alt={keyName}
        />
        <img
          className={isOn ? "hidden" : ""}
          src={`./images/${name}.png`}
          alt={keyName}
        />
      </div>
    );
  }
}

export default Key;
