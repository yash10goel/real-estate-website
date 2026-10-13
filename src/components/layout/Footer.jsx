import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Send } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Our Brand", path: "/our-brand" },
  { name: "Projects", path: "/projects" },
  { name: "Properties", path: "/properties" },
  { name: "Exports", path: "/exports" },
  { name: "Investment", path: "/investment" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Construction",
  "Real Estate",
  "Interior Design",
  "Consultation",
];

const addresses = [
  "408, 409 4th Floor, Aditya High Street, Lalkuan, Ghaziabad",
  "Head Office: Plot No 2, Vill Kot, Near EPE Toll Plaza, Dadri - 203207",
];

const phones = [
  { label: "+91 77352 35277", href: "tel:+917735235277" },
  { label: "8527190899", href: "tel:+918527190899" },
];

const emails = ["info@rkgcgroup.com", "rkgupta0001@gmail.com"];

const columnHeading = "text-[11px] font-semibold uppercase tracking-[0.28em] text-primary mb-5";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070d18] text-white/70 pt-16 sm:pt-20 pb-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* TOP GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr] lg:gap-10 mb-14"
        >

          {/* BRAND */}
          <div>
            <h2 className="font-display text-3xl font-semibold text-white mb-4">
              RKGC <span className="italic text-primary">Group</span>
            </h2>
            <p className="text-sm text-white/55 leading-relaxed mb-7 max-w-xs">
              We build modern homes, commercial spaces, and real estate solutions
              with quality, trust, and innovation.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className={columnHeading}>Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/65 hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className={columnHeading}>Services</h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service} className="text-white/60">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + NEWSLETTER */}
          <div>
            <h3 className={columnHeading}>Get In Touch</h3>
            <ul className="space-y-4 text-sm mb-7">
              {addresses.map((address) => (
                <li key={address} className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-white/65 leading-relaxed">{address}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-primary shrink-0 mt-0.5" />
                <span className="flex flex-wrap gap-x-2 text-white/65">
                  {phones.map((phone, i) => (
                    <span key={phone.href}>
                      <a href={phone.href} className="hover:text-primary transition-colors">{phone.label}</a>
                      {i < phones.length - 1 && <span className="ml-2 text-white/25">|</span>}
                    </span>
                  ))}
                </span>
              </li>
              {emails.map((email) => (
                <li key={email} className="flex items-start gap-3">
                  <Mail size={15} className="text-primary shrink-0 mt-0.5" />
                  <a href={`mailto:${email}`} className="text-white/65 hover:text-primary transition-colors break-all">
                    {email}
                  </a>
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent text-secondary flex items-center justify-center shadow-glow hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </motion.div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-white/40">
            © 2026 RKGC Group Construction & Real Estate
          </p>

          <p className="text-sm text-white/40">
            Crafted with care for lasting landmarks.
          </p>

        </div>

      </div>
    </footer>
  );
}
