import { testimonials } from "../../static-data/testimonials";
import { motion } from "framer-motion";

export default function Testimonials() {

  return (
    <section className="relative py-20 bg-[#fafafa] overflow-hidden">

      {/* LIGHT GLOW */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px]
      bg-yellow-200/30 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADING (same as clients) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[3px] bg-yellow-400"
            />

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-bold text-gray-800 uppercase"
            >
              Client <span className="text-yellow-500">Testimonials</span>
            </motion.p>

          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((t, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative 
bg-gradient-to-br from-white to-yellow-50 
border border-yellow-100 
rounded-xl p-6 
shadow-[0_10px_30px_rgba(250,204,21,0.15)]
hover:shadow-[0_15px_40px_rgba(250,204,21,0.25)]
transition"
            >

              {/* QUOTE */}
              <div className="text-yellow-400 text-3xl mb-4">
                “
              </div>

              {/* TEXT */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                {t.text}
              </p>

              {/* USER */}
              <div className="flex items-center gap-3 mt-6">

                <div className="w-10 h-10 flex items-center justify-center
                bg-yellow-400 text-black rounded-full text-sm font-semibold">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    {t.name}
                  </p>

                  <div className="text-yellow-500 text-xs">
                    ★★★★★
                  </div>
                </div>

              </div>

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.12),transparent_70%)]" />

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  )
}