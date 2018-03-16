import React, { Component } from "react";
import App from "./index";
import { connect } from "react-redux";
import { pressButton, newGameHandler } from "./actions";
import { numbersReducer } from "./selectors";

export class Key extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.name);
  }
  render() {
    const { isOn, name } = this.props;
    const keyName = `key ${name}`;
    const pressedClass = this.props.isPressed ? "pressed" : "";
    return (
      <div className={`${keyName} ${pressedClass}`} onClick={this.handleClick}>
        <img src={`./images/${name}${isOn ? "-on" : ""}.png`} alt={keyName} />
      </div>
    );
  }
}

const NumberPad = props => (
  <div className="number-pad">
    {props.keyPad.map(number => {
      const name = `button${number}`;
      return (
        <Key
          key={number}
          name={name}
          isOn={props.isOn}
          isPressed={props.keyPressMap[name]}
          onClick={props.onClick}
        />
      );
    })}
  </div>
);

const Phone = props => (
  <div className="phone-base">
    <div className="phone-container">
      <App />
      <Key
        onClick={props.newGameHandler}
        name="home"
        isPressed={props.keyPressMap["home"]}
        isOn={props.isOn}
      />
      <Key
        //onClick={props.newGameHandler}
        name="down"
        isPressed={props.keyPressMap["down"]}
        isOn={props.isOn}
      />
      <Key
       // onClick={props.newGameHandler}
        name="up"
        isPressed={props.keyPressMap["up"]}
        isOn={props.isOn}
      />
      <Key
        //onClick={props.newGameHandler}
        name="clear"
        isPressed={props.keyPressMap["clear"]}
        isOn={props.isOn}
      />

      <NumberPad
        keyPressMap={props.keyPressMap}
        keyPad={props.keyPad}
        isOn={props.isOn}
        onClick={props.pressButton}
      />
      <img src="./images/Nokia_5110_.png" alt="noke 5110" />
    </div>
  </div>
);

const mapStateToProps = state => {
  const { buttonsOn: isOn, keyPad, keyPressMap } = numbersReducer(state);
  return {
    isOn,
    keyPad,
    keyPressMap
  };
};

const mapDispatchToProps = {
  pressButton,
  newGameHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
