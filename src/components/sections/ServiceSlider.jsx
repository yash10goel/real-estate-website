import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { services } from "../../static-data/services";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ServiceSlider() {
  return (
    <section className="relative py-24 bg-[#fafafa] overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 
      w-[500px] h-[500px] bg-yellow-200/20 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADING */}
        <div className="mb-16">
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
              className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-wide"
            >
              Our <span className="text-yellow-500">Services</span>
            </motion.p>

          </div>
        </div>

        {/* SLIDER */}
        <div className="relative px-12">

          <Swiper
            modules={[Navigation, Pagination]}
            loop
            centeredSlides
            slidesPerView={1.2}
            spaceBetween={28}

            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}

            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}

            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >

            {services.map((item, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (

                  <div
                    className={`group relative h-[400px] rounded-2xl overflow-hidden 
                    transition-all duration-500
                    ${isActive ? "scale-[1.05]" : "opacity-70"}`}
                  >

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

                    {/* CONTENT */}
                    <div className="absolute bottom-4 left-4 right-4 
                    bg-white/10 backdrop-blur-md border border-white/20
                    rounded-xl p-5 text-white">

                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                        {item.desc}
                      </p>

                      <span className="text-yellow-400 text-sm font-medium">
                        Learn more →
                      </span>

                    </div>

                  </div>

                )}
              </SwiperSlide>
            ))}

          </Swiper>

          {/* ARROWS */}
          <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12 flex items-center justify-center 
          bg-black text-white rounded-full cursor-pointer 
          hover:bg-gray-800 transition shadow-lg">
            ←
          </div>

          <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
          w-12 h-12 flex items-center justify-center 
          bg-black text-white rounded-full cursor-pointer 
          hover:bg-gray-800 transition shadow-lg">
            →
          </div>

        </div>

        {/* DOTS */}
        <div className="custom-pagination mt-12 flex justify-center"></div>

      </div>
    </section>
  );
}