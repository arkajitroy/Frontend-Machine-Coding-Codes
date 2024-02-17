export type TCheckoutSteps = {
  name: string;
  desc: string;
};

export type TStepperProps = {
  stepperConfig: TCheckoutSteps[];
  currentStep: number;
  isCompleted: boolean;
};
