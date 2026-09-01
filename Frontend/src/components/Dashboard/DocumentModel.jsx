import { X, FileText, Image, Download } from "lucide-react";

export default function DocumentModal({ document, onClose }) {
  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-3xl bg-[#131826] rounded-3xl border border-white/10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
              {document.type === "pdf" ? (
                <FileText className="w-6 h-6 text-blue-400" />
              ) : (
                <Image className="w-6 h-6 text-emerald-400" />
              )}
            </div>

            <div>
              <h2 className="text-white font-semibold">{document.name}</h2>
              <p className="text-sm text-gray-400">
                {document.category} • {document.size}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-6">
          <div className="h-96 rounded-2xl bg-[#0B0F19] border border-dashed border-white/10 flex flex-col items-center justify-center">
            {document.type === "pdf" ? (
              <FileText className="w-20 h-20 text-blue-400 mb-4" />
            ) : (
              <Image className="w-20 h-20 text-emerald-400 mb-4" />
            )}

            <p className="text-white font-medium">{document.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              Preview will appear here after S3 integration
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5"
            >
              Close
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-black font-medium">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}