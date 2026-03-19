import { clients } from "../../static-data/clients";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function OurClients() {
  return (
    <section className="py-20 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="mb-10">
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
              className="text-xl md:text-2xl tracking-wide font-bold text-gray-800 uppercase"
            >
              Our <span className="text-yellow-500">Clients</span>
            </motion.p>

          </div>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="bg-gray-50 rounded-3xl p-6 overflow-hidden">

          <Swiper
            modules={[Pagination, Autoplay]}

            loop={true}
            slidesPerView={3}
            spaceBetween={30}

            speed={5000} // 🔥 smooth flow

            autoplay={{
              delay: 0, // 🔥 continuous
              disableOnInteraction: false,
            }}

            pagination={{
              clickable: true,
              el: ".client-pagination",
            }}

            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >

            {clients.map((c, i) => (
              <SwiperSlide key={i}>

                <div className="flex items-center gap-3 p-4 
                bg-white rounded-xl border border-gray-100 shadow-sm
                hover:shadow-md transition">

                  <img
                    src={c.logo}
                    alt={c.name}
                    className="h-8 object-contain grayscale hover:grayscale-0 transition"
                  />

                  <p className="text-sm text-gray-700 whitespace-nowrap">
                    {c.name}
                  </p>

                </div>

              </SwiperSlide>
            ))}

          </Swiper>

          {/* DOTS */}
          <div className="client-pagination mt-6 flex justify-center"></div>

        </div>

      </div>
    </section>
  );
}