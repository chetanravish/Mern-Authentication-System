import { FileText, Image, Download, Eye } from "lucide-react";

export default function DocumentCard({ document, onView }) {
  return (
    <div className="bg-[#131826] border border-white/5 rounded-2xl p-4 hover:border-blue-500/20 transition-all">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
          {document.type === "pdf" ? (
            <FileText className="w-6 h-6 text-blue-400" />
          ) : (
            <Image className="w-6 h-6 text-emerald-400" />
          )}
        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
          {document.category}
        </span>
      </div>

      <h3 className="mt-4 text-white font-medium truncate">
        {document.name}
      </h3>
      {document.member ? (
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium">
          👤 {document.member.name} ({document.member.relation})
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 text-xs font-medium">
          👤 Unassigned
        </div>
      )}

      <div className="mt-2 text-sm text-gray-400 space-y-1">
        <p>{document.size}</p>
        <p>{document.uploadedAt}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-blue-500 text-black font-medium hover:bg-blue-400"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
          <Download className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
}