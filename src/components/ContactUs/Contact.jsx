import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { supabase } from "../../configs/supabase";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";

const inquiryTypes = [
  "General Inquiry",
  "Project Consultation",
  "Partnership",
  "Careers",
];

const quickContacts = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 77352 35277",
    sub: "Mon – Sat, 9am – 7pm",
    href: "tel:+917735235277",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@rkgcgroup.com",
    sub: "We usually reply within a day",
    href: "mailto:info@rkgcgroup.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Ghaziabad & Dadri",
    sub: "Two office locations",
    href: "#offices",
  },
];

const mapsHref = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function FieldError({ children, id }) {
  return (
    <AnimatePresence>
      {children && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-1 overflow-hidden"
        >
          <AlertCircle size={12} className="shrink-0" />
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FloatingInput({ label, name, type = "text", value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <motion.div variants={itemVariants}>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`peer w-full h-14 px-5 pt-4 rounded-2xl border outline-none transition-all duration-300 bg-card-light dark:bg-card-dark text-secondary dark:text-white ${
            error
              ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
              : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/20"
          }`}
        />
        <label
          htmlFor={name}
          className={`absolute left-5 pointer-events-none transition-all duration-200 ${
            active
              ? "top-2 text-[10px] tracking-wide uppercase font-semibold text-primary"
              : "top-1/2 -translate-y-1/2 text-sm text-secondary/40 dark:text-white/40"
          }`}
        >
          {label}
        </label>
      </div>
      <FieldError id={`${name}-error`}>{error}</FieldError>
    </motion.div>
  );
}

function FloatingTextArea({ label, name, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <motion.div variants={itemVariants}>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={6}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`peer w-full px-5 pt-7 pb-4 rounded-2xl border resize-none outline-none transition-all duration-300 bg-card-light dark:bg-card-dark text-secondary dark:text-white ${
            error
              ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
              : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/20"
          }`}
        />
        <label
          htmlFor={name}
          className={`absolute left-5 pointer-events-none transition-all duration-200 ${
            active
              ? "top-3 text-[10px] tracking-wide uppercase font-semibold text-primary"
              : "top-5 text-sm text-secondary/40 dark:text-white/40"
          }`}
        >
          {label}
        </label>
      </div>
      <FieldError id={`${name}-error`}>{error}</FieldError>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, href, external, children }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex items-start gap-4 py-4 border-b border-white/10 last:border-b-0 -mx-2 px-2 rounded-xl transition-colors duration-300 ${
        href ? "hover:bg-white/[0.04] cursor-pointer" : ""
      }`}
    >
      <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-white/40 text-[11px] uppercase tracking-wide">{label}</p>
        <div className="text-white/85 text-sm mt-1 leading-relaxed">{children}</div>
      </div>
      {href && (
        <ArrowUpRight
          size={15}
          className="text-white/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1"
        />
      )}
    </Comp>
  );
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: inquiryTypes[0],
    message: "",
  });

  const updateField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "Please enter your name";
    if (!formData.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email address";
    if (!formData.phone.trim()) next.phone = "Please enter your phone number";
    else if (formData.phone.replace(/\D/g, "").length < 10)
      next.phone = "Enter a valid phone number";
    if (!formData.message.trim()) next.message = "Tell us a bit about your project";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("contact_leads").insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: inquiryTypes[0],
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ form: "Something went wrong. Please try again or reach us directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-32 pb-24 bg-gradient-to-br from-bg-light via-white to-primary/5 dark:from-bg-dark dark:via-bg-dark dark:to-secondary transition-colors duration-300"
    >
      {/* Background glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-0 left-0 w-[420px] h-[420px] bg-primary/20 blur-[130px] rounded-full pointer-events-none"
      />
      <div className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Faint blueprint accent, echoes the hero's motif */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <line x1="0" y1="14%" x2="100%" y2="14%" stroke="currentColor" className="text-secondary dark:text-white" strokeWidth="1" strokeDasharray="2 10" />
        <line x1="88%" y1="0" x2="88%" y2="100%" stroke="currentColor" className="text-secondary dark:text-white" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="88%" cy="14%" r="5" fill="none" stroke="currentColor" className="text-secondary dark:text-white" strokeWidth="1" />
      </svg>

      <Container className="relative z-10">
        {/* EDITORIAL INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/15 text-primary px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            Get In Touch
          </span>

          <h1 className="font-heading text-5xl md:text-6xl font-bold mt-6 leading-[1.08] text-secondary dark:text-white">
            Let&apos;s start a{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(244,180,0,0.35)]">
              conversation
            </span>
          </h1>

          <p className="text-secondary/60 dark:text-white/60 text-lg mt-6 max-w-xl">
            Whether it&apos;s a residential tower, a commercial development, or
            simply an idea taking shape — tell us about it. Our team responds
            personally, usually within a day.
          </p>
        </motion.div>

        {/* QUICK CONTACT ROW */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {quickContacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light/70 dark:bg-card-dark/70 backdrop-blur-xl p-5 flex items-start gap-4 hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                <c.icon size={18} className="text-primary group-hover:text-secondary transition-colors duration-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-secondary/50 dark:text-white/50 uppercase tracking-wide">{c.label}</p>
                <p className="text-secondary dark:text-white font-semibold mt-0.5 truncate">{c.value}</p>
                <p className="text-xs text-secondary/40 dark:text-white/40 mt-0.5">{c.sub}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="ml-auto shrink-0 text-secondary/20 dark:text-white/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start mt-16">
          {/* FORM PANEL */}
          <Card hover={false} className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={40} className="text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-secondary dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-secondary/60 dark:text-white/60 mt-3 max-w-sm leading-relaxed">
                    Thank you for reaching out to RKGC Group. Our team will
                    connect with you shortly to discuss your project.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSuccess(false)}
                    className="mt-8 text-sm font-semibold text-primary hover:underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} noValidate>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.span
                      variants={itemVariants}
                      className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase"
                    >
                      Send a message
                    </motion.span>

                    <motion.h2
                      variants={itemVariants}
                      className="font-heading text-3xl md:text-4xl font-bold mt-5 leading-tight text-secondary dark:text-white"
                    >
                      Tell us about your project
                    </motion.h2>

                    {/* Inquiry type */}
                    <motion.div variants={itemVariants} className="mt-8">
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40 dark:text-white/40 mb-3">
                        What are you reaching out about?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData((f) => ({ ...f, subject: type }))}
                            className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
                              formData.subject === type
                                ? "text-secondary"
                                : "text-secondary/55 dark:text-white/55 hover:text-secondary dark:hover:text-white"
                            }`}
                          >
                            {formData.subject === type && (
                              <motion.span
                                layoutId="inquiry-pill"
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
                                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                              />
                            )}
                            <span className="relative z-10">{type}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-x-4 gap-y-5 mt-8">
                      <FloatingInput
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={updateField("fullName")}
                        error={errors.fullName}
                      />
                      <FloatingInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={updateField("phone")}
                        error={errors.phone}
                      />
                      <div className="md:col-span-2">
                        <FloatingInput
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={updateField("email")}
                          error={errors.email}
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <FloatingTextArea
                        label="Tell us about your project..."
                        name="message"
                        value={formData.message}
                        onChange={updateField("message")}
                        error={errors.message}
                      />
                    </div>

                    <FieldError>{errors.form}</FieldError>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        arrow={!loading}
                        disabled={loading}
                        className="mt-6 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              )}
            </AnimatePresence>
          </Card>

          {/* INFO PANEL */}
          <motion.div
            id="offices"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-secondary via-secondary to-[#1E293B] p-8 text-white border border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <motion.div
              animate={reduceMotion ? {} : { opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10">
              {/* Response badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-[11px] font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    animate={reduceMotion ? {} : { scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inline-flex h-full w-full rounded-full bg-primary"
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Usually responds within 24 hours
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold mt-5">
                Reach us directly
              </h3>
              <p className="text-white/50 mt-3 text-sm leading-relaxed">
                Prefer to talk right away? Call, email or find us at either
                of our offices below.
              </p>

              <div className="mt-6">
                <InfoRow icon={Phone} label="Phone" href="tel:+917735235277">
                  <p>+91 77352 35277</p>
                  <p>+91 8527190899</p>
                </InfoRow>

                <InfoRow icon={Mail} label="Email" href="mailto:info@rkgcgroup.com">
                  <p>info@rkgcgroup.com</p>
                  <p>rkgupta0001@gmail.com</p>
                </InfoRow>

                <InfoRow
                  icon={MapPin}
                  label="Office Address"
                  href={mapsHref("408, 409 4th Floor, Aditya High Street, Lalkuan, Ghaziabad")}
                  external
                >
                  <p>408, 409 4th Floor, Aditya High Street, Lalkuan, Ghaziabad</p>
                </InfoRow>

                <InfoRow
                  icon={MapPin}
                  label="Head Office"
                  href={mapsHref("Plot No 2, Vill Kot, Near EPE Toll Plaza, Dadri 203207")}
                  external
                >
                  <p>Plot No 2, Vill Kot, Near EPE Toll Plaza, Dadri - 203207</p>
                </InfoRow>

                <InfoRow icon={Clock} label="Working Hours">
                  <p>Mon – Sat · 9:00 AM – 7:00 PM</p>
                </InfoRow>
              </div>

              {/* Route visual — two offices, one connection */}
              <div className="relative h-14 mt-6">
                <svg viewBox="0 0 300 40" className="w-full h-full" aria-hidden="true">
                  <motion.line
                    x1="14"
                    y1="20"
                    x2="286"
                    y2="20"
                    stroke="rgba(244,180,0,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4 7"
                    animate={reduceMotion ? {} : { strokeDashoffset: [0, -22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                  <circle cx="14" cy="20" r="5" fill="#F4B400" />
                  <circle cx="286" cy="20" r="5" fill="#F4B400" />
                </svg>
                <span className="absolute left-0 -bottom-1 text-[10px] text-white/40">Ghaziabad</span>
                <span className="absolute right-0 -bottom-1 text-[10px] text-white/40">Dadri HQ</span>
              </div>

              {/* Stats strip */}
              <div className="flex items-center divide-x divide-white/10 mt-8 pt-6 border-t border-white/10">
                <div className="pr-6">
                  <h4 className="font-heading text-2xl font-bold text-primary">150+</h4>
                  <p className="text-white/50 text-xs mt-1">Projects Delivered</p>
                </div>
                <div className="pl-6">
                  <h4 className="font-heading text-2xl font-bold text-primary">10+</h4>
                  <p className="text-white/50 text-xs mt-1">Years of Excellence</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-8">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-secondary hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
