"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
};

export function Magnet({ children, padding = 180, magnetStrength = 3 }: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const nearX = Math.abs(centerX - event.clientX) < width / 2 + padding;
      const nearY = Math.abs(centerY - event.clientY) < height / 2 + padding;
      if (nearX && nearY) {
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, magnetStrength]);

  return (
    <div className="magnet" ref={ref} style={{ display: "inline-flex" }}>
      <div style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: isActive ? "transform .3s ease-out" : "transform .5s ease-in-out", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
