import React, { JSX, ReactNode, MouseEvent } from "react";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  className,
  disabled,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`button ${className ?? ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
