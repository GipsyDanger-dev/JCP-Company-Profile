"use client";

import type { CSSProperties, ReactNode } from "react";

type GlareHoverProps = {
  children: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  className?: string;
  style?: CSSProperties;
};

export function GlareHover({ children, glareColor = "#ffffff", glareOpacity = 0.35, glareAngle = -45, glareSize = 60, transitionDuration = 650, className = "", style }: GlareHoverProps) {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars = {
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": rgba,
  } as CSSProperties;

  return (
    <div className={`glare-hover ${className}`.trim()} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}
