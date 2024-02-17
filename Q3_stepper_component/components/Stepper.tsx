import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { TStepperProps } from "../types/checkout.types";

import "./stepper.css";

const Stepper: React.FC<TStepperProps> = ({ stepperConfig, currentStep, isCompleted }) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const mapId = useId();
  const stepRef = useRef<any[]>([]);

  const calculateProgress = useCallback(() => {
    const width = ((currentStep - 1) / (stepperConfig.length - 1)) * 100;
    setProgressWidth(width);
  }, [currentStep, stepperConfig]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepperConfig.length - 1].offsetWidth,
    });
  }, [stepRef]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  if (!stepperConfig.length) return <></>;

  console.log("margins", margins);

  return (
    <div className="stepper-main-container">
      {stepperConfig.map((value, index) => {
        return (
          <div
            className={`stepper-node ${
              currentStep > index + 1 || isCompleted
                ? "complete"
                : currentStep === index + 1
                ? "active"
                : ""
            }`}
            key={mapId + index}
            ref={(element) => (stepRef.current[index] = element)}
          >
            <div className="step-index">
              {currentStep > index + 1 || isCompleted ? (
                <span>&#10003;</span>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="step-name">{value.name}</div>
          </div>
        );
      })}
      <div
        className="progresss-bar"
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
      >
        <div className="progress" style={{ width: `${progressWidth}%` }} />
      </div>
    </div>
  );
};

export default Stepper;
