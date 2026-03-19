import { team } from "../../static-data/team";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function TeamSection() {
  return (
    <section className="relative py-24 bg-[#fafafa] overflow-hidden">

      {/* SOFT BG GLOW */}
      <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-yellow-200/30 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* TOP HEADING */}
      

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
                Our <span className="text-yellow-500">TEAM</span>
              </motion.p>

            </div>

          </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-semibold text-gray-900 leading-tight mb-6">
              The People Behind{" "}
              <span className="text-yellow-500">Great Work</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              Our team blends creativity and expertise to deliver high-quality
              results with precision and innovation.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Strong collaboration culture",
                "Focus on innovation & quality",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                  <p className="text-gray-600">{t}</p>
                </div>
              ))}
            </div>

            <button className="px-7 py-3 bg-yellow-400 text-black font-medium rounded-full hover:scale-105 transition shadow-md">
              Get a Quote →
            </button>
          </motion.div>

          {/* RIGHT */}
          <div className="grid sm:grid-cols-2 gap-8">

            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-6 rounded-2xl 
                border border-gray-100 shadow-sm 
                hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                {/* TOP */}
                <div className="flex items-center gap-4 mb-4">

                  <div className="relative">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition"></div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-sm text-yellow-600 font-medium">
                      {m.role}
                    </p>
                  </div>

                </div>

                {/* DESC */}
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  Sample text. Click to edit. Double click to start editing the content.
                </p>

                {/* SOCIAL */}
                <div className="flex gap-3">
                  {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 flex items-center justify-center 
                      rounded-full border border-gray-200 text-gray-500
                      hover:bg-yellow-400 hover:text-black hover:border-yellow-400
                      transition cursor-pointer"
                    >
                      <Icon size={14} />
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}