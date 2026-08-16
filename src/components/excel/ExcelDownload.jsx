import XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import { FaFileExcel } from "react-icons/fa";

// Same column mapping, styling and filename convention as before —
// extracted so it can be triggered from the new export dropdown too.
export function exportLeadsToExcel(data) {
    const excelData = [...data]
        .sort((a, b) => a.id - b.id) // Ascending ID
        .map((item) => ({
            ID: item.id,
            Name: item.full_name,
            Phone: item.phone,
            Email: item.email,
            Subject: item.subject,
            Message: item.message,
            Date: new Date(
                new Date(item.created_at).getTime() +
                5.5 * 60 * 60 * 1000
            ).toLocaleString("en-IN"),
        }));
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Column Widths
    ws["!cols"] = [
        { wch: 10 },
        { wch: 25 },
        { wch: 18 },
        { wch: 30 },
        { wch: 25 },
        { wch: 50 },
        { wch: 25 },
    ];

    const range = XLSX.utils.decode_range(ws["!ref"]);

    // BLUE HEADER
    for (let C = range.s.c; C <= range.e.c; C++) {
        const cell = XLSX.utils.encode_cell({
            r: 0,
            c: C,
        });

        if (ws[cell]) {
            ws[cell].s = {
                font: {
                    bold: true,
                    color: { rgb: "FFFFFF" },
                    sz: 12,
                },
                fill: {
                    fgColor: { rgb: "2563EB" }, // Blue
                },
                alignment: {
                    horizontal: "center",
                    vertical: "center",
                },
            };
        }
    }

    // ORANGE ROWS
    for (let R = 1; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {
            const cell = XLSX.utils.encode_cell({
                r: R,
                c: C,
            });

            if (ws[cell]) {
                ws[cell].s = {
                    fill: {
                        fgColor: {
                            rgb:
                                R % 2 === 0
                                    ? "FFEDD5" // light orange
                                    : "FED7AA", // darker orange
                        },
                    },
                    border: {
                        top: {
                            style: "thin",
                            color: { rgb: "D97706" },
                        },
                        bottom: {
                            style: "thin",
                            color: { rgb: "D97706" },
                        },
                        left: {
                            style: "thin",
                            color: { rgb: "D97706" },
                        },
                        right: {
                            style: "thin",
                            color: { rgb: "D97706" },
                        },
                    },
                };
            }
        }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Contact Leads"
    );

    const excelBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
    });

    const file = new Blob([excelBuffer], {
        type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
        file,
        `Contact_Leads_${new Date()
            .toISOString()
            .slice(0, 10)}.xlsx`
    );
}

export default function ExcelDownload({ data }) {
    return (
        <button
            onClick={() => exportLeadsToExcel(data)}
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
        >
            <FaFileExcel className="text-2xl group-hover:scale-110 transition-transform" />

            <div className="flex flex-col items-start leading-tight">
                <span>Download Excel</span>
                <span className="text-[11px] text-green-100 font-normal">
                    Export All Leads
                </span>
            </div>
        </button>
    );
}
