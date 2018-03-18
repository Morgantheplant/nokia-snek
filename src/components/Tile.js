import React from "react";

const prettyColor = (a, b, c, d) => {
  const hue = d ? a : 57;
  const sat = d ? 60 : 20;
  return `hsl(${hue - b}, ${sat - c}%, 40%)`;
};

const snakeColor = "rgb(3,83,59)";
const borderColorOn = "rgba(42, 163, 122, 0.5)";

const getColor = ({ col, colorBase, isOn, row, type }) => {
  switch (type) {
    case 1:
      return snakeColor;
    default:
      const color = isOn ? colorBase : 57;
      return prettyColor(color, row, col, isOn);
  }
};

const Snack = ({ backgroundColor }) => (
  <div className="snack">
    <div className="middle" style={{ backgroundColor }} />
    <div className="vertical" />
    <div className="horizontal" />
  </div>
);

// 0 - empty tile, 1 - snake, 2 - snack
const Tile = ({ col, colorBase, isOn, row, tileSize = 10, type }) => {
  const backgroundColor = getColor({
    col,
    colorBase,
    isOn,
    row,
    type
  });
  return (
    <div
      className={`tile-${row}-${col}-${type}`}
      style={{
        backgroundColor,
        border: `.5px solid ${isOn
          ? borderColorOn
          : getColor({
              type,
              colorBase: colorBase - 10,
              row: row - 1,
              col,
              isOn
            })}`,
        height: `${tileSize}px`,
        left: `${row * tileSize}px`,
        position: "absolute",
        top: `${col * tileSize}px`,
        width: `${tileSize}px`
      }}
    >
      {type === 2 && <Snack backgroundColor={backgroundColor} />}
    </div>
  );
};

export default Tile;
