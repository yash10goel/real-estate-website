import { motion } from "framer-motion";
import { Hammer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6
    bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50
    dark:from-[#0f0f0f] dark:via-[#111] dark:to-[#1a1a1a]">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-300/30 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-xl"
      >

        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
          bg-yellow-400 text-black shadow-lg"
        >
          <Hammer size={32} />
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
          Page Under Construction 🚧
        </h1>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          This page is currently being built. We’re working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full
          bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium shadow-lg"
        >
          <ArrowLeft size={18} /> Back to Home
        </motion.button>

      </motion.div>
    </div>
  );
}
