import React from 'react';
import Key from './Key';

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

export default NumberPad;