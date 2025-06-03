import React from "react";
import "./css/Logo.css";

export default function Logo() {
  return (
    <div className="header-logo">
      <a href="/">
        <img src="/logo192.png" alt="Logo aplikacji" />
        <div className="logo-space-1"></div>
        <div className="logo-space-text">Kubon Tech</div>
      </a>
    </div>
  );
}
