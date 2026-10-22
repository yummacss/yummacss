"use client";

import React from "react";

interface StepperProps {
  children: React.ReactNode;
}

interface StepProps {
  children: React.ReactNode;
  title?: string;
}

interface InjectedStepProps {
  stepNumber?: number;
  isLast?: boolean;
}

export function Stepper({ children }: StepperProps) {
  const childArray = React.Children.toArray(children);

  return (
    <ol className="p:r ml:4 bc:border blw:2 bs:d">
      {childArray.map((child, i) => {
        if (React.isValidElement<StepProps & InjectedStepProps>(child)) {
          return React.cloneElement(child, {
            stepNumber: i + 1,
            isLast: i === childArray.length - 1,
          });
        }
        return child;
      })}
    </ol>
  );
}

export function Step({
  children,
  title,
  stepNumber,
  isLast,
}: StepProps & InjectedStepProps) {
  return (
    <li className={isLast ? "ml:8" : "mb:10 ml:8"}>
      <div className="d:f p:a l:-3 ai:c jc:c w:6 h:6 bc:border bg:surface bw:1">
        <span className="c:accent fs:xs">{stepNumber}</span>
      </div>
      <div className="d:f ai:c mb:2">
        <p className="c:ink">{title}</p>
      </div>
      <div className="my:5 c:ink/80">{children}</div>
    </li>
  );
}

export default Stepper;
