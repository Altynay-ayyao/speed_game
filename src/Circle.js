import React from "react";

const Circle = (props) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className="circle"
      onClick={props.whatever}
    >
      <p>{props.id}</p>
    </div>
  );
};

export default Circle;
