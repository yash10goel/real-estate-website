import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

export default function ConstructionAnimation() {
  return (
    <div className="relative flex items-center justify-center mt-16">

      {/* glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[520px] h-[520px] bg-primary/20 blur-[200px] rounded-full"
      />

      {/* animation */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 0.6, 0, -0.6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 scale-[1.7]"
      >
        <DotLottieReact
          src="/animations/architecture-construction.lottie"
          loop
          autoplay
          style={{
            width: "680px",
            height: "680px",
          }}
        />
      </motion.div>

    </div>
  );
}
