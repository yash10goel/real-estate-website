import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        // { name: "Properties", path: "/properties" },
        { name: "Properties", path: "/under-construction" },

        { name: "Contact", path: "/contact" },
    ];

    const navLinks = links.filter((link) => link.name !== "Contact");
    const contactLink = links.find((link) => link.name === "Contact");

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/pdf/RKGC%20PROFILE.pdf";
        link.download = "RKGC-PROFILE.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 left-0 w-full z-[9999] px-4 pt-3"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4
                bg-white/70 dark:bg-secondary/70 backdrop-blur-2xl border border-secondary/10 dark:border-white/10
                rounded-2xl pl-5 pr-3 py-2.5
                shadow-[0_10px_40px_-12px_rgba(17,24,39,0.18)] dark:shadow-[0_10px_40px_-8px_rgba(0,0,0,0.6)]
                text-secondary dark:text-white transition-colors duration-300">

                {/* Logo */}
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ rotate: 6 }}
                            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-secondary shadow-glow ring-1 ring-white/40"
                        >
                            <Building2 size={20} strokeWidth={2.4} />
                        </motion.div>

                        <h1 className="text-[22px] font-heading font-bold tracking-tight leading-none">
                            RKGC{" "}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Group
                            </span>
                        </h1>
                    </motion.div>
                </Link>

                {/* Desktop Links + Actions */}
                <div className="hidden md:flex items-center gap-5">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/[0.03] dark:bg-white/[0.05]">
                        {navLinks.map((link, i) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={i}
                                    to={link.path}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "text-secondary dark:text-white"
                                            : "text-secondary/55 dark:text-white/55 hover:text-secondary dark:hover:text-white"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20"
                                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* RKGC PDF Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleDownload}
                            aria-label="Download RKGC company profile PDF"
                            className="w-10 h-10 rounded-full bg-white/60 dark:bg-white/10 border border-secondary/10 dark:border-white/15 text-secondary dark:text-white flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300 relative group"
                        >
                            <FileText size={17} />

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute -bottom-10 whitespace-nowrap bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                What is RKGC?
                            </span>
                        </motion.button>

                        {/* Contact CTA */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                            <Link
                                to={contactLink.path}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-secondary bg-gradient-to-r from-primary to-accent shadow-glow hover:shadow-[0_0_35px_rgba(244,180,0,0.5)] transition-all duration-300"
                            >
                                {contactLink.name}
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        type="button"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Fullscreen Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 z-[9998] bg-white/95 dark:bg-secondary/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-3"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-secondary/5 dark:bg-white/10 flex items-center justify-center text-secondary dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <X size={22} />
                        </motion.button>

                        {links.map((link, i) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.12 + i * 0.06 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`text-3xl font-heading font-semibold ${
                                            isActive ? "text-primary" : "text-secondary dark:text-white"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 + links.length * 0.06 }}
                            onClick={handleDownload}
                            className="mt-6 flex items-center gap-2 text-base font-medium text-secondary/70 dark:text-white/70"
                        >
                            <FileText size={18} className="text-primary" />
                            Download Profile
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
