import { motion } from "framer-motion";
import { Compass, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../seo/Seo";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <Seo
        title="Page Not Found | RKGC Group"
        description="The page you're looking for doesn't exist. Return to the RKGC Group homepage to explore our projects, brands and services."
        path="/404"
        noindex
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-xl"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Compass size={26} className="text-primary" />
        </div>

        <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          Error 404
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-secondary dark:text-white">
          Page Not Found
        </h1>

        <p className="text-secondary/60 dark:text-white/60 mb-9 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Head back to the RKGC Group homepage to continue exploring.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-secondary font-semibold shadow-glow hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
