import React from "react";
import * as _ from "lodash";
import { Step } from "./step";
import "./step.scss";

export const StepWrapper = ({ steps }) => {
  return (
    <div className="step-wrapper">
      {_.map(steps, (step, index) => {
        return <Step title={step.title} rate={step.rate} key={index} />;
      })}
    </div>
  );
};
