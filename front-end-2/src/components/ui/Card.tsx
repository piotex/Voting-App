import React, { JSX, ReactNode } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  className?: string; // Opcjonalna właściwość
  onClick?: () => void; // Dodano opcjonalną właściwość onClick
}

interface CardContentProps {
  children: ReactNode;
  className?: string; // Opcjonalna właściwość
}

export function Card({
  children,
  className = "",
  onClick,
}: CardProps): JSX.Element {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: CardContentProps): JSX.Element {
  return <div className={`card-content ${className}`}>{children}</div>;
}
