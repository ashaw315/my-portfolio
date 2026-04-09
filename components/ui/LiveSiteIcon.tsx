"use client";

import { useState } from "react";

export default function LiveSiteIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient
            id="rainbow-gradient-live"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF8FA3" />
            <stop offset="16%" stopColor="#FFB347" />
            <stop offset="33%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#77DD77" />
            <stop offset="66%" stopColor="#74B9E7" />
            <stop offset="83%" stopColor="#B39DDB" />
            <stop offset="100%" stopColor="#FF8FA3" />
          </linearGradient>
        </defs>

        {/* Full circle — spins with rainbow gradient on hover */}
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke={
            isHovered ? "url(#rainbow-gradient-live)" : "var(--color-muted)"
          }
          className={isHovered ? "circle-spinning" : undefined}
        />

        {/* Play triangle — filled, right-pointing, centered in circle */}
        <polygon
          points="10,8.5 10,15.5 16,12"
          fill={isHovered ? "var(--color-accent)" : "var(--color-muted)"}
          stroke="none"
          style={{ transition: "fill 150ms ease" }}
        />
      </svg>
    </span>
  );
}
