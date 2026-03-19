import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {

    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const links = ["Home", "Projects", "Properties", "Contact"];

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute top-6 left-0 w-full z-50"
        >
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between
      backdrop-blur-md bg-white/3 border border-white/10 rounded-xl">

                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 text-white cursor-pointer"
                >
                    <div className="w-9 h-9 bg-yellow-400 rounded-md flex items-center justify-center text-black font-bold shadow-lg">
                        RK
                    </div>

                    <h1 className="text-xl font-semibold tracking-wide">
                        RK Gupta <span className="text-yellow-400">Contractor</span>
                    </h1>
                </motion.div>

                {/* Links */}
                <div className="flex items-center gap-8 text-sm text-white">

                    {links.map((link, i) => (
                        <motion.a
                            key={i}
                            whileHover={{ y: -2 }}
                            className="relative cursor-pointer group"
                        >
                            {link}

                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}

                    {/* Theme Toggle */}
                    <div
                        onClick={() => setDark(!dark)}
                        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition
  ${dark ? "bg-yellow-400" : "bg-white/20"}`}
                    >

                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                        >
                            {dark
                                ? <Moon size={12} className="text-gray-500" />
                                : <Sun size={12} className="text-yellow-500" />
                            }
                        </motion.div>

                    </div>

                </div>

            </div>
        </motion.nav>
    );
}