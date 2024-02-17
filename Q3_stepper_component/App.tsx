import React, { SetStateAction, useCallback, useState } from "react";
import { TCheckoutSteps } from "./types/checkout.types";
import Stepper from "./components/Stepper";

const CHECKOUT_STEPS: TCheckoutSteps[] = [
  {
    name: "Customer Info",
    desc: "Provide your contact details",
  },
  {
    name: "Shipping Info",
    desc: "Provide your shipping details",
  },
  {
    name: "Payment",
    desc: "Provide your payment details",
  },
  {
    name: "Order Placed",
    desc: "Order has been successfully placed",
  },
];

const App: React.FC = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSwitchToNextStep = useCallback(() => {
    setCurrentStep((prevStep: any) => {
      if (prevStep === CHECKOUT_STEPS.length) {
        setIsCompleted(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  }, []);

  return (
    <div id="App">
      <Stepper stepperConfig={CHECKOUT_STEPS} currentStep={currentStep} isCompleted={isCompleted} />
      <h3>{CHECKOUT_STEPS[currentStep - 1].desc}</h3>
      <button onClick={handleSwitchToNextStep}>
        {currentStep === CHECKOUT_STEPS.length ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default App;
