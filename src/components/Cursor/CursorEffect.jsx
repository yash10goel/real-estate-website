import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorHighlight() {

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
    >
      {/* soft golden glow halo */}
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/25 blur-2xl"
      />

      {/* outer circle */}
      <div className="relative w-10 h-10 rounded-full border border-yellow-400/80 flex items-center justify-center">

        {/* center dot */}
        <div className="w-2 h-2 rounded-full bg-yellow-400" />

      </div>
    </motion.div>
  );
}