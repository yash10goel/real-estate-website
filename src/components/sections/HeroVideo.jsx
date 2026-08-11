import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    useReducedMotion,
} from "framer-motion";
import CountUp from "react-countup";
import CursorHighlight from "../Cursor/CursorEffect";
import Button from "../ui/Button";
import { companyStats as stats } from "../../static-data/companyStats";

// A quick-glance credibility rail in the hero, pulled from the same data
// as the full stats dashboard below so the two never fall out of sync.
const heroCredits = [stats[3], stats[1], stats[0]];

// Alternating vertical offsets for a staggered, non-grid feel on desktop
const staggerOffset = ["lg:mt-0", "lg:mt-10", "lg:mt-0", "lg:mt-10"];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.5,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

const corners = [
    "top-6 left-6 border-t border-l",
    "top-6 right-6 border-t border-r",
    "bottom-6 left-6 border-b border-l",
    "bottom-6 right-6 border-b border-r",
];

export default function HeroSection() {
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef(null);

    // Scroll-driven parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 100]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40]);

    // Global scroll-based fade for the scroll indicator
    const { scrollY } = useScroll();
    const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

    // Mouse-driven subtle photo parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    const bgOffsetX = useTransform(smoothX, [-1, 1], [-14, 14]);
    const bgOffsetY = useTransform(smoothY, [-1, 1], [-14, 14]);

    const handleMouseMove = (e) => {
        if (reduceMotion) return;
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

            {/* Single dominant photo — full-bleed, cinematic reveal on load */}
            <motion.div
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: bgY }}
                className="absolute inset-0 z-0"
            >
                <motion.div
                    animate={reduceMotion ? {} : { scale: [1, 1.07, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <motion.div
                        className="absolute inset-0 bg-cover"
                        style={{
                            x: bgOffsetX,
                            y: bgOffsetY,
                            backgroundPosition: "50% 68%",
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80')",
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Editorial scrim — moody wash on mobile, directional reveal on desktop */}
            <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(11,18,32,0.85)_0%,rgba(11,18,32,0.92)_55%,rgba(11,18,32,0.8)_100%)] lg:bg-[linear-gradient(90deg,#0B1220_0%,#0B1220_38%,rgba(11,18,32,0.7)_52%,rgba(11,18,32,0.12)_75%,rgba(11,18,32,0.12)_100%)]" />
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(11,18,32,0.25)_100%)] pointer-events-none" />

            {/* One warm ambient glow, anchored behind the headline */}
            <motion.div
                animate={reduceMotion ? {} : { opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-[6%] -translate-y-1/2 w-[460px] h-[460px] bg-primary/15 blur-[160px] rounded-full z-[1] pointer-events-none"
            />

            {/* Architectural precision frame — desktop only */}
            <div className="hidden lg:block absolute inset-6 z-[2] pointer-events-none">
                {corners.map((pos) => (
                    <span key={pos} className={`absolute w-8 h-8 ${pos} border-white/20`} />
                ))}
            </div>

            {/* Vertical edge label */}
            <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-[2] pointer-events-none">
                <span className="[writing-mode:vertical-rl] text-white/25 text-[11px] font-medium tracking-[0.3em] uppercase">
                    RKGC Group — Construction &amp; Real Estate
                </span>
            </div>

            {/* Faint blueprint lines */}
            <svg
                className="absolute inset-0 w-full h-full z-[1] opacity-[0.05] pointer-events-none"
                aria-hidden="true"
            >
                <line x1="0" y1="18%" x2="100%" y2="18%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <line x1="85%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="2 10" />
                <circle cx="85%" cy="18%" r="5" fill="none" stroke="white" strokeWidth="1" />
            </svg>

            {/* Hero Content — confident, single editorial column */}
            <motion.div
                style={{ y: contentY }}
                className="relative z-[3] max-w-[1400px] mx-auto px-6 w-full pt-28 lg:pt-16"
            >
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl"
                >
                    {/* Eyebrow */}
                    <motion.div variants={item} className="flex items-center gap-3 mb-7">
                        <span className="w-8 h-px bg-primary" />
                        <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                            Construction &middot; Infrastructure &middot; Real Estate
                        </span>
                    </motion.div>

                    {/* Heading — two-tier editorial hierarchy */}
                    <motion.h1
                        variants={item}
                        className="font-heading font-bold tracking-tight mb-8"
                    >
                        <span className="block text-2xl sm:text-3xl lg:text-4xl text-white/80 font-medium leading-tight mb-1">
                            From Land to
                        </span>
                        <span className="relative inline-block text-6xl sm:text-7xl lg:text-8xl leading-[1.05]">
                            {/* Soft pulsing glow duplicate, sits behind the gradient text */}
                            <motion.span
                                aria-hidden="true"
                                animate={reduceMotion ? { opacity: 0.55 } : { opacity: [0.4, 0.75, 0.4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-xl select-none"
                            >
                                Landmark
                            </motion.span>
                            <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(244,180,0,0.55)] [text-shadow:0_2px_18px_rgba(244,180,0,0.4)]">
                                Landmark
                            </span>
                            {/* Periodic shimmer sweep */}
                            {!reduceMotion && (
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
                            )}
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={item}
                        className="text-gray-300 text-lg max-w-md mb-10 leading-relaxed"
                    >
                        Premium construction and real estate development delivering
                        world-class infrastructure, luxury apartments and commercial spaces.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap gap-4 mb-12"
                    >
                        <Button to="/projects" variant="primary" arrow>
                            View Projects
                        </Button>

                        <Button to="/contact" variant="secondary">
                            Contact Us
                        </Button>
                    </motion.div>

                    {/* Inline credibility rail — quick proof, expanded in the dashboard below */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10"
                    >
                        {heroCredits.map((c, i) => (
                            <div key={c.label} className="flex items-center gap-8">
                                {i > 0 && <span className="hidden sm:block w-px h-9 bg-white/10 -ml-8" />}
                                <div>
                                    <p className="font-heading text-2xl font-bold text-primary leading-none">
                                        <CountUp end={c.value} duration={2} />
                                        {c.suffix}
                                    </p>
                                    <p className="text-xs text-white/50 mt-1.5">{c.label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: indicatorOpacity }}
                className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex-col items-center gap-2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-primary/60 flex justify-center pt-1.5">
                    <motion.div
                        animate={reduceMotion ? {} : { y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </div>
                <motion.div
                    animate={reduceMotion ? {} : { y: [0, 5, 0] }}
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
