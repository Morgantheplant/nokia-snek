import React from 'react';

const GameOver = ({ score, highScore, height, width, isOn }) => (
  <div
    className={`game-over ${isOn ? "on" : ""}`}
    style={{
      height: `${5 * height}px`,
      width: `${5 * width}px`
    }}
  >
    <p>{`score: ${score}`}</p>
    <p>{`high score: ${highScore}`}</p>
  </div>
);

export default GameOver;