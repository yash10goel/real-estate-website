import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../configs/supabase";
import ExcelDownload from "../../components/excel/ExcelDownload";

export default function UserInfo() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedLead, setSelectedLead] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    const navigate = useNavigate();

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        const { data, error } = await supabase
            .from("contact_leads")
            .select("*")
            .order("id", { ascending: false });

        console.log("DATA =>", data);
        console.log("ERROR =>", error);

        setLeads(data || []);
    };

    const logout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/admin");
    };

    const filteredLeads = useMemo(() => {
        return leads.filter(
            (lead) =>
                lead.full_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                lead.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                lead.subject
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                lead.phone?.includes(search)
        );
    }, [leads, search]);
    const sortedLeads = [...filteredLeads].sort((a, b) => {
        return sortOrder === "asc"
            ? a.id - b.id
            : b.id - a.id;
    });

    const totalPages = Math.ceil(
        sortedLeads.length / ITEMS_PER_PAGE
    );

    const paginatedLeads = sortedLeads.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const todayLeads = leads.filter((lead) => {
        const today = new Date().toDateString();
        return (
            new Date(lead.created_at).toDateString() === today
        );
    });

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        Contact Leads
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Manage website enquiries
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition"
                >
                    Logout
                </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-5 mb-8">
                <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">
                        Total Leads
                    </p>
                    <h2 className="text-4xl font-bold text-emerald-400 mt-2">
                        {leads.length}
                    </h2>
                </div>

                <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">
                        Today's Leads
                    </p>
                    <h2 className="text-4xl font-bold text-blue-400 mt-2">
                        {todayLeads.length}
                    </h2>
                </div>

                <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
                    <p className="text-slate-400 text-sm">
                        Search Results
                    </p>
                    <h2 className="text-4xl font-bold text-yellow-400 mt-2">
                        {filteredLeads.length}
                    </h2>
                </div>
            </div>

            {/* Search */}

            <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

                <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-[450px] bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                />

                <div className="flex gap-3">
                    <ExcelDownload data={filteredLeads} />

                    <button
                        onClick={() =>
                            setSortOrder(
                                sortOrder === "asc"
                                    ? "desc"
                                    : "asc"
                            )
                        }
                        className="bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl"
                    >
                        {sortOrder === "asc"
                            ? "↑ ID Ascending"
                            : "↓ ID Descending"}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto bg-[#111827] rounded-2xl border border-slate-700">
                <table className="w-full min-w-[1200px]">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Phone</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Subject</th>
                            <th className="text-left p-4">Message</th>
                            <th className="text-left p-4">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedLeads.map((lead) => (
                            <tr
                                key={lead.id}
                                className="border-b border-slate-800 hover:bg-slate-800/40"
                            >
                                <td className="p-4">{lead.id}</td>
                                <td className="p-4">
                                    {lead.full_name}
                                </td>
                                <td className="p-4">
                                    {lead.phone}
                                </td>
                                <td className="p-4">
                                    {lead.email}
                                </td>
                                <td className="p-4">
                                    {lead.subject}
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() =>
                                            setSelectedLead(lead)
                                        }
                                        className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg text-sm"
                                    >
                                        View
                                    </button>
                                </td>

                                <td className="p-4 text-slate-400">
                                    {new Date(
                                        new Date(lead.created_at).getTime() +
                                        5.5 * 60 * 60 * 1000
                                    ).toLocaleString("en-IN")}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>



                <div className="flex justify-center items-center gap-3 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((p) => p - 1)
                        }
                        className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span className="text-white">
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <button
                        disabled={
                            currentPage === totalPages ||
                            totalPages === 0
                        }
                        onClick={() =>
                            setCurrentPage((p) => p + 1)
                        }
                        className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50">
                    <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-4">
                            Lead Message
                        </h2>

                        <div className="space-y-3">
                            <p>
                                <strong>Name:</strong>{" "}
                                {selectedLead.full_name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedLead.email}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {selectedLead.phone}
                            </p>

                            <p>
                                <strong>Subject:</strong>{" "}
                                {selectedLead.subject}
                            </p>

                            <div className="bg-slate-900 p-4 rounded-xl mt-3">
                                {selectedLead.message}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setSelectedLead(null)
                            }
                            className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}