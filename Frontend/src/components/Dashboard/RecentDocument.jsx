import { MoreVertical, FileText, ImageIcon } from "lucide-react";

export default function RecentDocuments({ documents, search, onView }) {
  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes) => {
    if (bytes > 1024 * 1024)
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="bg-[#131826] border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white">
          Recent Documents
        </h2>
      </div>

      {filtered.map((doc) => (
        <div
          key={doc._id}
          className="flex items-center justify-between px-6 py-4 hover:bg-white/5 border-b border-white/5 last:border-0"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-14 rounded-lg bg-white flex items-center justify-center">
              {doc.mimeType === "application/pdf" ? (
                <span className="text-red-600 text-xs font-bold">PDF</span>
              ) : (
                <span className="text-green-600 text-xs font-bold">PNG</span>
              )}
            </div>

            <div>
              <h3 className="text-white font-semibold">{doc.name}</h3>

              <p className="text-sm text-gray-400">
                {doc.member?.relation || "Unassigned"} • {formatSize(doc.size)} •{" "}
                {doc.mimeType.includes("pdf") ? "PDF" : "PNG"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-sm text-gray-400">
              {new Date(doc.createdAt).toLocaleDateString()}
            </p>

            <button onClick={() => onView(doc)}>
              <MoreVertical className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}