import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  GraduationCap,
  Scale,
  Lightbulb,
  ChevronDown,
  Users2,
  Layers,
  BookOpen,
  Heart,
  Search,
} from "lucide-react";
import { getAllJobs, getJobById, DEPARTMENTS, LOCATIONS, JOB_TYPES } from "../../static-data/jobs";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { ToastProvider } from "../../utils/toast.jsx";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import JobDetailsDrawer from "./JobDetailsDrawer";
import ApplicationFlow from "./ApplicationFlow";
import TrackApplicationModal from "./TrackApplicationModal";

const WHY_JOIN = [
  { icon: TrendingUp, title: "Growth", desc: "Learn, experiment and grow your career." },
  { icon: Users, title: "Great People", desc: "Work with talented and supportive teammates." },
  { icon: Target, title: "Meaningful Work", desc: "Build projects that solve real-world problems." },
  { icon: GraduationCap, title: "Learning", desc: "Continuous learning and professional development." },
  { icon: Scale, title: "Work-Life Balance", desc: "A healthy and flexible working environment." },
  { icon: Lightbulb, title: "Innovation", desc: "Freedom to explore new ideas and better ways of working." },
];

const TRUST_INDICATORS = [
  { icon: Users2, label: "Growing Team" },
  { icon: Layers, label: "Multiple Opportunities" },
  { icon: BookOpen, label: "Learning & Development" },
  { icon: Heart, label: "Collaborative Culture" },
];

