import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const constructionProjects = [
  {
    id: 1,
    title: "Skyline Tower",
    location: "Delhi",
    desc: "High-rise modern tower with premium facilities and advanced infrastructure.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
  },
  {
    id: 2,
    title: "Metro Bridge",
    location: "Noida",
    desc: "Infrastructure project connecting major hubs with strong engineering.",
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200",
  },
  {
    id: 3,
    title: "Smart City Block",
    location: "Gurgaon",
    desc: "Smart living with modern technology and sustainable design.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200",
  },
  {
    id: 4,
    title: "Industrial Hub",
    location: "Faridabad",
    desc: "Large-scale industrial construction with advanced planning.",
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200",
  },
  {
    id: 5,
    title: "Expressway Project",
    location: "Jaipur",
    desc: "High-speed road infrastructure with modern safety standards.",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200",
  },
  {
    id: 6,
    title: "Commercial Complex",
    location: "Chandigarh",
    desc: "Modern commercial building with premium office spaces.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  },
  {
    id: 7,
    title: "Bridge Expansion",
    location: "Lucknow",
    desc: "Expansion of city bridge for better connectivity.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200",
  },
];

const realEstateProjects = [
  {
    id: 1,
    title: "Luxury Villas",
    location: "Goa",
    desc: "Beachside luxury villas with premium architecture.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
  },
  {
    id: 2,
    title: "Green Residency",
    location: "Pune",
    desc: "Eco-friendly housing society with modern amenities.",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200",
  },
  {
    id: 3,
    title: "Urban Heights",
    location: "Bangalore",
    desc: "High-rise apartments located in prime IT hub.",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200",
  },
  {
    id: 4,
    title: "Palm Residency",
    location: "Mumbai",
    desc: "Luxury apartments with sea-facing view.",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
  },
  {
    id: 5,
    title: "City Homes",
    location: "Hyderabad",
    desc: "Affordable housing with modern facilities.",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200",
  },
  {
    id: 6,
    title: "Elite Residency",
    location: "Ahmedabad",
    desc: "Premium gated society with luxury amenities.",
    img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
  },
  {
    id: 7,
    title: "Royal Heights",
    location: "Kolkata",
    desc: "Modern apartments with premium lifestyle features.",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
  },
];

export default function ProjectsDetailPage() {
  const [activeTab, setActiveTab] = useState("construction");
  const navigate = useNavigate();

  const data = activeTab === "construction" ? constructionProjects : realEstateProjects;

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-bg-light via-primary/5 to-bg-light dark:from-bg-dark dark:via-secondary dark:to-bg-dark transition-colors duration-300">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white">
          Our <span className="text-primary">Projects</span>
        </h1>
        <p className="text-secondary/60 dark:text-white/60 mt-4 text-lg">
          Explore our premium construction & real estate projects
        </p>
      </div>

      {/* Premium Tabs */}
      <div className="flex justify-center mb-16">
        <div className="flex gap-10 text-lg font-medium">
          {["construction", "realestate"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer relative pb-2 transition ${activeTab === tab ? "text-primary" : "text-secondary/50 dark:text-white/50"
                }`}
            >
              {tab === "construction" ? "Construction" : "Real Estate"}

              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-primary to-accent"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Projects Detail Sections */}
      <div className="max-w-6xl mx-auto px-4 space-y-20">
        <AnimatePresence mode="wait">
          {data.map((item, index) => (
            <motion.div
              key={item.id + activeTab}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >

              {/* Image */}
              <div className="overflow-hidden rounded-2xl shadow-glass dark:shadow-glass-dark">
                <motion.img
                  src={item.img}
                  loading="lazy"
                  className="w-full h-[350px] object-cover"
                  whileHover={{ scale: 1.05 }}
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-secondary dark:text-white">
                  {item.title}
                </h2>

                <p className="text-primary mt-2 font-medium">
                  {item.location}
                </p>

                <p className="text-secondary/60 dark:text-white/60 mt-4 leading-relaxed">
                  {item.desc}
                </p>

                <ul className="mt-4 text-sm text-secondary/50 dark:text-white/50 space-y-1">
                  <li>✔ Premium Quality Construction</li>
                  <li>✔ Modern Architecture</li>
                  <li>✔ Trusted by Clients</li>
                </ul>

                <button
                  onClick={() => navigate("/contact")}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-primary to-accent text-secondary font-semibold rounded-lg shadow-glow hover:shadow-[0_0_35px_rgba(244,180,0,0.5)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {activeTab === "construction"
                    ? "Contact for Construction"
                    : "Contact for Real Estate"}
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
<div className="mt-28 pb-12 relative text-center overflow-hidden">

  {/* Background Glow */}
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute inset-0 flex justify-center items-center"
  >
    <div className="w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
  </motion.div>

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10"
  >
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white">
      Let's Build <span className="text-primary">Something Great</span> Together
    </h2>

    <p className="text-secondary/60 dark:text-white/60 mt-4 text-lg">
      Start your next project with us — quality, trust & excellence guaranteed
    </p>

    {/* Button */}
   <motion.button
  whileHover={{ scale: 1.06, y: -3 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/contact")}
  className="relative mt-10 px-10 py-4 rounded-full font-semibold text-secondary
  bg-gradient-to-r from-primary to-accent
  shadow-glow
  hover:shadow-[0_12px_40px_rgba(244,180,0,0.5)]
  transition-all duration-300 overflow-hidden
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
>
  {/* Shine effect */}
  <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-500 blur-xl" />

  {/* Text */}
  <span className="relative z-10">Get in Touch</span>
</motion.button>
  </motion.div>

</div>

    </div>
  );
}
