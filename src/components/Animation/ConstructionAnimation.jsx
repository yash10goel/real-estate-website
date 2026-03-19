import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

export default function ConstructionAnimation() {
  return (
    <div className="relative flex items-center justify-center mt-16">

      {/* glow */}
      <div className="absolute w-[520px] h-[520px] bg-yellow-400/20 blur-[200px] rounded-full"></div>

      {/* animation */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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