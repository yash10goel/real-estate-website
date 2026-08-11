import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Layers,
  Clock,
  HardHat,
  ShieldCheck,
  Share2,
  Leaf,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { verticals } from "../../static-data/verticals";
import { companyStats } from "../../static-data/companyStats";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import OurClients from "../sections/OurClient";

const philosophy = [
  {
    number: "01",
    title: "Long-Term Thinking",
    description: "Building value beyond short-term returns.",
  },
  {
    number: "02",
    title: "Real Assets",
    description: "Investing in businesses and assets that create tangible impact.",
  },
  {
    number: "03",
    title: "Diversification",
    description: "A portfolio spanning multiple sectors.",
  },
  {
    number: "04",
    title: "Responsible Growth",
    description: "Growth with sustainability and long-term resilience.",
  },
  {
    number: "05",
    title: "Partnership",
    description: "Building meaningful relationships with investors and stakeholders.",
  },
];

const whyPartner = [
  {
    icon: Layers,
    title: "Diversified Ecosystem",
    description: "Four business verticals spanning infrastructure, real estate, agriculture and interiors.",
  },
  {
    icon: Clock,
    title: "Long-Term Approach",
    description: "Decades of building for the long run, not the next quarter.",
  },
  {
    icon: HardHat,
    title: "Real-World Businesses",
    description: "Tangible assets and operating businesses, not paper promises.",
  },
  {
    icon: ShieldCheck,
    title: "Experienced Execution",
    description: "A team that has delivered government and private-sector projects at scale.",
  },
  {
    icon: Share2,
    title: "Cross-Sector Opportunities",
    description: "Exposure across sectors through a single, trusted partner.",
  },
  {
    icon: Leaf,
    title: "Sustainable Growth Mindset",
    description: "Growth that considers long-term resilience, not just short-term gain.",
  },
];

const journey = [
  { number: "01", title: "Discover", description: "Understand our sectors and opportunities." },
  { number: "02", title: "Connect", description: "Start a conversation with our team." },
  { number: "03", title: "Evaluate", description: "Explore the relevant opportunity in detail." },
  { number: "04", title: "Partner", description: "Build a long-term relationship with RKGC." },
  { number: "05", title: "Grow", description: "Create sustainable long-term value together." },
];

const heroCredits = [companyStats[3], companyStats[1]];

