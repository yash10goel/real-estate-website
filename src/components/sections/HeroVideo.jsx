import { motion } from "framer-motion";
import CountUp from "react-countup";
import CursorHighlight from "../Cursor/CursorEffect";
import Navbar from "../layout/Navbar";
import MeshBackground from "../layout/MeshBackground";
import ConstructionAnimation from "../Animation/ConstructionAnimation";


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

const title = "Building The Future".split(" ");

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden text-white">

            <Navbar />
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/95 via-[#050814]/80 to-[#050814]/30 z-10" />

            {/* Mesh Background */}
            <div className="absolute inset-0 z-20">
                <MeshBackground />
            </div>

            {/* Light Glow */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-yellow-400/10 blur-[180px] z-20"
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
              bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm mb-6"
                        >
                            Premium Construction & Real Estate
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6 leading-tight flex flex-wrap"
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
                                        word === "Future"
                                            ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
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
                                    boxShadow: "0 0 40px rgba(250,204,21,0.7)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="px-7 py-3 rounded-full font-semibold 
                bg-yellow-400 text-black shadow-lg"
                            >
                                View Projects →
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "#facc15",
                                    color: "#facc15",
                                }}
                                className="px-7 py-3 rounded-full border border-white/30 transition"
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={item}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {[
                                { number: 500, label: "Projects Completed" },
                                { number: 20, label: "Years Experience" },
                                { number: 1000, label: "Happy Clients" },
                                { number: 50, label: "Cities Covered" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        y: -15,
                                        scale: 1.08,
                                        boxShadow: "0 25px 60px rgba(250,204,21,0.35)",
                                    }}
                                    transition={{ type: "spring", stiffness: 180 }}
                                    className="p-7 rounded-2xl 
                  bg-white/5 backdrop-blur-xl 
                  border border-white/10 
                  cursor-pointer"
                                >
                                    <h3 className="text-3xl font-bold text-yellow-400 mb-2 tracking-wide">
                                        <CountUp end={stat.number} duration={2} />+
                                    </h3>

                                    <p className="text-gray-400 text-sm tracking-wide">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
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
  <div className="absolute bottom-0 w-full h-[2px] bg-yellow-300/60 blur-[1px]" />

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
    bg-gradient-to-r from-transparent via-yellow-400 to-transparent
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
    bg-yellow-300/30 blur-[8px]"
  />

</div>

            </motion.div>

        </section>
    );
}