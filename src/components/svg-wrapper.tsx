import { classNames } from "@/utils/other";
import React, { ReactElement } from "react";

interface SvgWrapperProps {
  children: ReactElement;
  className?: HTMLDivElement["className"];
  beforeContentClass?: HTMLDivElement["className"];
  afterContentClass?: HTMLDivElement["className"];
}

const SvgWrapper: React.FC<SvgWrapperProps> = ({
  children,
  className = "",
  beforeContentClass = "",
  afterContentClass = "",
}) => {
  return (
    <div
      className={classNames(
        "relative",
        className,
        beforeContentClass &&
          `before:absolute before:inset-0 before:w-full before:h-full before:z-[-2] ${beforeContentClass}`,
        afterContentClass &&
          `after:absolute after:inset-0 after:w-full after:h-full after:z-[-2] ${afterContentClass}`
      )}
    >
      {children}
    </div>
  );
};

export default SvgWrapper;
