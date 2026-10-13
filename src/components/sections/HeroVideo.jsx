import { useRef } from "react";
import { Link } from "react-router-dom";
import {
    motion,
    useTransform,
    useScroll,
    useReducedMotion,
} from "framer-motion";
import CountUp from "react-countup";
import CursorHighlight from "../Cursor/CursorEffect";
import Button from "../ui/Button";
import { companyStats as stats, capabilities } from "../../static-data/companyStats";

// A quick-glance credibility rail in the hero, pulled from the same data
// as the full stats dashboard below so the two never fall out of sync.
const heroCredits = [stats[3], stats[1], stats[0]];

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

export default function HeroSection() {
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef(null);

    // Gentle scroll parallax on the photo only
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

    return (
        <>
        <section
            ref={sectionRef}
            className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-bg-dark text-white lg:items-center"
        >
            <CursorHighlight />

            {/* Photo — self-hosted, responsive, loaded first */}
            <motion.div
                initial={{ scale: reduceMotion ? 1 : 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: bgY }}
                className="absolute inset-0 -z-10"
            >
                <img
                    src="/home/hero-1920.webp"
                    srcSet="/home/hero-1280.webp 1280w, /home/hero-1920.webp 1920w"
                    sizes="100vw"
                    alt=""
                    fetchpriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-[68%_60%] lg:object-[50%_62%]"
                />
            </motion.div>

            {/* Scrims: top-down on mobile, left-to-right on desktop, and a
                bottom fade that hands off into the capability band */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,18,32,0.55)_0%,rgba(11,18,32,0.45)_30%,rgba(11,18,32,0.88)_62%,#0B1220_92%)] lg:bg-[linear-gradient(90deg,#0B1220_0%,rgba(11,18,32,0.93)_30%,rgba(11,18,32,0.6)_54%,rgba(11,18,32,0.12)_82%)]" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-bg-dark to-transparent" />

            <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 pt-36 pb-14 sm:pb-16 lg:py-40">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-[44rem]"
                >
                    {/* Eyebrow */}
                    <motion.div variants={item} className="flex items-center gap-3 mb-6 sm:mb-8">
                        <span className="hidden sm:block w-8 h-px bg-primary shrink-0" />
                        <p className="flex flex-wrap gap-x-2 text-primary text-[10px] sm:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.28em] uppercase">
                            <span className="whitespace-nowrap">Construction &middot;</span>
                            <span className="whitespace-nowrap">Infrastructure &middot;</span>
                            <span className="whitespace-nowrap">Real Estate</span>
                        </p>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={item}
                        className="font-display font-semibold tracking-tight text-[46px] leading-[1.02] sm:text-[64px] lg:text-[78px] xl:text-[86px]"
                    >
                        <span className="block text-white">From Land to</span>
                        <span className="block italic pr-3 bg-[linear-gradient(120deg,#FFE08A_0%,#F4B400_45%,#E69A00_100%)] bg-clip-text text-transparent">
                            Landmark.
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={item}
                        className="mt-6 sm:mt-8 max-w-[34rem] text-base sm:text-lg leading-relaxed text-white/70"
                    >
                        Premium construction and real estate development delivering
                        world-class infrastructure, luxury apartments and commercial spaces.
                    </motion.p>

                    {/* Actions */}
                    <motion.div variants={item} className="mt-9 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                        <Button to="/projects" variant="primary" size="lg" arrow className="!px-6 sm:!px-8">
                            View Projects
                        </Button>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 sm:px-8 py-3.5 text-[15px] font-semibold tracking-wide text-white backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
                        >
                            Contact Us
                        </Link>
                    </motion.div>

                    {/* Verified figures */}
                    <motion.dl
                        variants={item}
                        className="mt-12 sm:mt-16 grid max-w-xl grid-cols-3 border-t border-white/15"
                    >
                        {heroCredits.map((c, i) => (
                            <div
                                key={c.label}
                                className={`flex flex-col pt-5 sm:pt-6 ${i > 0 ? "pl-4 sm:pl-7 border-l border-white/10" : ""} ${i < heroCredits.length - 1 ? "pr-3" : ""}`}
                            >
                                <dt className="order-2 mt-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
                                    {c.label}
                                </dt>
                                <dd className="order-1 whitespace-nowrap font-display text-[24px] min-[400px]:text-[28px] sm:text-4xl font-semibold leading-none text-white">
                                    {c.prefix && <span className="text-primary">{c.prefix}</span>}
                                    {reduceMotion ? c.value : <CountUp end={c.value} duration={2} />}
                                    <span className="text-primary">{c.suffix}</span>
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </div>
        </section>

        {/* "Our Capability" — dark band continuing straight out of the hero */}
        <section
            aria-labelledby="capability-heading"
            className="relative overflow-hidden bg-bg-dark text-white"
        >
            {/* Hairline + one soft light source for depth */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-[320px] rounded-full bg-primary/[0.07] blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-end gap-8 mb-10 lg:mb-12"
                >
                    <div className="shrink-0">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-primary" />
                            <span className="text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
                                What we bring
                            </span>
                        </div>
                        <h2
                            id="capability-heading"
                            className="font-display text-[34px] sm:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-tight"
                        >
                            Our{" "}
                            <span className="italic bg-[linear-gradient(120deg,#FFD54F,#F4B400_50%,#E69A00)] bg-clip-text text-transparent pr-1">
                                Capability
                            </span>
                        </h2>
                    </div>
                    <span className="hidden md:block flex-1 h-px mb-4 bg-gradient-to-r from-white/15 to-transparent" />
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {capabilities.map((cap, i) => {
                        const Icon = cap.icon;
                        const index = String(i + 1).padStart(2, "0");
                        const motionProps = {
                            initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
                            whileInView: { opacity: 1, y: 0 },
                            viewport: { once: true, amount: 0.3 },
                            transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
                        };

                        if (cap.featured) {
                            // "₹150 Cr" -> currency / figure / unit, so each can be sized on its own
                            const [, currency = "", figure = cap.value, unit = ""] =
                                cap.value.match(/^(₹)?\s*([\d.,]+\+?)\s*(.*)$/) || [];

                            return (
                                <motion.article
                                    key={cap.title}
                                    {...motionProps}
                                    className="group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] border border-primary/25 bg-[radial-gradient(120%_85%_at_100%_0%,rgba(244,180,0,0.11),transparent_55%),linear-gradient(180deg,#151f33,#0d1424)] p-5 sm:p-7 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_50px_-24px_rgba(244,180,0,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    {/* Hover glow */}
                                    <span className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                                    {/* Gold top accent, always on */}
                                    <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="flex items-start justify-between">
                                        <span className="w-12 h-12 rounded-full border border-primary/60 bg-primary/[0.08] shadow-[0_0_18px_rgba(244,180,0,0.22)] flex items-center justify-center text-primary transition-[background-color,color,box-shadow] duration-500 group-hover:bg-primary group-hover:text-secondary group-hover:shadow-[0_0_26px_rgba(244,180,0,0.45)]">
                                            <Icon size={20} strokeWidth={1.8} />
                                        </span>
                                        <span className="font-display italic text-[28px] leading-none text-primary/25 transition-colors duration-500 group-hover:text-primary/45">
                                            {index}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 sm:mt-7 font-heading text-lg sm:text-xl font-semibold tracking-[0.16em] uppercase text-white">
                                        {cap.title}
                                    </h3>
                                    <span className="my-3 sm:my-4 block w-12 h-px bg-gradient-to-r from-primary to-primary/0 transition-all duration-500 group-hover:w-16" />

                                    <p
                                        className="flex items-baseline whitespace-nowrap font-heading font-extrabold leading-none tracking-tight text-[44px] sm:text-[48px] lg:text-[46px] xl:text-[52px] bg-[linear-gradient(180deg,#FFE27A_0%,#F4B400_60%,#D99100_100%)] bg-clip-text text-transparent"
                                    >
                                        <span className="sr-only">{cap.value}</span>
                                        {currency && (
                                            <span aria-hidden="true" className="mr-1 self-start mt-[0.1em] text-[0.55em] font-bold">
                                                {currency}
                                            </span>
                                        )}
                                        <span aria-hidden="true">{figure}</span>
                                        {unit && (
                                            <span aria-hidden="true" className="ml-2 text-[0.42em] font-bold tracking-wide">
                                                {unit}
                                            </span>
                                        )}
                                    </p>
                                    <p className="mt-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">
                                        {cap.detail}
                                    </p>
                                </motion.article>
                            );
                        }

                        return (
                            <motion.article
                                key={cap.title}
                                {...motionProps}
                                className="group relative flex h-full flex-col rounded-[22px] border border-white/[0.08] bg-gradient-to-b from-[#131c2e] to-[#0d1424] p-5 sm:p-7 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_45px_-24px_rgba(244,180,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                {/* Gold top accent, revealed on hover */}
                                <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="flex items-start justify-between">
                                    <span className="w-12 h-12 rounded-full border border-primary/35 bg-primary/[0.06] flex items-center justify-center text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-secondary">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </span>
                                    <span className="font-heading text-xs font-semibold tracking-[0.2em] text-white/20">
                                        {index}
                                    </span>
                                </div>

                                <h3 className="mt-5 sm:mt-7 font-heading text-lg sm:text-xl font-semibold tracking-[0.16em] uppercase text-white">
                                    {cap.title}
                                </h3>
                                <span className="my-3 sm:my-4 block w-8 h-px bg-primary/60 transition-all duration-500 group-hover:w-12 group-hover:bg-primary" />

                                <p className="font-heading text-xl sm:text-[22px] font-bold leading-snug text-primary [text-wrap:balance]">
                                    {cap.value}
                                </p>
                                <p className="mt-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-white/45">
                                    {cap.detail}
                                </p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
        </>
    );
}
