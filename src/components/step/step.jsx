import React from "react";
import "./step.scss";

export const Step = ({ title, rate }) => {
  const getRate = r => {
    return { transform: `scaleX(${r})` };
  };
  return (
    <div className="step">
      <div className="">{title}</div>
      <div className="gage">
        <div className="gage__bar" style={{ transform: `scaleX(${rate})` }} />
      </div>
    </div>
  );
};
