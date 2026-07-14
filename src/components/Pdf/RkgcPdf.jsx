// import { forwardRef } from "react";

// const RkgcPdf = forwardRef((props, ref) => {
//     return (
//         <div
//             ref={ref}
//             className="w-[800px] bg-white text-black font-sans"
//         >

//             {/* HEADER / BRAND */}
//             <div className="bg-black text-white p-8 flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold tracking-widest text-yellow-400">
//                         RKGC
//                     </h1>
//                     <p className="text-sm text-gray-300">
//                         RK Gupta Contractor
//                     </p>
//                 </div>

//                 <div className="text-right">
//                     <p className="text-sm text-gray-400">Building Excellence</p>
//                     <p className="text-xs text-gray-500">Since 2010</p>
//                 </div>
//             </div>

//             {/* HERO SECTION */}
//             <div className="p-8 bg-yellow-50">
//                 <h2 className="text-2xl font-bold mb-3">
//                     Premium Construction & Real Estate Solutions
//                 </h2>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                     We deliver high-quality infrastructure, modern real estate
//                     development, and world-class interior solutions with trust,
//                     innovation, and precision.
//                 </p>
//             </div>

//             {/* SERVICES GRID */}
//             <div className="p-8">
//                 <h2 className="text-xl font-semibold mb-6 border-b pb-2">
//                     Our Services
//                 </h2>

//                 <div className="grid grid-cols-2 gap-6">

//                     <div className="border p-4 rounded-lg shadow-sm">
//                         <h3 className="font-semibold text-yellow-600 mb-2">
//                             Construction
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                             Residential & commercial construction with modern techniques.
//                         </p>
//                     </div>

//                     <div className="border p-4 rounded-lg shadow-sm">
//                         <h3 className="font-semibold text-yellow-600 mb-2">
//                             Real Estate
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                             Property development and investment solutions.
//                         </p>
//                     </div>

//                     <div className="border p-4 rounded-lg shadow-sm">
//                         <h3 className="font-semibold text-yellow-600 mb-2">
//                             Interior Design
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                             Elegant and modern interior planning & execution.
//                         </p>
//                     </div>

//                     <div className="border p-4 rounded-lg shadow-sm">
//                         <h3 className="font-semibold text-yellow-600 mb-2">
//                             Project Management
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                             End-to-end project planning and execution.
//                         </p>
//                     </div>

//                 </div>
//             </div>

//             {/* VISUAL / REAL ESTATE BLOCK */}
//             <div className="bg-black text-white p-8">
//                 <h2 className="text-xl font-semibold mb-4 text-yellow-400">
//                     Why Choose RKGC?
//                 </h2>

//                 <ul className="space-y-2 text-sm text-gray-300">
//                     <li>✔ High-quality construction standards</li>
//                     <li>✔ Experienced engineering team</li>
//                     <li>✔ Timely project delivery</li>
//                     <li>✔ Modern architecture & design</li>
//                 </ul>
//             </div>

//             {/* ABOUT */}
//             <div className="p-8">
//                 <h2 className="text-xl font-semibold mb-3">
//                     About Us
//                 </h2>

//                 <p className="text-sm text-gray-700 leading-relaxed">
//                     RK Gupta Contractor (RKGC) is a trusted name in construction
//                     and real estate, delivering excellence through innovation,
//                     quality craftsmanship, and customer satisfaction. Our mission
//                     is to build spaces that inspire and last generations.
//                 </p>
//             </div>

//             {/* FOOTER */}
//             <div className="bg-yellow-400 text-black text-center p-4 text-sm font-medium">
//                 www.rkgc.com | info@rkgc.com | +91-XXXXXXXXXX
//             </div>

//         </div>
//     );
// });

// export default RkgcPdf;


import { forwardRef } from "react";
import CoverPage from "./CoverPage";
import AboutPage from "./AboutPage";
import CompaniesPage from "./CompaniesPage";
import GrowthPage from "./GrowthPage";
import ServicesPage from "./ServicesPage";
import ProjectsPage from "./ProjectsPage";
import ClientsPage from "./ClientsPage";
import CapabilityPage from "./CapabilityPage";
import TeamPage from "./TeamPage";
import ContactPage from "./ContactPage";
import BrandsPage from "./BrandsPage";


const RkgcProfilePdf = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[1200px] bg-white">
      <CoverPage />
      <AboutPage />
      <CompaniesPage />
      <GrowthPage />
      <ServicesPage />
      <ProjectsPage />
      <ClientsPage />
      <CapabilityPage />
      <TeamPage />
      <ContactPage />
      <BrandsPage />
    </div>
  );
});

export default RkgcProfilePdf;