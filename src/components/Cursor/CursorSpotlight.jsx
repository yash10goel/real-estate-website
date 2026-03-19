import { useState } from "react";

export default function CursorSpotlight({ children }) {

  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }

  return (
    <div
      onMouseMove={handleMove}
      className="relative"
    >

      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition"
        style={{
          background: `radial-gradient(
            400px circle at ${pos.x}px ${pos.y}px,
            rgba(255,215,0,0.18),
            transparent 40%
          )`
        }}
      />

      {children}

    </div>
  );
}