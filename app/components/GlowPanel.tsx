"use client";

import { ReactNode } from "react";

interface GlowPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlowPanel({ children, className = "" }: GlowPanelProps) {
  return (
    <div className={`relative ${className}`} style={{ overflow: "visible" }}>
      {/* Soft ambient mint glow behind panel */}
      <div 
        className="absolute inset-0 -z-20"
        style={{
          background: "radial-gradient(circle, rgba(76, 242, 199, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "scale(1.3)",
          top: "-20px",
          bottom: "-20px",
          left: "-20px",
          right: "-20px",
        }}
      />

      {/* Panel background */}
      <div 
        className="absolute -z-10"
        style={{
          top: "-24px",
          left: "-24px",
          right: "-24px",
          bottom: "-24px",
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(76, 242, 199, 0.25)",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(76, 242, 199, 0.1)",
        }}
      >
        {/* Dotted glowing line at top */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "14px",
            width: "85%",
            height: "2px",
            background: "repeating-linear-gradient(to right, #4CF2C7 0px, #4CF2C7 5px, transparent 5px, transparent 10px)",
            filter: "drop-shadow(0 0 6px rgba(76, 242, 199, 0.8)) drop-shadow(0 0 12px rgba(76, 242, 199, 0.4))",
            opacity: 0.9,
          }}
        />
      </div>

      {/* Content (image) on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
