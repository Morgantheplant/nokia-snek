import React from "react";
import Screen from "./Screen";
import NumberPad from "./NumberPad";
import Key from "./Key";
import { connect } from "react-redux";
import { pressButton } from "../actions";
import { numbersReducer } from "../selectors";

const Phone = props => (
  <div className="phone-base">
    <div className="phone-container">
      <Screen />
      <Key
        onClick={props.pressButton}
        name="home"
        isPressed={props.keyPressMap.home}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name="down"
        isPressed={props.keyPressMap.down}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name="up"
        isPressed={props.keyPressMap.up}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name="clear"
        isPressed={props.keyPressMap.clear}
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
  pressButton
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
