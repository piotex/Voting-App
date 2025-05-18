import React, { JSX, ReactNode } from "react";
import "./CardContent.css";

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({
  children,
  className = "",
}: CardContentProps): JSX.Element {
  return <div className={`card-content ${className}`}>{children}</div>;
}
