import { testimonials } from "../../static-data/testimonials";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SectionHeading from "../ui/SectionHeading";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <SectionHeading
          badge="Testimonials"
          title={
            <>
              What Our
              <span className="text-primary"> Clients Say</span>
            </>
          }
          subtitle="We take pride in delivering exceptional experiences and building long-term relationships with our valued clients."
          className="mb-16"
        />

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          spaceBetween={24}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ el: ".custom-pagination", clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: Math.min(3, testimonials.length) },
          }}
          className="pb-4"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-auto py-2">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="
                  relative
                  h-full
                  bg-card-light/90 dark:bg-card-dark/90
                  backdrop-blur-xl
                  border border-secondary/10 dark:border-white/10
                  rounded-2xl
                  p-8
                  shadow-glass dark:shadow-glass-dark
                  hover:shadow-glow
                  transition-all duration-300
                "
              >
                <Quote className="absolute top-6 right-6 text-primary/20" size={40} />

                {/* Stars */}
                <div className="flex gap-1 mb-4 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                {/* Review */}
                <p className="text-secondary/70 dark:text-white/70 leading-7 text-sm mb-6 relative z-10">
                  "{item.text}"
                </p>

                {/* User */}
                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-12 h-12
                      rounded-full
                      bg-gradient-to-br from-primary to-accent
                      text-secondary
                      flex items-center justify-center
                      font-heading font-semibold
                    "
                  >
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-heading font-semibold text-secondary dark:text-white">
                      {item.name}
                    </h4>

                    <p className="text-xs text-secondary/50 dark:text-white/50">
                      Happy Client
                    </p>
                  </div>

                </div>

              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination flex justify-center gap-2 mt-6" />

      </div>
    </section>
  );
}
