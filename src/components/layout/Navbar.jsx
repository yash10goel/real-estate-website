import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { name: "Home", path: "/" },
        { name: "Our Brand", path: "/our-brand" },
        { name: "Projects", path: "/projects" },
        // { name: "Properties", path: "/properties" },
        { name: "Properties", path: "/under-construction" },
        { name: "Exports", path: "/exports" },
        { name: "Investment", path: "/investment" },
        { name: "Careers", path: "/careers" },

        { name: "Partner With Us", path: "/contact" },
    ];

    const navLinks = links.filter((link) => link.path !== "/contact");
    const contactLink = links.find((link) => link.path === "/contact");

    // Pages with a full-bleed dark hero read best with a transparent,
    // overlay navbar that resolves to dark glass on scroll; every other
    // route keeps the glass bar throughout.
    const darkHeroRoute = location.pathname === "/" || location.pathname === "/our-brand" || location.pathname === "/projects";
    const fixedPosition = darkHeroRoute;
    const transparent = darkHeroRoute && !scrolled;

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/pdf/RKGC%20PROFILE.pdf";
        link.download = "RKGC-PROFILE.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const inactiveClass = transparent
        ? "text-white/65 hover:text-white"
        : "text-secondary/55 dark:text-white/55 hover:text-secondary dark:hover:text-white";
    const activeClass = transparent ? "text-white" : "text-secondary dark:text-white";

    return (
        <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${fixedPosition ? "fixed" : "sticky"} top-0 left-0 w-full z-[9999] transition-colors duration-500 ${
                transparent
                    ? "bg-transparent border-b border-transparent"
                    : "bg-white/85 dark:bg-secondary/85 backdrop-blur-xl border-b border-secondary/10 dark:border-white/10 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            }`}
        >
            <div className={`max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-3 xl:gap-6 h-[76px] ${transparent ? "text-white" : "text-secondary dark:text-white"}`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <motion.div
                        whileHover={{ rotate: 6, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-secondary shadow-glow ring-1 ring-white/40 shrink-0"
                    >
                        <Building2 size={17} strokeWidth={2.2} />
                    </motion.div>
                    <div className="leading-none">
                        <p className="font-heading text-[17px] font-bold tracking-tight">
                            RKGC <span className="text-primary">Group</span>
                        </p>
                        <p className="hidden xl:block text-[9px] font-semibold tracking-[0.28em] uppercase mt-1.5 opacity-55">
                            Building Legacies
                        </p>
                    </div>
                </Link>

                {/* Desktop nav links — underline active indicator */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                    {navLinks.map((link, i) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={i}
                                to={link.path}
                                className={`group relative py-2 text-[12px] xl:text-[13px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 ${
                                    isActive ? activeClass : inactiveClass
                                }`}
                            >
                                {link.name}
                                {isActive ? (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    />
                                ) : (
                                    <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary/70 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop actions */}
                <div className="hidden lg:flex items-center gap-2.5 xl:gap-4">
                    <ThemeToggle />

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDownload}
                        aria-label="Download RKGC company profile PDF"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-current hover:text-primary transition-colors duration-300 relative group"
                    >
                        <FileText size={16} />
                        <span className="pointer-events-none absolute -bottom-10 whitespace-nowrap bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            What is RKGC?
                        </span>
                    </motion.button>

                    <span className={`w-px h-6 ${transparent ? "bg-white/20" : "bg-secondary/15 dark:bg-white/15"}`} />

                    <Button to={contactLink.path} variant="primary" size="md" className="!px-4 xl:!px-7 whitespace-nowrap">
                        <span className="xl:hidden">Partner</span>
                        <span className="hidden xl:inline">{contactLink.name}</span>
                    </Button>
                </div>

                {/* Mobile controls */}
                <div className="flex items-center gap-3 lg:hidden">
                    <ThemeToggle />
                    <button
                        type="button"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            transparent ? "bg-white/10" : "bg-primary/10 dark:bg-white/10"
                        }`}
                    >
                        {isOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>
            </div>

            {/* Fullscreen Mobile Menu — portalled to <body> so it always
                fixed-positions relative to the viewport, not the navbar
                (a backdrop-blur ancestor creates a containing block that
                would otherwise trap position:fixed descendants). */}
            {createPortal(
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed inset-0 z-[9998] bg-bg-light/98 dark:bg-secondary/98 backdrop-blur-2xl flex flex-col"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            type="button"
                            aria-label="Close navigation menu"
                            onClick={() => setIsOpen(false)}
                            className="fixed top-6 right-6 z-10 w-11 h-11 rounded-full bg-secondary/5 dark:bg-white/10 flex items-center justify-center text-secondary dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <X size={22} />
                        </motion.button>

                        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center gap-1 px-6 py-20">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-5 shrink-0"
                            >
                                RKGC Group
                            </motion.p>

                            {links.map((link, i) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.14 + i * 0.06 }}
                                        className="shrink-0"
                                    >
                                        <Link
                                            to={link.path}
                                            className={`font-display italic text-2xl sm:text-4xl font-medium ${
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
                                transition={{ delay: 0.14 + links.length * 0.06 }}
                                onClick={handleDownload}
                                className="mt-6 shrink-0 flex items-center gap-2 text-base font-medium text-secondary/70 dark:text-white/70"
                            >
                                <FileText size={18} className="text-primary" />
                                Download Profile
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
            )}
        </motion.nav>
    );
}
