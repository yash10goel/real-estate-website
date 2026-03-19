import { useEffect, useState } from "react";

export default function CursorSpotlight() {

  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);

  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(59,130,246,0.18), transparent 40%)`
      }}
    />
  );
}