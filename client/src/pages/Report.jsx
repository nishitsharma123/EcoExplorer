import React, { useState } from "react";
import { FileText, Download, AlertCircle } from "lucide-react";

const Report = () => {
  // 🔹 Demo Report Data (Replace with API later)
  const [reports] = useState([
    {
      _id: "1",
      title: "Plastic Waste Awareness Campaign",
      category: "Pollution",
      createdAt: "2026-02-01",
      submittedBy: "Nishit Sharma",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      _id: "2",
      title: "Tree Plantation Drive Report",
      category: "Reforestation",
      createdAt: "2026-01-25",
      submittedBy: "Eco Club Team",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      _id: "3",
      title: "River Cleanliness Survey",
      category: "Water Conservation",
      createdAt: "2026-01-20",
      submittedBy: "Green Volunteers",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-emerald-800 mb-2">
          Environmental Reports 📊
        </h1>
        <p className="text-gray-600">
          View and download environmental activity reports.
        </p>
      </div>

      {/* Reports Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8">

        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <AlertCircle size={50} className="mb-4" />
            <p>No reports available yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-gray-700">Title</th>
                  <th className="py-3 px-4 text-gray-700">Category</th>
                  <th className="py-3 px-4 text-gray-700">Submitted By</th>
                  <th className="py-3 px-4 text-gray-700">Date</th>
                  <th className="py-3 px-4 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-b hover:bg-emerald-50 transition"
                  >
                    <td className="py-4 px-4 flex items-center gap-2">
                      <FileText size={18} className="text-emerald-600" />
                      {report.title}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {report.category}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {report.submittedBy}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDownload(report.fileUrl)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
