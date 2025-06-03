import React from "react";
import "./css/Menu.css";

export default function Menu() {
  return (
    <div className="header-menu">
      <a href="/">
        <div className="header-menu-elem">Home</div>
      </a>
      <a href="/">
        <div className="header-menu-elem">O mnie</div>
      </a>
    </div>
  );
}
