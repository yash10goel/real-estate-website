import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// Route-level code splitting — Home stays eager for the fastest first
// paint on "/"; everything else (including admin, which pulls in
// xlsx-js-style/file-saver) loads only when its route is actually
// visited, keeping those out of the homepage's initial JS payload.
const ProjectsDetailPage = lazy(() => import("./components/Projects/ProjectsDetailPage"));
const ProjectDetailPage = lazy(() => import("./components/Projects/ProjectDetailPage"));
const ContactPage = lazy(() => import("./components/ContactUs/Contact"));
const InvestmentPage = lazy(() => import("./components/Investment/InvestmentPage"));
const CareersPage = lazy(() => import("./components/Careers/CareersPage"));
const ExportsPage = lazy(() => import("./components/Exports/ExportsPage"));
const OurBrandPage = lazy(() => import("./components/OurBrand/OurBrandPage"));
const UnderConstruction = lazy(() => import("./components/layout/UnderConstruction"));
const NotFoundPage = lazy(() => import("./components/layout/NotFoundPage"));

const Login = lazy(() => import("./pages/admin/Login"));
const UserInfo = lazy(() => import("./pages/admin/UserInfo"));
const JobApplications = lazy(() => import("./pages/admin/JobApplications"));

export default function App() {
    const location = useLocation();

    const isAdminRoute =
        location.pathname.startsWith("/admin");

    return (
        <div className="bg-bg-light dark:bg-bg-dark text-secondary dark:text-white transition-colors duration-300 font-body">

            {!isAdminRoute && <Navbar />}

            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/our-brand"
                        element={<OurBrandPage />}
                    />

                    <Route
                        path="/projects"
                        element={<ProjectsDetailPage />}
                    />

                    <Route
                        path="/projects/:categorySlug/:projectSlug"
                        element={<ProjectDetailPage />}
                    />

                    <Route
                        path="/contact"
                        element={<ContactPage />}
                    />

                    <Route
                        path="/investment"
                        element={<InvestmentPage />}
                    />

                    <Route
                        path="/careers"
                        element={<CareersPage />}
                    />

                    <Route
                        path="/exports"
                        element={<ExportsPage />}
                    />

                    <Route
                        path="/under-construction"
                        element={<UnderConstruction />}
                    />

                    {/* Admin Login */}
                    <Route
                        path="/admin"
                        element={<Login />}
                    />

                    {/* Protected Admin Page */}
                    <Route
                        path="/admin/userinfo"
                        element={
                            <ProtectedRoute>
                                <UserInfo />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/job-applications"
                        element={
                            <ProtectedRoute>
                                <JobApplications />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch-all 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>

            {!isAdminRoute && <Footer />}
        </div>
    );
}
