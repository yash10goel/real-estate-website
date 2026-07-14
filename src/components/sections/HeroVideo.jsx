import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ChevronDown } from "lucide-react";
import CursorHighlight from "../Cursor/CursorEffect";
import MeshBackground from "../layout/MeshBackground";
import ConstructionAnimation from "../Animation/ConstructionAnimation";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Award,
} from "lucide-react";

const stats = [
  {
    value: 80,
    suffix: "+",
    label: "Employees",
    icon: Users,
  },
  {
    value: 150,
    suffix: " Cr",
    label: "Working Capacity",
    icon: TrendingUp,
  },
  {
    value: 16,
    suffix: " Cr",
    label: "Solvency",
    icon: ShieldCheck,
  },
  {
    value: 30,
    suffix: "+",
    label: "Years Experience",
    icon: Award,
  },
];


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

//const title = "Building The Future".split(" ");
const title = "From Land to Landmark".split(" ");

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden text-white">


            <CursorHighlight />

            {/* Background Image */}
            <motion.div
                animate={{ scale: [1.1, 1.15, 1.1] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute inset-0 bg-cover bg-center blur-sm brightness-60 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/40 z-10" />

            {/* Mesh Background */}
            <div className="absolute inset-0 z-20">
                <MeshBackground />
            </div>

            {/* Light Glow */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 blur-[180px] z-20"
            />

            {/* Extra floating shapes */}
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[140px] z-20"
            />
            <motion.div
                animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 right-1/4 w-[260px] h-[260px] rounded-full bg-primary/10 blur-[120px] z-20"
            />

            {/* Hero Content */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-30 max-w-7xl mx-auto px-6 py-20 w-full"
            >

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div className="max-w-2xl">

                        {/* Badge */}
                        <motion.div
                            variants={item}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
                        >
                            Premium Construction & Real Estate
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-nowrap"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.9 },
                                },
                            }}
                        >
                            {title.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className={
                                        word === "Landmark"
                                            ? "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,180,0,0.35)]"
                                            : ""
                                    }
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={item}
                            className="text-gray-300 text-lg mb-10"
                        >
                            Premium construction and real estate development delivering
                            world-class infrastructure, luxury apartments and commercial spaces.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={item}
                            className="flex gap-4 mb-16"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0 0 40px rgba(244,180,0,0.6)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-7 py-3 rounded-full font-semibold
                bg-gradient-to-r from-primary to-accent text-secondary shadow-glow"
                            >
                                View Projects →
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "#F4B400",
                                    color: "#F4B400",
                                }}
                                className="px-7 py-3 rounded-full border border-white/30 backdrop-blur-md transition"
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>

                        {/* Stats */}



                        <motion.div
  variants={item}
  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
>
  {stats.map((stat, i) => {
    const Icon = stat.icon;

    return (
      <motion.div
        key={i}
        whileHover={{ y: -5 }}
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-5
          h-[170px]
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div
            className="
              w-12 h-12
              rounded-full
              border border-primary/40
              flex items-center justify-center
              bg-primary/5
            "
          >
            <Icon
              size={22}
              className="text-primary"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-3">
          <div className="h-px bg-primary/20" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-primary" />
        </div>

        {/* Number */}
        <h3 className="text-center text-2xl font-heading font-bold text-primary leading-none mb-2">
          <CountUp end={stat.value} duration={2} />
          {stat.suffix}
        </h3>

        {/* Label */}
        <p className="text-center text-gray-300 text-sm font-medium">
          {stat.label}
        </p>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary blur-sm" />
      </motion.div>
    );
  })}
</motion.div>

                    </div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        className="hidden md:flex items-center justify-center h-[650px] relative mt-10"
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <ConstructionAnimation />
                    </motion.div>

                </div>

                   {/* BOTTOM TRANSITION LINE */}
<div className="absolute bottom-0 left-0 w-full h-[40px] flex items-end">

  {/* base soft glow */}
  <div className="absolute bottom-0 w-full h-[2px] bg-primary/60 blur-[1px]" />

  {/* moving highlight line */}
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "120%" }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute bottom-0 h-[3px] w-[30%]
    bg-gradient-to-r from-transparent via-primary to-transparent
    blur-[0.5px]"
  />

  {/* extra glow effect */}
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "120%" }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "linear",
      delay: 0.2
    }}
    className="absolute bottom-0 h-[6px] w-[30%]
    bg-primary/30 blur-[8px]"
  />

</div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/50"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <ChevronDown size={18} className="text-primary" />
            </motion.div>

        </section>
    );
}
