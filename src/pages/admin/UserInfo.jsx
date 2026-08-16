import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, CalendarDays, CalendarRange, Inbox } from "lucide-react";
import { supabase } from "../../configs/supabase";
import { exportLeadsToExcel } from "../../components/excel/ExcelDownload";
import { useToast, ToastProvider } from "../../utils/toast.jsx";
import AdminLayout from "../../components/admin/AdminLayout";
import KpiCard from "../../components/admin/KpiCard";
import LeadsOverTimeChart from "../../components/admin/charts/LeadsOverTimeChart";
import SubjectDistributionChart from "../../components/admin/charts/SubjectDistributionChart";
import LeadFilters from "../../components/admin/LeadFilters";
import LeadsTable from "../../components/admin/LeadsTable";
import Pagination from "../../components/admin/Pagination";
import LeadDetailsDrawer from "../../components/admin/LeadDetailsDrawer";
import EmptyState from "../../components/admin/EmptyState";
import ErrorState from "../../components/admin/ErrorState";
import { KpiCardSkeleton, ChartSkeleton, TableRowSkeleton } from "../../components/admin/Skeletons";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function trendPct(current, previous) {
  if (!previous) return current > 0 ? null : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function UserInfoContent() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [subject, setSubject] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [exporting, setExporting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data, error } = await supabase
        .from("contact_leads")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error(err);
      setLoadError(true);
      setLeads([]);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  // ---- Filtering (search preserves original match fields; date/subject are additive) ----
  const filteredLeads = useMemo(() => {
    let result = leads.filter(
      (lead) =>
        lead.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase()) ||
        lead.subject?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.includes(search)
    );

    if (subject !== "all") {
      result = result.filter((lead) => lead.subject === subject);
    }

    if (dateRange !== "all") {
      const now = new Date();
      const todayStart = startOfDay(now);
      result = result.filter((lead) => {
        if (!lead.created_at) return false;
        const created = new Date(lead.created_at);
        switch (dateRange) {
          case "today":
            return created >= todayStart;
          case "yesterday": {
            const yStart = new Date(todayStart.getTime() - DAY_MS);
            return created >= yStart && created < todayStart;
          }
          case "7d":
            return created >= new Date(todayStart.getTime() - 6 * DAY_MS);
          case "30d":
            return created >= new Date(todayStart.getTime() - 29 * DAY_MS);
          default:
            return true;
        }
      });
    }

    return result;
  }, [leads, search, subject, dateRange]);

  // ---- Sorting ----
  const sortedLeads = useMemo(() => {
    const arr = [...filteredLeads];
    switch (sortBy) {
      case "oldest":
        return arr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case "id-asc":
        return arr.sort((a, b) => a.id - b.id);
      case "id-desc":
        return arr.sort((a, b) => b.id - a.id);
      case "name-asc":
        return arr.sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
      case "name-desc":
        return arr.sort((a, b) => (b.full_name || "").localeCompare(a.full_name || ""));
      case "newest":
      default:
        return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }, [filteredLeads, sortBy]);

  const totalPages = Math.ceil(sortedLeads.length / rowsPerPage);
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, subject, dateRange, sortBy, rowsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  // ---- KPIs (all derived from real created_at / id data) ----
  const kpis = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const yStart = new Date(todayStart.getTime() - DAY_MS);
    const weekStart = new Date(todayStart.getTime() - 6 * DAY_MS);
    const prevWeekStart = new Date(todayStart.getTime() - 13 * DAY_MS);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const inRange = (d, from, to) => d >= from && (!to || d < to);

    let today = 0, yesterday = 0, week = 0, prevWeek = 0, month = 0, prevMonth = 0;
    leads.forEach((lead) => {
      if (!lead.created_at) return;
      const d = new Date(lead.created_at);
      if (inRange(d, todayStart)) today++;
      if (inRange(d, yStart, todayStart)) yesterday++;
      if (inRange(d, weekStart)) week++;
      if (inRange(d, prevWeekStart, weekStart)) prevWeek++;
      if (inRange(d, monthStart)) month++;
      if (inRange(d, prevMonthStart, monthStart)) prevMonth++;
    });

    return {
      total: leads.length,
      today,
      todayTrend: trendPct(today, yesterday),
      week,
      weekTrend: trendPct(week, prevWeek),
      month,
      monthTrend: trendPct(month, prevMonth),
    };
  }, [leads]);

  const subjectOptions = useMemo(
    () => [...new Set(leads.map((l) => l.subject).filter(Boolean))].sort(),
    [leads]
  );

  const hasActiveFilters = search !== "" || dateRange !== "all" || subject !== "all";

  const clearFilters = () => {
    setSearch("");
    setDateRange("all");
    setSubject("all");
  };

  const handleExport = async () => {
    if (filteredLeads.length === 0) {
      toast("No leads to export for the current filters", "info");
      return;
    }
    setExporting(true);
    try {
      exportLeadsToExcel(filteredLeads);
      toast(`Exported ${filteredLeads.length} lead${filteredLeads.length === 1 ? "" : "s"} to Excel`, "success");
    } catch (err) {
      console.error(err);
      toast("Export failed. Please try again.", "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout breadcrumb={["Dashboard", "Contact Leads"]} onLogout={logout}>
      <div className="max-w-[1400px] mx-auto">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-secondary dark:text-white">
              Contact Leads
            </h1>
            <p className="text-sm text-secondary/50 dark:text-white/50 mt-1">
              Manage and respond to website enquiries
            </p>
          </div>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark">
            <ErrorState onRetry={loadLeads} />
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {loading ? (
                <>
                  <KpiCardSkeleton />
                  <KpiCardSkeleton />
                  <KpiCardSkeleton />
                  <KpiCardSkeleton />
                </>
              ) : (
                <>
                  <KpiCard icon={Users} label="Total Leads" value={kpis.total} subtitle="all time" />
                  <KpiCard
                    icon={Inbox}
                    label="Today's Leads"
                    value={kpis.today}
                    trend={kpis.todayTrend}
                    subtitle="vs yesterday"
                  />
                  <KpiCard
                    icon={CalendarDays}
                    label="This Week"
                    value={kpis.week}
                    trend={kpis.weekTrend}
                    subtitle="vs last week"
                  />
                  <KpiCard
                    icon={CalendarRange}
                    label="This Month"
                    value={kpis.month}
                    trend={kpis.monthTrend}
                    subtitle="vs last month"
                  />
                </>
              )}
            </div>

            {/* Analytics */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-6">
              {loading ? (
                <>
                  <ChartSkeleton />
                  <ChartSkeleton />
                </>
              ) : (
                <>
                  <LeadsOverTimeChart leads={leads} />
                  <SubjectDistributionChart leads={leads} />
                </>
              )}
            </div>

            {/* Filters */}
            <div className="mb-4">
              <LeadFilters
                search={search}
                onSearchChange={setSearch}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                subject={subject}
                onSubjectChange={setSubject}
                subjectOptions={subjectOptions}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                onExportExcel={handleExport}
                exporting={exporting}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Table */}
            {loading ? (
              <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </div>
            ) : sortedLeads.length === 0 ? (
              <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark">
                <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
              </div>
            ) : (
              <>
                <LeadsTable leads={paginatedLeads} onView={setSelectedLead} />
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedLeads.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setRowsPerPage}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <LeadDetailsDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </AdminLayout>
  );
}

export default function UserInfo() {
  return (
    <ToastProvider>
      <UserInfoContent />
    </ToastProvider>
  );
}
