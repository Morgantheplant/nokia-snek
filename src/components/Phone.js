import React from "react";
import Screen from "./Screen";
import NumberPad from "./NumberPad";
import Key from "./Key";
import { connect } from "react-redux";
import { pressButton } from "../actions";
import { numbersReducer } from "../selectors";
import { BUTTON_NAMES } from "../constants";

const Phone = props => (
  <div className="phone-base">
    <div className="phone-container">
      <Screen />
      <Key
        isOn={props.isOn}
        isPressed={props.keyPressMap.home}
        name={BUTTON_NAMES.HOME}
        onClick={props.pressButton}
      />
      <Key
        isOn={props.isOn}
        isPressed={props.keyPressMap.clear}
        name={BUTTON_NAMES.CLEAR}
        onClick={props.pressButton}
      />
      <Key
        isOn={props.isOn}
        isPressed={props.keyPressMap.down}
        name={BUTTON_NAMES.DOWN}
        onClick={props.pressButton}
      />
      <Key
        isOn={props.isOn}
        isPressed={props.keyPressMap.up}
        name={BUTTON_NAMES.UP}
        onClick={props.pressButton}
      />
      <NumberPad
        isOn={props.isOn}
        keyPad={props.keyPad}
        keyPressMap={props.keyPressMap}
        onClick={props.pressButton}
      />
      <img src="./images/Nokia_5110.png" alt="nokia 5110" />
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
