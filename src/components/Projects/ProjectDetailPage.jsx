import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapPin, Landmark, ArrowLeft, Loader2 } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import { generateProjectPdf, buildFallbackDescription } from "../../utils/generateProjectPdf";
import { findProjectBySlug } from "../../utils/projectSlug";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Seo from "../../seo/Seo";
import { getProjectSeo } from "../../seo/projectSeo";
import { breadcrumbSchema } from "../../seo/schema";
import NotFoundPage from "../layout/NotFoundPage";

// Standalone, crawlable equivalent of ProjectDetailsModal.jsx — same real
// project data and fields, rendered as a normal page instead of a portal
// modal, so each project has its own indexable URL. The modal remains the
// primary in-app interaction; this page is what a direct link, a new-tab
// open, or a crawler lands on.
export default function ProjectDetailPage() {
  const { categorySlug, projectSlug } = useParams();
  const allProjects = useSelector((state) => state.projects.list);
  const [downloading, setDownloading] = useState(false);

  const project = findProjectBySlug(allProjects, categorySlug, projectSlug);

  if (!project) return <NotFoundPage />;

  const vertical = verticals.find((v) => v.slug === project.category);
  const Icon = project.icon || Landmark;
  const image = project.image || vertical?.image;
  const isStartSoon = project.status === "start-soon";
  const description = project.description || buildFallbackDescription(project);
  const seo = getProjectSeo(project);

  const overview = [
    { label: "Project Name", value: project.name },
    project.employer ? { label: "Employer", value: project.employer } : null,
    project.workType ? { label: "Work Type", value: project.workType } : null,
    !project.employer ? { label: "Category", value: project.category } : null,
    { label: "Location", value: project.location },
    isStartSoon ? { label: "Status", value: "Start Soon" } : project.progress ? { label: "Progress", value: project.progress } : null,
    project.amount ? { label: "Contract Value", value: `₹${project.amount}` } : null,
  ].filter(Boolean);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await generateProjectPdf(project, vertical);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        jsonLd={breadcrumbSchema(seo.breadcrumb)}
      />

      {/* Hero */}
      <div className="relative h-[280px] sm:h-[380px] lg:h-[440px] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${project.name} — RKGC ${project.category} project`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.95)" }}
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary dark:bg-[#0A0E1A] flex items-center justify-center">
            <Icon size={64} strokeWidth={1.1} className="text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

        <Container className="relative z-10 h-full flex flex-col justify-end pb-8 sm:pb-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-primary text-xs font-semibold tracking-wide uppercase mb-6 w-fit transition-colors duration-300"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <span className="inline-block text-primary text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
            {project.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight mb-2">
            {project.name}
          </h1>
          <p className="flex items-center gap-1.5 text-white/65 text-sm">
            <MapPin size={13} className="text-primary shrink-0" />
            {project.location}
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-primary" />
            <span className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase">
              About The Project
            </span>
          </div>
          <p className="text-secondary/65 dark:text-white/60 leading-relaxed">{description}</p>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-primary" />
            <span className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase">
              Project Overview
            </span>
          </div>
          <dl className="max-w-2xl divide-y divide-secondary/10 dark:divide-white/10 border-t border-secondary/10 dark:border-white/10">
            {overview.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-6 py-3.5">
                <dt className="text-secondary/50 dark:text-white/45 text-sm">{row.label}</dt>
                <dd className="font-semibold text-secondary dark:text-white text-sm text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 pt-10 border-t border-secondary/10 dark:border-white/10 text-center">
          <p className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">RKGC Group</p>
          <p className="text-secondary/60 dark:text-white/55 mb-6">Have questions about this project?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/contact?subject=Project%20Consultation" variant="secondary" arrow>
              Discuss This Project
            </Button>
            <Button variant="primary" onClick={handleDownload} className="min-w-[220px] justify-center">
              {downloading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Preparing PDF
                </>
              ) : (
                <>Download Project Details ↓</>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
