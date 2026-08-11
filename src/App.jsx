import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import ProjectsDetailPage from "./components/Projects/ProjectsDetailPage";
import ContactPage from "./components/ContactUs/Contact";
import InvestmentPage from "./components/Investment/InvestmentPage";
import UnderConstruction from "./components/layout/UnderConstruction";

import Login from "./pages/admin/Login";
import UserInfo from "./pages/admin/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";

const RkgcPdf = lazy(() => import("./components/Pdf/RkgcPdf"));

export default function App() {
    const location = useLocation();

    const isAdminRoute =
        location.pathname.startsWith("/admin");

    return (
        <div className="bg-bg-light dark:bg-bg-dark text-secondary dark:text-white transition-colors duration-300 font-body">

            {!isAdminRoute && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/projects"
                    element={<ProjectsDetailPage />}
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
            </Routes>

            {/* Hidden PDF Content */}
            <div
                style={{
                    position: "absolute",
                    left: "-9999px",
                    top: 0,
                }}
            >
                <Suspense fallback={null}>
                    <RkgcPdf />
                </Suspense>
            </div>

            {!isAdminRoute && <Footer />}
        </div>
    );
}