function PhilosophyRow({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[auto_1fr] sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 py-8 border-b border-secondary/10 dark:border-white/10 last:border-b-0"
    >
      <span className="font-heading text-3xl sm:text-4xl font-bold text-primary/30">
        {item.number}
      </span>
      <div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-secondary/60 dark:text-white/60 leading-relaxed max-w-xl">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function AreaRow({ vertical, index }) {
  const reversed = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16 py-16 border-b border-secondary/10 dark:border-white/10 last:border-b-0`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 group">
        <div className="relative rounded-[28px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[420px] shadow-glass dark:shadow-glass-dark">
          <motion.img
            src={vertical.image}
            alt={vertical.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <vertical.icon size={18} className="text-white" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2">
        <span className="font-heading text-6xl sm:text-7xl font-bold text-primary/15 block leading-none mb-2">
          {vertical.number}
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-secondary dark:text-white mb-3">
          {vertical.name}
        </h3>
        <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-4">
          {vertical.tagline}
        </p>
        <p className="text-secondary/60 dark:text-white/60 leading-relaxed max-w-md mb-7">
          {vertical.description}
        </p>
        <Button to={`/projects?category=${vertical.slug}`} variant="secondary" arrow>
          Explore {vertical.slug}
        </Button>
      </div>
    </motion.div>
  );
}

function JourneyStep({ step, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-20 sm:pl-24 pb-14 last:pb-0"
    >
      {/* Node */}
      <div className="absolute left-0 top-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card-light dark:bg-card-dark border-2 border-primary flex items-center justify-center font-heading font-bold text-primary text-lg z-10">
        {step.number}
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-secondary dark:text-white mb-2 pt-3">
        {step.title}
      </h3>
      <p className="text-secondary/60 dark:text-white/60 leading-relaxed max-w-md">
        {step.description}
      </p>
    </motion.div>
  );
}

function OpportunityGroup({ vertical, projects }) {
  return (
    <div className="py-10 border-b border-secondary/10 dark:border-white/10 last:border-b-0">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <vertical.icon size={18} className="text-primary" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-secondary dark:text-white">
            {vertical.name}
          </h3>
        </div>
        <Link
          to={`/projects?category=${vertical.slug}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-primary text-sm font-semibold shrink-0 hover:underline underline-offset-4"
        >
          View All
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {projects.slice(0, 4).map((project) => (
            <Link
              key={project.id}
              to={`/projects?category=${vertical.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-secondary/10 dark:border-white/10 px-5 py-4 hover:border-primary/40 hover:bg-primary/[0.03] transition-colors duration-300"
            >
              <div className="min-w-0">
                <p className="font-medium text-secondary dark:text-white truncate">
                  {project.name}
                </p>
                <p className="flex items-center gap-1.5 text-secondary/50 dark:text-white/50 text-xs mt-1">
                  <MapPin size={12} className="text-primary shrink-0" />
                  {project.city}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-secondary/20 dark:text-white/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-secondary/50 dark:text-white/50 text-sm italic">
          Portfolio showcase coming soon for this vertical.
        </p>
      )}

      <Link
        to={`/projects?category=${vertical.slug}`}
        className="sm:hidden inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-5"
      >
        View All
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}

export default function InvestmentPage() {
  const reduceMotion = useReducedMotion();
  const allProjects = useSelector((state) => state.projects.list);
  const heroRef = useRef(null);
  const areasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 100]);

  const scrollToAreas = () => {
    areasRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark text-white pb-16 lg:pb-10"
      >
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroImgY }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80')",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(11,18,32,0.85)_0%,rgba(11,18,32,0.92)_55%,rgba(11,18,32,0.8)_100%)] lg:bg-[linear-gradient(90deg,#0B1220_0%,#0B1220_38%,rgba(11,18,32,0.7)_52%,rgba(11,18,32,0.15)_75%,rgba(11,18,32,0.15)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(11,18,32,0.25)_100%)] pointer-events-none" />

        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 w-[460px] h-[460px] bg-primary/15 blur-[160px] rounded-full z-[1] pointer-events-none"
        />

        <Container className="relative z-[3] w-full pt-28 lg:pt-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
            className="max-w-2xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                Investment &amp; Partnerships
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-bold tracking-tight mb-8 leading-[1.05]"
            >
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                Invest in What
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(244,180,0,0.4)]">
                Builds Tomorrow.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-lg max-w-md mb-10 leading-relaxed"
            >
              A diversified group building long-term value across infrastructure,
              real estate, agriculture and interiors — guided by trust, discipline
              and partnership.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button variant="primary" arrow onClick={scrollToAreas}>
                Explore Opportunities
              </Button>
              <Button to="/contact" variant="secondary">
                Start a Conversation
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10"
            >
              {heroCredits.map((c, i) => (
                <div key={c.label} className="flex items-center gap-8">
                  {i > 0 && <span className="hidden sm:block w-px h-9 bg-white/10 -ml-8" />}
                  <div>
                    <p className="font-heading text-2xl font-bold text-primary leading-none">
                      {c.value}{c.suffix}
                    </p>
                    <p className="text-xs text-white/50 mt-1.5">{c.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ============ INVESTMENT PHILOSOPHY ============ */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHeading
                badge="Our Philosophy"
                align="left"
                title={
                  <>
                    How We Think About{" "}
                    <span className="text-primary">Investment</span>
                  </>
                }
                subtitle="Five principles guide every business decision we make — from the projects we take on to the ventures we build."
              />
            </div>
            <div>
              {philosophy.map((item, i) => (
                <PhilosophyRow key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============ INVESTMENT AREAS ============ */}
      <section ref={areasRef} className="py-24 bg-card-light/40 dark:bg-card-dark/20">
        <Container>
          <SectionHeading
            badge="Where We Build"
            title={
              <>
                Four Verticals. <span className="text-primary">One Vision.</span>
              </>
            }
            subtitle="Each RKGC vertical represents a distinct opportunity, built on the same foundation of quality and trust."
            className="mb-4 mx-auto"
          />
          <div>
            {verticals.map((vertical, i) => (
              <AreaRow key={vertical.id} vertical={vertical} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ WHY PARTNER WITH RKGC ============ */}
      <section className="py-24">
        <Container>
          <SectionHeading
            badge="Why Partner With RKGC"
            title={
              <>
                Built On <span className="text-primary">Trust &amp; Execution</span>
              </>
            }
            subtitle="A diversified, real-world business group with the experience to execute and the discipline to grow responsibly."
            className="mb-14 mx-auto"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPartner.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-[24px] border border-secondary/10 dark:border-white/10 p-7 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <point.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-secondary/60 dark:text-white/60 text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust strip — real government & industry partners */}
      <OurClients />

      {/* ============ INVESTMENT JOURNEY ============ */}
      <section className="py-24">
        <Container className="max-w-4xl">
          <SectionHeading
            badge="How It Works"
            title={
              <>
                The Investment <span className="text-primary">Journey</span>
              </>
            }
            subtitle="A simple, transparent path from first conversation to long-term partnership."
            className="mb-16 mx-auto"
          />

          <div>
            {journey.map((step, i) => (
              <div key={step.number} className="relative">
                {i < journey.length - 1 && (
                  <span className="absolute left-7 sm:left-8 top-14 sm:top-16 w-px h-[calc(100%-3.5rem)] bg-secondary/10 dark:bg-white/10" />
                )}
                <JourneyStep step={step} index={i} total={journey.length} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FEATURED OPPORTUNITIES ============ */}
      <section className="py-24 bg-card-light/40 dark:bg-card-dark/20">
        <Container>
          <SectionHeading
            badge="Featured Work"
            title={
              <>
                Opportunities Across{" "}
                <span className="text-primary">Our Verticals</span>
              </>
            }
            subtitle="A look at real, ongoing work behind each business vertical."
            className="mb-4 mx-auto"
          />

          <div>
            {verticals.map((vertical) => (
              <OpportunityGroup
                key={vertical.id}
                vertical={vertical}
                projects={allProjects.filter((p) => p.category === vertical.slug)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FINAL CTA ============ */}
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
                Let&apos;s Build What Comes Next.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                Explore opportunities to partner with RKGC across our growing
                business verticals.
              </p>
              <Button to="/contact" variant="primary" size="lg" arrow>
                Start a Conversation
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
