import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../configs/supabase";
import { deleteResume } from "../../utils/resume";
import { useToast, ToastProvider } from "../../utils/toast.jsx";
import AdminLayout from "../../components/admin/AdminLayout";
import EmptyState from "../../components/admin/EmptyState";
import ErrorState from "../../components/admin/ErrorState";
import { TableRowSkeleton, KpiCardSkeleton } from "../../components/admin/Skeletons";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import ApplicationFilters, { DATE_RANGES } from "../../components/admin/careers/ApplicationFilters";
import ApplicationsTable from "../../components/admin/careers/ApplicationsTable";
import ApplicationDetailsDrawer from "../../components/admin/careers/ApplicationDetailsDrawer";
import StatusSummaryCards from "../../components/admin/careers/StatusSummaryCards";
import { STATUSES } from "../../static-data/applicationStatus";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function JobApplicationsContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [search, setSearch] = useState("");
  const [job, setJob] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error(err.message || "Failed to load applications");
      setLoadError(true);
      setApplications([]);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const jobOptions = useMemo(() => [...new Set(applications.map((a) => a.job_title).filter(Boolean))].sort(), [applications]);

  const filtered = useMemo(() => {
    let result = applications.filter((a) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.job_title?.toLowerCase().includes(q);
      const matchesJob = job === "all" || a.job_title === job;
      const matchesStatus = status === "all" || a.status === status;
      return matchesSearch && matchesJob && matchesStatus;
    });

    if (dateRange !== "all") {
      const now = new Date();
      const todayStart = startOfDay(now);
      result = result.filter((a) => {
        const created = new Date(a.created_at);
        if (dateRange === "today") return created >= todayStart;
        if (dateRange === "7d") return created >= new Date(todayStart.getTime() - 6 * DAY_MS);
        if (dateRange === "30d") return created >= new Date(todayStart.getTime() - 29 * DAY_MS);
        return true;
      });
    }
    return result;
  }, [applications, search, job, status, dateRange]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => setCurrentPage(1), [search, job, status, dateRange, rowsPerPage]);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const statusCounts = useMemo(() => {
    const counts = {};
    STATUSES.forEach((s) => (counts[s.value] = 0));
    applications.forEach((a) => {
      const key = a.status || "New";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [applications]);

  const hasActiveFilters = search !== "" || job !== "all" || status !== "all" || dateRange !== "all";
  const clearFilters = () => { setSearch(""); setJob("all"); setStatus("all"); setDateRange("all"); };

  const handleUpdated = (updatedApp) => {
    setApplications((prev) => prev.map((a) => (a.id === updatedApp.id ? { ...a, ...updatedApp } : a)));
    setSelected((prev) => (prev && prev.id === updatedApp.id ? { ...prev, ...updatedApp } : prev));
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.resume_path) {
        try {
          await deleteResume(deleteTarget.resume_path);
        } catch (err) {
          console.error("Resume cleanup failed:", err.message);
        }
      }
      const { error } = await supabase.from("job_applications").delete().eq("id", deleteTarget.id);
      if (error) throw error;

      setApplications((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      if (selected?.id === deleteTarget.id) setSelected(null);
      toast("Application deleted", "success");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err.message || "Failed to delete application");
      toast(err?.message ? `Couldn't delete: ${err.message}` : "Couldn't delete application", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout breadcrumb={["Dashboard", "Careers", "Job Applications"]} onLogout={logout}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-secondary dark:text-white">Job Applications</h1>
          <p className="text-sm text-secondary/50 dark:text-white/50 mt-1">Review and manage candidate applications</p>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark">
            <ErrorState onRetry={load} />
          </div>
        ) : (
          <>
            <div className="mb-6">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => <KpiCardSkeleton key={i} />)}
                </div>
              ) : (
                <StatusSummaryCards counts={statusCounts} total={applications.length} activeStatus={status} onSelect={setStatus} />
              )}
            </div>

            <div className="mb-4">
              <ApplicationFilters
                search={search}
                onSearchChange={setSearch}
                job={job}
                onJobChange={setJob}
                jobOptions={jobOptions}
                status={status}
                onStatusChange={setStatus}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {loading ? (
              <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark">
                <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
              </div>
            ) : (
              <>
                <ApplicationsTable applications={paginated} onView={setSelected} onDelete={setDeleteTarget} />
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filtered.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setRowsPerPage}
                    itemLabel="applications"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <ApplicationDetailsDrawer
        app={selected}
        onClose={() => setSelected(null)}
        onUpdated={handleUpdated}
        onRequestDelete={(app) => setDeleteTarget(app)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this application?"
        description={
          deleteTarget
            ? `This will permanently delete ${deleteTarget.first_name} ${deleteTarget.last_name}'s application and resume. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete Application"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  );
}

export default function JobApplications() {
  return (
    <ToastProvider>
      <JobApplicationsContent />
    </ToastProvider>
  );
}