const FAQS = [
  {
    q: "How do I apply for a position?",
    a: "Browse open positions below, open the one that interests you, and click \"Apply for this Position\" to start the application form.",
  },
  {
    q: "Can I apply for multiple positions?",
    a: "Yes — you're welcome to submit a separate application for each role you're a good fit for.",
  },
  {
    q: "Do you offer remote positions?",
    a: "Work mode varies by role and is listed on each job's details — some are on-site, some hybrid or remote depending on the team's needs.",
  },
  {
    q: "What happens after I submit my application?",
    a: "Your application goes to our recruitment team for review. If there's a match with an open role, we'll reach out directly using the contact details you provide.",
  },
  {
    q: "Can I update my application after submitting it?",
    a: "There isn't a self-service edit option yet. If something changes, reach out to us via the Contact page and reference the role you applied for.",
  },
  {
    q: "How long does the hiring process take?",
    a: "Timelines vary by role and team availability. We'll keep you updated on next steps once your application is reviewed.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 overflow-hidden bg-card-light/60 dark:bg-card-dark/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-secondary dark:text-white text-sm sm:text-base">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-secondary/40 dark:text-white/40">
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-secondary/60 dark:text-white/60 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CareersPageContent() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const positionsRef = useRef(null);
  const whyRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);

  const allJobs = useMemo(() => getAllJobs(), []);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [openFaq, setOpenFaq] = useState(0);

  const [viewingJob, setViewingJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Deep link: /careers?job=<id>
  useEffect(() => {
    const jobId = searchParams.get("job");
    if (jobId) {
      const job = getJobById(jobId);
      if (job) setViewingJob(job);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openJob = (job) => {
    setViewingJob(job);
    setSearchParams({ job: job.id });
  };
  const closeJob = () => {
    setViewingJob(null);
    searchParams.delete("job");
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = allJobs.filter((j) => {
      const matchesSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        j.department.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "all" || j.department === department;
      const matchesLoc = location === "all" || j.location === location;
      const matchesType = type === "all" || j.type === type;
      return matchesSearch && matchesDept && matchesLoc && matchesType;
    });

    if (sortBy === "experience") {
      result = [...result].sort((a, b) => a.experience.localeCompare(b.experience));
    } else {
      result = [...result].sort((a, b) => {
        if (a.isGeneral) return 1;
        if (b.isGeneral) return -1;
        return new Date(b.postedDate || 0) - new Date(a.postedDate || 0);
      });
    }
    return result;
  }, [allJobs, search, department, location, type, sortBy]);

  const hasActiveFilters = search !== "" || department !== "all" || location !== "all" || type !== "all";
  const clearFilters = () => { setSearch(""); setDepartment("all"); setLocation("all"); setType("all"); };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative overflow-hidden bg-bg-dark text-white pt-32 lg:pt-40 pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1a2744_0%,_#0B1220_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[4%] w-[420px] h-[420px] bg-primary/15 blur-[160px] rounded-full pointer-events-none"
        />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">Careers at RKGC Group</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Build Your Future{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  With Us
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-9">
                Join a team building meaningful, lasting infrastructure — roads, real estate, and the
                spaces people live and work in. We're looking for people who care about doing it right.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Button variant="primary" arrow onClick={() => scrollTo(positionsRef)}>
                  View Open Positions
                </Button>
                <Button variant="secondary" onClick={() => scrollTo(whyRef)}>
                  Explore Life at RKGC
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/10">
                {TRUST_INDICATORS.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-white/60">
                    <t.icon size={15} className="text-primary" />
                    {t.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <motion.div style={{ y: heroImgY }} className="relative">
                <div className="absolute -inset-8 bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-primary/60 via-white/15 to-accent/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                  <div className="rounded-[27px] overflow-hidden border border-white/15">
                    <img
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80"
                      alt="The RKGC team on site"
                      className="w-full h-[340px] sm:h-[420px] object-cover object-[50%_68%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============ WHY JOIN US ============ */}
      <section ref={whyRef} className="py-24">
        <Container>
          <SectionHeading
            badge="Why Join Us"
            title={
              <>
                Why You&apos;ll Love{" "}
                <span className="text-primary">Working With Us</span>
              </>
            }
            className="mb-14 mx-auto"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_JOIN.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-[24px] border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-7 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-secondary/60 dark:text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ OPEN POSITIONS ============ */}
      <section ref={positionsRef} className="py-24 bg-card-light/40 dark:bg-card-dark/20">
        <Container>
          <SectionHeading
            badge="Open Positions"
            title={
              <>
                Find Your Next <span className="text-primary">Opportunity</span>
              </>
            }
            subtitle="Explore open roles and find the opportunity that matches your skills and ambitions."
            className="mb-10 mx-auto"
          />

          <div className="mb-8">
            <JobFilters
              search={search}
              onSearchChange={setSearch}
              department={department}
              onDepartmentChange={setDepartment}
              departments={DEPARTMENTS}
              location={location}
              onLocationChange={setLocation}
              locations={LOCATIONS}
              type={type}
              onTypeChange={setType}
              types={JOB_TYPES}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-secondary/50 dark:text-white/50">No roles match your filters right now.</p>
              <button onClick={clearFilters} className="mt-3 text-sm font-semibold text-primary hover:underline underline-offset-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} onView={openJob} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ============ TRACK APPLICATION ============ */}
      <section className="py-14">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-[24px] border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark px-6 sm:px-8 py-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="hidden sm:flex w-11 h-11 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                <Search size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-secondary dark:text-white">Already applied?</p>
                <p className="text-sm text-secondary/55 dark:text-white/55 mt-0.5">Track the status of your application using your Application ID.</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => setTrackModalOpen(true)} className="shrink-0 w-full sm:w-auto justify-center">
              Track Your Application
            </Button>
          </div>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24">
        <Container className="max-w-3xl">
          <SectionHeading badge="FAQ" title={<>Frequently Asked <span className="text-primary">Questions</span></>} className="mb-10 mx-auto" />
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </Container>
      </section>

      <JobDetailsDrawer job={viewingJob} onClose={closeJob} onApply={(job) => setApplyingJob(job)} />

      <AnimatePresence>
        {applyingJob && <ApplicationFlow job={applyingJob} onClose={() => setApplyingJob(null)} />}
      </AnimatePresence>

      <TrackApplicationModal open={trackModalOpen} onClose={() => setTrackModalOpen(false)} />
    </div>
  );
}

export default function CareersPage() {
  return (
    <ToastProvider>
      <CareersPageContent />
    </ToastProvider>
  );
}
