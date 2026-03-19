import { motion } from "framer-motion";

export default function ProjectCard({ project }) {

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group min-w-[calc(100%/3-16px)] h-[380px] rounded-xl overflow-hidden
bg-[#0f172a] border border-white/10 shadow-lg"
    >

      {/* IMAGE */}
      <div className="h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          {project.type}
        </span>

        <h3 className="text-white text-lg font-semibold mt-3">
          {project.name}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          📍 {project.city}
        </p>

        <button className="mt-4 text-blue-400 text-sm font-semibold hover:translate-x-1 transition">
          View Project →
        </button>

      </div>

    </motion.div>
  );
}