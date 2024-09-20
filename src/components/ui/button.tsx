"use client";

import { classNames } from "@/utils/other";
import { Slot, Slottable } from "@radix-ui/react-slot";
import React, { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant =
  | "default"
  | "playCpu"
  | "playPlayer"
  | "continueGame"
  | "quitGame";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  asChild?: boolean;
  children: React.ReactNode;
  shadowVariant?: string;
  borderVariant?: string;
  hoverEffect?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      leftElement,
      rightElement,
      children,
      className,
      asChild = false,
      shadowVariant,
      borderVariant,
      hoverEffect = true,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      "transition-colors duration-300 px-4 py-2 rounded rounded-[28px] font-bold";

    const variantStyles = {
      default: "bg-purple-light hover:bg-pink text-white",
      playCpu:
        "bg-pink text-white shadow-[0_10px_0_rgba(0,0,0,1)] border-black border-[3px] hover:border-purple-light hover:shadow-[0_10px_0_rgba(92,45,213,1)] transition-none",
      playPlayer:
        "bg-yellow text-black border-black shadow-[0_10px_0_rgba(0,0,0,1)] border-[3px] hover:border-purple-light hover:shadow-[0_10px_0_rgba(92,45,213,1)] transition-none",
      continueGame:
        "bg-white text-black border-black border-[3px] shadow-[0_10px_0_rgba(0,0,0,1)] hover:border-purple-light hover:shadow-[0_10px_0_rgba(92,45,213,1)] transition-none",
      quitGame:
        "bg-pink text-white border-black border-[3px] shadow-[0_10px_0_rgba(0,0,0,1)] hover:border-purple-light hover:shadow-[0_10px_0_rgba(92,45,213,1)] transition-none",
    };

    const hoverStyles = hoverEffect
      ? "hover:bg-purple-500 hover:border-purple-600"
      : "";

    const buttonClasses = classNames(
      baseStyles,
      shadowVariant,
      borderVariant,
      variantStyles[variant],
      { "flex justify-between items-center": leftElement || rightElement },
      className
    );

    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={buttonClasses} ref={ref} {...rest}>
        {leftElement && leftElement}
        <Slottable>{children}</Slottable>
        {rightElement && rightElement}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
