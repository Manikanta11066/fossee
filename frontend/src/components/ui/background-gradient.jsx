import React from "react";
import "./background-gradient.css"; // small css specific to the gradient wrapper

export default function BackgroundGradient({ children, className = "", style = {} }) {
  return (
    <div className={`bg-gradient-root ${className}`} style={style}>
      <div className="bg-gradient-inner">
        {children}
      </div>
    </div>
  );
}
