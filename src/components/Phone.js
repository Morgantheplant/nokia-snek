import React from "react";
import Screen from "./Screen";
import NumberPad from "./NumberPad";
import Key from "./Key";
import { connect } from "react-redux";
import { pressButton } from "../actions";
import { numbersReducer } from "../selectors";
import { BUTTON_NAMES } from '../constants';

const Phone = props => (
  <div className="phone-base">
    <div className="phone-container">
      <Screen />
      <Key
        onClick={props.pressButton}
        name={BUTTON_NAMES.HOME}
        isPressed={props.keyPressMap.home}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name={BUTTON_NAMES.DOWN}
        isPressed={props.keyPressMap.down}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name={BUTTON_NAMES.UP}
        isPressed={props.keyPressMap.up}
        isOn={props.isOn}
      />
      <Key
        onClick={props.pressButton}
        name={BUTTON_NAMES.CLEAR}
        isPressed={props.keyPressMap.clear}
        isOn={props.isOn}
      />
      <NumberPad
        keyPressMap={props.keyPressMap}
        keyPad={props.keyPad}
        isOn={props.isOn}
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
