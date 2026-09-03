import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModel({
  isOpen,
  name,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md bg-[#131826] border border-white/10 rounded-2xl p-6">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <Trash2 className="w-7 h-7 text-red-400" />
        </div>

        <h2 className="text-xl font-semibold text-white">
          Delete Family Member
        </h2>

        <p className="text-gray-400 mt-2">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">{name}</span>?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}