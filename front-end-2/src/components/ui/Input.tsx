import React, { ChangeEventHandler, JSX } from "react";
import "./Input.css";

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string; // Opcjonalny placeholder
  className?: string; // Opcjonalne klasy CSS
}

export function Input({
  value,
  onChange,
  placeholder,
  className,
}: InputProps): JSX.Element {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className ?? ""}`}
    />
  );
}
