import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import CountUp from "react-countup";
import CursorHighlight from "../Cursor/CursorEffect";
import MeshBackground from "../layout/MeshBackground";
import Button from "../ui/Button";
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
    subtitle: "Verified Workforce",
    icon: Users,
  },
  {
    value: 150,
    suffix: " Cr",
    label: "Working Capacity",
    subtitle: "Financial Strength",
    icon: TrendingUp,
  },
  {
    value: 16,
    suffix: " Cr",
    label: "Solvency",
    subtitle: "Audited & Certified",
    icon: ShieldCheck,
  },
  {
    value: 30,
    suffix: "+",
    label: "Years Experience",
    subtitle: "Industry Leadership",
    icon: Award,
  },
];

// Alternating vertical offsets for a staggered, non-grid feel on desktop
const staggerOffset = ["lg:mt-0", "lg:mt-10", "lg:mt-0", "lg:mt-10"];


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function HeroSection() {
    const sectionRef = useRef(null);

    // Scroll-driven multi-layer parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const meshY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

    // Global scroll-based fade for the scroll indicator
    const { scrollY } = useScroll();
    const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

    // Mouse-driven subtle parallax + visual tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
    const bgOffsetX = useTransform(smoothX, [-1, 1], [-10, 10]);
    const bgOffsetY = useTransform(smoothY, [-1, 1], [-10, 10]);
    const visualOffsetX = useTransform(smoothX, [-1, 1], [-16, 16]);
    const visualOffsetY = useTransform(smoothY, [-1, 1], [-16, 16]);
    const visualRotateX = useTransform(smoothY, [-1, 1], [6, -6]);
    const visualRotateY = useTransform(smoothX, [-1, 1], [-6, 6]);
    const glowOffsetX = useTransform(smoothX, [-1, 1], [-40, 40]);
    const glowOffsetY = useTransform(smoothY, [-1, 1], [-40, 40]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    return (
        <>
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark text-white pb-16 lg:pb-10"
        >

            <CursorHighlight />

            {/* Base cinematic gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2744_0%,_#0B1220_55%)] z-0" />

            {/* Background photo — Ken Burns pan + zoom, scroll & mouse parallax */}
            <motion.div
                animate={{ scale: [1.1, 1.18, 1.1], x: [0, -20, 0] }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                style={{ y: bgY }}
                className="absolute inset-0 blur-sm brightness-[0.35] z-0"
                aria-hidden="true"
            >
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        x: bgOffsetX,
                        y: bgOffsetY,
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
                    }}
                />
            </motion.div>

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/80 to-bg-dark/50 z-10" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(11,18,32,0.85)_100%)] z-10 pointer-events-none" />

            {/* Slow moving fog */}
            <motion.div
                animate={{ x: [0, 60, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-0 w-[70%] h-[50%] bg-white/5 blur-[120px] rounded-full z-10 pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -50, 0], opacity: [0.1, 0.22, 0.1] }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute bottom-0 right-0 w-[60%] h-[45%] bg-primary/5 blur-[130px] rounded-full z-10 pointer-events-none"
            />

            {/* Subtle moving light rays */}
            <motion.div
                animate={{ opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1/4 left-1/4 w-[140%] h-[60%] rotate-[18deg] bg-gradient-to-b from-white/10 via-white/0 to-transparent z-10 pointer-events-none"
            />
            <motion.div
                animate={{ opacity: [0.05, 0.14, 0.05] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -top-1/3 left-1/2 w-[120%] h-[70%] rotate-[12deg] bg-gradient-to-b from-primary/10 via-white/0 to-transparent z-10 pointer-events-none"
            />

            {/* Mesh Background (particles + connecting lines) */}
            <motion.div style={{ y: meshY }} className="absolute inset-0 z-20">
                <MeshBackground />
            </motion.div>

            {/* Floating glowing dots */}
            {[
                { top: "18%", left: "8%", size: 5, dur: 6 },
                { top: "62%", left: "14%", size: 4, dur: 8 },
                { top: "30%", left: "46%", size: 3, dur: 7 },
                { top: "75%", left: "38%", size: 4, dur: 9 },
                { top: "22%", left: "60%", size: 3, dur: 6.5 },
                { top: "50%", left: "92%", size: 5, dur: 7.5 },
            ].map((dot, i) => (
                <motion.span
                    key={i}
                    animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: dot.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="absolute rounded-full bg-primary blur-[1px] z-20 pointer-events-none"
                    style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
                />
            ))}

            {/* Main glow blobs */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ x: glowOffsetX, y: glowOffsetY }}
                className="absolute top-10 right-0 w-[650px] h-[650px] bg-primary/10 blur-[190px] z-20"
            />
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[140px] z-20"
            />

            {/* Golden glow behind the heading */}
            <motion.div
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[8%] -translate-y-1/2 w-[480px] h-[480px] bg-primary/15 blur-[160px] rounded-full z-10 pointer-events-none"
            />

            {/* Faint grid pattern */}
            <div
                className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Low-opacity blueprint lines */}
            <svg
                className="absolute inset-0 w-full h-full z-10 opacity-[0.06] pointer-events-none"
                aria-hidden="true"
            >
                <line x1="0" y1="20%" x2="100%" y2="20%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <line x1="0" y1="80%" x2="100%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <line x1="15%" y1="0" x2="15%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <line x1="85%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <circle cx="15%" cy="20%" r="5" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="85%" cy="80%" r="5" fill="none" stroke="white" strokeWidth="1" />
            </svg>

            {/* Hero Content — asymmetrical layered composition */}
            <div className="relative z-30 max-w-[1400px] mx-auto px-6 w-full pt-28 lg:pt-36">
                <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-8 items-center">

                    {/* LEFT — floating content, generous negative space */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-6 lg:pr-4 relative z-30"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={item}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-primary/10 border border-primary/30 text-primary text-sm mb-10 backdrop-blur-md"
                        >
                            Premium Construction &amp; Real Estate
                        </motion.div>

                        {/* Heading — large, wraps naturally, highlight on its own visual weight */}
                        <motion.h1
                            variants={item}
                            className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] font-bold mb-10 leading-[1.05] tracking-tight"
                        >
                            <span className="block">From Land to</span>
                            <span className="relative inline-block">
                                {/* Soft pulsing glow duplicate, sits behind the gradient text */}
                                <motion.span
                                    aria-hidden="true"
                                    animate={{ opacity: [0.4, 0.75, 0.4] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-xl select-none"
                                >
                                    Landmark
                                </motion.span>
                                <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(244,180,0,0.55)] [text-shadow:0_2px_18px_rgba(244,180,0,0.4)]">
                                    Landmark
                                </span>
                                {/* Periodic shimmer sweep */}
                                <motion.span
                                    aria-hidden="true"
                                    animate={{ opacity: [0, 0.6, 0] }}
                                    transition={{
                                        duration: 1.4,
                                        repeat: Infinity,
                                        repeatDelay: 3.5,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent"
                                >
                                    Landmark
                                </motion.span>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={item}
                            className="text-gray-300 text-lg max-w-md mb-12"
                        >
                            Premium construction and real estate development delivering
                            world-class infrastructure, luxury apartments and commercial spaces.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-4"
                        >
                            <Button to="/projects" variant="primary" arrow>
                                View Projects
                            </Button>

                            <Button to="/contact" variant="secondary">
                                Contact Us
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — premium floating visual panel, overlapping the text column */}
                    <motion.div
                        style={{ y: visualY, scale: visualScale }}
                        className="lg:col-span-6 relative lg:-ml-10 mt-10 lg:mt-[60px]"
                        initial={{ opacity: 0, x: 60, rotate: -2 }}
                        animate={{ opacity: 1, x: 0, rotate: -2 }}
                        whileHover={{ rotate: 0 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <motion.div
                            style={{
                                x: visualOffsetX,
                                y: visualOffsetY,
                                rotateX: visualRotateX,
                                rotateY: visualRotateY,
                                transformPerspective: 1200,
                            }}
                            className="relative"
                        >
                            {/* Moving golden ambient glow behind visual */}
                            <motion.div
                                animate={{
                                    opacity: [0.5, 0.85, 0.5],
                                    scale: [1, 1.06, 1],
                                    x: [-20, 20, -20],
                                    y: [-10, 15, -10],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -inset-10 bg-primary/20 blur-[110px] rounded-full"
                            />

                            {/* Soft shadow beneath the image */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-black/50 blur-[40px] rounded-full" />

                            {/* Floating gradient-border glass frame */}
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative rounded-[32px] p-[1.5px] bg-gradient-to-br from-primary/60 via-white/15 to-accent/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                            >
                                <div className="relative rounded-[31px] overflow-hidden border border-white/15">
                                    <img
                                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80"
                                        alt="Construction crew working a premium site at golden hour"
                                        className="w-full h-[340px] sm:h-[390px] lg:h-[450px] object-cover object-[50%_68%]"
                                    />
                                    {/* Glass sheen along the top edge */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-transparent to-transparent" />
                                </div>

                                {/* Floating badge chip */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 bg-card-dark/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
                                >
                                    <p className="font-heading text-2xl font-bold text-primary leading-none">
                                        <CountUp end={30} duration={2} />+
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1">Years of Excellence</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: indicatorOpacity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-primary/60 flex justify-center pt-1.5">
                    <motion.div
                        animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </div>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 border-b-2 border-r-2 border-primary/70 rotate-45"
                />
            </motion.div>

        </section>

        {/* Stats dashboard strip — floats, overlapping the hero's bottom edge */}
        <div className="relative z-40 -mt-12 lg:-mt-16 px-6 pb-10 lg:pb-16">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
                {stats.map((stat, i) => {
                    const Icon = stat.icon;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className={`rounded-[24px] p-[1.5px] bg-gradient-to-br from-primary/50 via-white/10 to-accent/40 hover:from-primary/80 hover:to-accent/70 transition-colors duration-300 ${staggerOffset[i]}`}
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 3.5 + i * 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ y: -10, boxShadow: "0 0 40px rgba(244,180,0,0.35)" }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-[24px]
                                    bg-card-dark/70
                                    backdrop-blur-2xl
                                    border border-white/5
                                    p-5
                                    h-[184px]
                                    shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]
                                "
                            >
                                {/* Moving highlight sweep */}
                                <motion.div
                                    animate={{ x: ["-120%", "220%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                                />

                                {/* Icon */}
                                <div className="flex justify-center mb-3">
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
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
                                    </motion.div>
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

                                {/* Subtitle — small premium microcopy */}
                                <p className="text-center text-primary/70 text-[11px] font-medium tracking-wide uppercase mt-1">
                                    {stat.subtitle}
                                </p>

                                {/* Bottom Glow */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary blur-sm" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
        </>
    );
}
