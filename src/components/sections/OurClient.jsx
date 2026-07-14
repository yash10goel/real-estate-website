import { clients } from "../../static-data/clients";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import MeshBackground from "../layout/MeshBackground";

export default function OurClients() {
  return (
    <section className="relative overflow-hidden py-24 bg-[radial-gradient(ellipse_at_top,_#1a2333_0%,_#0F172A_55%,_#0b1120_100%)]">

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Minimal floating particles */}
      <div className="absolute inset-0 opacity-30">
        <MeshBackground />
      </div>

      {/* Glow behind heading */}
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[140px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            Our Clients
          </span>

          <h2 className="font-heading text-4xl md:text-[40px] font-bold text-white leading-tight">
            Trusted By{" "}
            <span className="text-primary">Government & Industry Leaders</span>
          </h2>

          <p className="text-white/60 leading-relaxed">
            RKGC Group is trusted by government authorities, infrastructure agencies,
            and leading private organizations across India for delivering high-quality
            construction and development projects.
          </p>
        </motion.div>

        {/* Clients Slider */}
        <Swiper
          modules={[Autoplay]}
          loop
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 22,
            },
          }}
        >
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <SwiperSlide key={index} className="h-auto py-2">
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group relative h-[220px] rounded-[20px] p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-white/15 hover:from-primary/50 hover:via-primary/20 hover:to-accent/50 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_0_35px_rgba(244,180,0,0.25)] transition-all duration-300"
                >
                  <div
                    className="
                      h-full
                      rounded-[19px]
                      bg-white/5
                      backdrop-blur-xl
                      border border-white/5
                      px-5
                      py-6
                      flex flex-col
                      items-center
                      justify-center
                      text-center
                      gap-3
                    "
                  >
                    {/* Logo badge */}
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${client.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Org Name */}
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                      {client.name}
                    </p>

                    {/* Subtitle */}
                    <p className="text-[11px] font-medium text-primary/80 tracking-wide uppercase">
                      {client.subtitle}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>
    </section>
  );
}
