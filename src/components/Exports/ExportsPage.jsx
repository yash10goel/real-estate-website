import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Globe2, ArrowRight } from "lucide-react";
import { exportDivisions, whyExports } from "../../static-data/exports";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Seo from "../../seo/Seo";
import { seoConfig } from "../../seo/seoConfig";
import { breadcrumbSchema } from "../../seo/schema";

const corners = [
  "top-6 left-6 border-t border-l",
  "top-6 right-6 border-t border-r",
  "bottom-6 left-6 border-b border-l",
  "bottom-6 right-6 border-b border-r",
];

function DivisionRow({ division, index, onExplore }) {
  const reversed = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16 py-16 border-b border-secondary/10 dark:border-white/10 last:border-b-0`}
    >
      <div className="w-full lg:w-1/2 group">
        <div className="relative rounded-[28px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[420px] shadow-glass dark:shadow-glass-dark">
          <motion.img
            src={division.image}
            alt={`RKGC Exports — ${division.name} division`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <span className="font-heading text-6xl sm:text-7xl font-bold text-primary/15 block leading-none mb-2">
          {division.number}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-secondary dark:text-white mb-3">
          {division.name}
        </h3>
        <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-4">{division.tagline}</p>
        <p className="text-secondary/60 dark:text-white/60 leading-relaxed max-w-md mb-6">{division.description}</p>
        <div className="flex flex-wrap gap-2 mb-7">
          {division.products.map((p) => (
            <span
              key={p.id}
              className="px-3 py-1.5 rounded-full bg-secondary/5 dark:bg-white/5 text-secondary/70 dark:text-white/70 text-xs font-medium"
            >
              {p.name}
            </span>
          ))}
        </div>
        <Button variant="secondary" arrow onClick={() => onExplore(division.id)}>
          Explore {division.name}
        </Button>
      </div>
    </motion.div>
  );
}

function ProductCard({ product, index }) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-primary/25
        bg-gradient-to-b
        from-[#0D1A2B]
        to-[#0A1420]
        shadow-[0_10px_40px_rgba(0,0,0,0.30)]
        transition-all
        duration-500
        hover:border-primary/70
        hover:shadow-[0_20px_55px_rgba(244,180,0,0.14)]
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[260px] shrink-0 overflow-hidden">

        <motion.img
          src={product.image}
          alt={`${product.name} — RKGC Exports product`}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.05]
          "
        />

        {/* Cinematic gradient — bright at top, merges into the card's
            own navy at the bottom so image and content read as one surface */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0A1420]
            via-[#0A1420]/25
            to-transparent
          "
        />

        {/* Subtle gold cinematic tint */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-tr
            from-primary/[0.07]
            via-transparent
            to-transparent
          "
        />

        {/* ================= DECORATIVE DOTS — fades toward its own edges ================= */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 w-16 h-16 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#F4B400 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            maskImage: "radial-gradient(circle, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 75%)",
          }}
        />

        {/* ================= GOLD CORNER — smaller, sharper, metallic ================= */}
        <span
          aria-hidden="true"
          className="
            absolute
            top-0
            left-0
            w-9
            h-9
            bg-gradient-to-br
            from-[#FFE9A8]
            via-primary
            to-[#9C680D]
            opacity-95
            [clip-path:polygon(0_0,100%_0,0_100%)]
          "
        />
        <span aria-hidden="true" className="absolute top-0 left-0 w-8 h-px bg-primary/60" />
        <span aria-hidden="true" className="absolute top-0 left-0 w-px h-8 bg-primary/60" />
      </div>

      {/* ================= ICON — overlaps the image/content boundary ================= */}
      <div className="relative z-10 px-6 -mt-7">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border-[1.5px]
            border-primary/80
            bg-[#0A1420]/90
            text-primary
            shadow-[0_0_22px_rgba(244,180,0,0.22)]
            backdrop-blur-md
            transition-all
            duration-500
            group-hover:border-primary
            group-hover:shadow-[0_0_32px_rgba(244,180,0,0.35)]
          "
        >
          <Icon size={20} strokeWidth={1.7} />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative flex flex-1 flex-col px-6 pt-4 pb-6">

        {/* Oversized editorial number — very subtle, low-right, behind content */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            select-none
            absolute
            bottom-1
            right-2
            font-heading
            text-[104px]
            font-bold
            leading-none
            text-white/[0.025]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Product Name — elegant serif, not bold */}
        <h4
          className="
            relative
            font-display
            italic
            font-medium
            text-[26px]
            text-white
            tracking-tight
          "
        >
          {product.name}
        </h4>

        {/* Gold underline */}
        <div
          className="
            relative
            mt-3
            mb-4
            h-[2px]
            w-14
            bg-primary
            transition-all
            duration-500
            group-hover:w-16
          "
        />

        {/* Description */}
        <p className="relative max-w-[90%] text-[15px] leading-relaxed text-white/55">
          {product.description}
        </p>

        {/* Explore Collection — text link, not a button; arrow responds
            to hovering the whole card, not just the link itself */}
        <Link
          to="/contact?subject=Export%20Enquiry"
          className="
            relative
            mt-auto
            inline-flex
            w-fit
            items-center
            gap-2
            pt-5
            text-sm
            font-medium
            text-primary
            transition-colors
            duration-300
            hover:text-accent
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            rounded-sm
          "
        >
          Explore Collection
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </div>

      {/* ================= HOVER GLOW ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-16
          -right-16
          h-36
          w-36
          rounded-full
          bg-primary/10
          opacity-0
          blur-[60px]
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />
    </motion.div>
  );
}

// Shared premium section shell for both export divisions — Garments and
// FMCG render identically (background, header, card grid, bottom bar);
// only the copy and product data differ per division.
function CollectionSection({
  sectionRef,
  name,
  tagline,
  products,
  rightPanelLines,
  rightPanelCaption,
  bottomLeftText,
  onViewAll,
}) {
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[0.06] bg-bg-dark py-24 scroll-mt-24"
    >
      {/* Decorative background — faint grid + radial gold glow, never
          competing with the cards for attention */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/[0.04] blur-[110px]" />
        <div className="absolute -left-32 top-1/3 h-[280px] w-[280px] rounded-full bg-primary/[0.03] blur-[100px]" />

        {/* Architectural/editorial arcs — large, faint ring outlines */}
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-primary/[0.07]" />
        <div className="absolute -left-52 bottom-[-160px] h-[480px] w-[480px] rounded-full border border-primary/[0.05]" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADER ================= */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-primary uppercase">
              <span className="h-px w-8 bg-primary" />
              {name} Collection
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-white">
              {name}{" "}
              <span className="bg-gradient-to-r from-[#f8c447] via-primary to-[#c88710] bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="mt-5 text-white/55 leading-relaxed">{tagline}</p>
          </motion.div>

          {/* Right-side premium text element — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-stretch gap-6 shrink-0"
          >
            <span className="w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <div>
              <p className="font-display italic text-2xl leading-[1.15] text-white/85">
                {rightPanelLines[0]}
                <br />
                {rightPanelLines[1]}
                <br />
                <span className="text-primary">{rightPanelLines[2]}</span>
              </p>
              <p className="mt-3 max-w-[180px] text-xs text-white/40 leading-relaxed">
                {rightPanelCaption}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase">
            {bottomLeftText}
          </p>
          <button
            type="button"
            onClick={onViewAll}
            className="group/all inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit"
          >
            View All Collections
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/all:translate-x-1" />
          </button>
        </div>
      </Container>
    </section>
  );
}

function WhyRow({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8 py-7 border-b border-secondary/10 dark:border-white/10 last:border-b-0"
    >
      <span className="font-heading text-3xl sm:text-4xl font-bold text-primary/25">{item.number}</span>
      <div>
        <h3 className="font-heading text-lg sm:text-xl font-bold text-secondary dark:text-white mb-1.5">{item.title}</h3>
        <p className="text-secondary/60 dark:text-white/60 leading-relaxed max-w-xl">{item.description}</p>
      </div>
    </motion.div>
  );
}

function GlobalNetworkVisual({ reduceMotion }) {
  const hub = { x: 90, y: 150 };
  const nodes = [
    { x: 220, y: 60 },
    { x: 320, y: 110 },
    { x: 300, y: 210 },
    { x: 200, y: 250 },
    { x: 130, y: 40 },
  ];
  return (
    <svg viewBox="0 0 360 280" className="w-full h-auto max-w-md mx-auto" aria-hidden="true">
      {nodes.map((n, i) => (
        <motion.line
          key={i}
          x1={hub.x}
          y1={hub.y}
          x2={n.x}
          y2={n.y}
          stroke="rgba(244,180,0,0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          animate={reduceMotion ? {} : { strokeDashoffset: [0, -20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="4" fill="#FFD54F" />
      ))}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="9"
        fill="#F4B400"
        animate={reduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={hub.x} cy={hub.y} r="16" fill="none" stroke="#F4B400" strokeWidth="1" opacity="0.4" />
      <text x={hub.x} y={hub.y + 32} textAnchor="middle" className="fill-secondary dark:fill-white text-[11px] font-semibold" style={{ fill: "currentColor" }}>
        India
      </text>
    </svg>
  );
}

export default function ExportsPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const garmentsRef = useRef(null);
  const fmcgRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 100]);

  const scrollToRef = (ref) => ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  const explore = (id) => {
    if (id === "garments") scrollToRef(garmentsRef);
    else scrollToRef(fmcgRef);
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      <Seo
        {...seoConfig["/exports"]}
        path="/exports"
        jsonLd={breadcrumbSchema(seoConfig["/exports"].breadcrumb)}
      />

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark text-white pb-16 lg:pb-10">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroImgY }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80')" }}
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(11,18,32,0.88)_0%,rgba(11,18,32,0.93)_55%,rgba(11,18,32,0.82)_100%)] lg:bg-[linear-gradient(90deg,#0B1220_0%,#0B1220_38%,rgba(11,18,32,0.72)_52%,rgba(11,18,32,0.2)_75%,rgba(11,18,32,0.2)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(11,18,32,0.25)_100%)] pointer-events-none" />

        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 w-[460px] h-[460px] bg-primary/15 blur-[160px] rounded-full z-[1] pointer-events-none"
        />

        <div className="hidden lg:block absolute inset-6 z-[2] pointer-events-none">
          {corners.map((pos) => (
            <span key={pos} className={`absolute w-8 h-8 ${pos} border-white/20`} />
          ))}
        </div>

        <Container className="relative z-[3] w-full pt-28 lg:pt-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
            className="max-w-2xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">RKGC Exports</span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold tracking-tight mb-8 leading-[1.08]"
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl">Connecting Quality Indian Products</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,180,0,0.4)]">
                with Global Markets
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-lg max-w-md mb-10 leading-relaxed"
            >
              We export quality-assured Garments and FMCG products from India to international
              buyers — built on the same discipline and standards behind every RKGC business.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="primary" arrow onClick={() => scrollToRef(categoriesRef)}>
                Explore Export Categories
              </Button>
              <Button to="/contact?subject=Export%20Enquiry" variant="secondary">
                Send an Enquiry
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============ EXPORT CATEGORIES ============ */}
      <section ref={categoriesRef} className="py-24">
        <Container>
          <SectionHeading
            badge="What We Export"
            title={<>Two Divisions. <span className="text-primary">One Standard.</span></>}
            subtitle="RKGC Exports operates across two major business divisions, each held to the same quality and reliability standard."
            className="mb-4 mx-auto"
          />
          <div>
            {exportDivisions.map((division, i) => (
              <DivisionRow key={division.id} division={division} index={i} onExplore={explore} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ GARMENTS COLLECTION ============ */}
      <CollectionSection
        sectionRef={garmentsRef}
        name="Garments"
        tagline={exportDivisions[0].tagline}
        products={exportDivisions[0].products}
        rightPanelLines={["Fashion", "Beyond", "Borders"]}
        rightPanelCaption="Crafting Global Style with Purpose"
        bottomLeftText="Exporting Style. Empowering Possibilities."
        onViewAll={() => scrollToRef(fmcgRef)}
      />

      {/* ============ FMCG COLLECTION ============ */}
      <CollectionSection
        sectionRef={fmcgRef}
        name="FMCG"
        tagline={exportDivisions[1].tagline}
        products={exportDivisions[1].products}
        rightPanelLines={["Flavors", "Without", "Borders"]}
        rightPanelCaption="Nourishing Global Kitchens with Purpose"
        bottomLeftText="Nourishing Kitchens. Connecting Cultures."
        onViewAll={() => scrollToRef(garmentsRef)}
      />

      {/* ============ WHY RKGC EXPORTS ============ */}
      <section className="py-24">
        <Container className="max-w-4xl">
          <SectionHeading
            badge="Why RKGC Exports"
            title={<>Built On <span className="text-primary">Trust &amp; Consistency</span></>}
            subtitle="What international buyers can expect when working with RKGC Exports."
            className="mb-10 mx-auto"
          />
          <div>
            {whyExports.map((item, i) => (
              <WhyRow key={item.number} item={item} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ GLOBAL REACH ============ */}
      <section className="py-24 bg-secondary text-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
                <Globe2 size={13} /> Global Reach
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight mb-5">
                From India to <span className="text-primary">Global Markets</span>
              </h2>
              <p className="text-white/60 leading-relaxed max-w-lg">
                RKGC Exports connects trusted Indian manufacturing and sourcing with international
                buyers across Garments and FMCG — built on the same discipline and quality
                standards behind every RKGC business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlobalNetworkVisual reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============ ENQUIRY CTA ============ */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-secondary via-secondary to-[#1E293B] px-8 md:px-16 py-16 md:py-20 text-center"
          >
            <motion.div
              animate={reduceMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-[120px] pointer-events-none"
            />
            <motion.div
              animate={reduceMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent/20 blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                Looking for a Reliable Export Partner?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Tell us what you need — Garments, FMCG, or both — and our team will get back to you.
              </p>
              <Button to="/contact?subject=Export%20Enquiry" variant="primary" size="lg" arrow>
                Send an Enquiry
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
