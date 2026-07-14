import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Send } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Properties", path: "/under-construction" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Construction",
  "Real Estate",
  "Interior Design",
  "Consultation",
];

const contactDetails = [
  { icon: MapPin, label: "Dadri, India" },
  { icon: Phone, label: "+91 9876543210" },
  { icon: Mail, label: "info@buildestate.com" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/70 pt-20 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
        >

          {/* BRAND */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              Build<span className="text-primary">Estate</span>
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
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
            <h3 className="font-heading text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-heading text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service} className="text-white/60">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + NEWSLETTER */}
          <div>
            <h3 className="font-heading text-white font-medium mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm mb-6">
              {contactDetails.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                >
                  <Icon size={15} className="text-primary shrink-0" />
                  <span className="text-white/70">{label}</span>
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
            © 2026 BuildEstate Construction & Real Estate
          </p>

          <p className="text-sm text-white/40">
            Crafted with care for lasting landmarks.
          </p>

        </div>

      </div>
    </footer>
  );
}
