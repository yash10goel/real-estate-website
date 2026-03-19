import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function ProjectsSection() {

  const projects = useSelector((s) => s.projects.list);

  return (
    <section className="py-20 bg-[#FFF7ED]">

      <div className="max-w-6xl mx-auto px-6">

        {/* TOP HEADER */}
        <div className="mb-14">

          <div className="mb-10">

            <div className="flex items-center gap-3 mb-3">

              {/* animated line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-[3px] bg-yellow-400"
              />

              {/* animated text */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl tracking-wide font-bold text-gray-800 uppercase"
              >
                Our <span className="text-yellow-500">Projects</span>
              </motion.p>

            </div>

          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 max-w-xl">
              Smart Solutions For Modern Construction Projects
            </h2>

            <p className="text-gray-600 max-w-md text-sm leading-relaxed">
              We deliver high-quality construction and real estate solutions
              with precision, innovation, and modern techniques tailored to
              your needs.
            </p>

          </div>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {projects.slice(0, 4).map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >

              {/* IMAGE */}
              <div className="h-40 overflow-hidden">
                <img
                  src={p.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <div className="flex items-center justify-between">

                  <h3 className="text-sm font-semibold text-gray-900">
                    {p.name}
                  </h3>

                  <span className="text-gray-400 group-hover:translate-x-1 transition">
                    →
                  </span>

                </div>

                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {p.description || "High-quality project execution with modern techniques and precision."}
                </p>

                {/* line */}
                <div className="mt-4 h-[1px] bg-gray-200 group-hover:bg-yellow-400 transition" />

              </div>

            </motion.div>
          ))}

        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-12">

          <button className="px-6 py-2 bg-yellow-400 text-black rounded-full text-sm font-medium shadow">
            Get a Quote
          </button>

          <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium">
            View All Projects
          </button>

        </div>

      </div>

    </section>
  );
}