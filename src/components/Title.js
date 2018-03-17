import React from 'react';

const Title = props => 
  <img className="snake title-screen" src={`./images/title${ props.isOn ? '-on' : ''}.png`} alt="Snake"/>;


export default Title;  