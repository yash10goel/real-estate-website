export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-300 pt-16 pb-8 ">

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Build<span className="text-yellow-400">Estate</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We build modern homes, commercial spaces, and real estate solutions 
              with quality, trust, and innovation.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-yellow-400 cursor-pointer">Home</li>
              <li className="hover:text-yellow-400 cursor-pointer">About</li>
              <li className="hover:text-yellow-400 cursor-pointer">Projects</li>
              <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-yellow-400 cursor-pointer">Construction</li>
              <li className="hover:text-yellow-400 cursor-pointer">Real Estate</li>
              <li className="hover:text-yellow-400 cursor-pointer">Interior Design</li>
              <li className="hover:text-yellow-400 cursor-pointer">Consultation</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Dadri, India</li>
              <li>📞 +91 9876543210</li>
              <li>✉️ info@buildestate.com</li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500">
            © 2026 BuildEstate Construction & Real Estate
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 text-gray-400 text-sm">
            <span className="hover:text-yellow-400 cursor-pointer">Facebook</span>
            <span className="hover:text-yellow-400 cursor-pointer">Instagram</span>
            <span className="hover:text-yellow-400 cursor-pointer">LinkedIn</span>
          </div>

        </div>

      </div>
    </footer>
  );
}