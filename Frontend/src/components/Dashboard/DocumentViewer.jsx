import { useEffect, useState } from "react";
import {
    X,
    Trash2,
    FileText,
    Calendar,
    HardDrive,
    Pencil,
    Save,
    Download
} from "lucide-react";
import {
    viewDocument,
    deleteDocument,
    updateDocument,
    downloadDocument
} from "../../api/devvault.api";
import DeleteConfirmModel from "./DeleteConfirmModel";

const categories = [
    "Identity",
    "Education",
    "Finance",
    "Health",
    "Travel",
    "Other",
];

export default function DocumentViewer({
    document,
    onClose,
    onDelete,
    onUpdate,
}) {
    const [fileUrl, setFileUrl] = useState("");
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [showDelete, setShowDelete] = useState(false);

    // Load signed S3 URL
    useEffect(() => {
        const loadDocument = async () => {
            if (!document) return;

            try {
                const url = await viewDocument(document._id);
                setFileUrl(url);
            } catch (err) {
                console.error(err);
            }
        };

        loadDocument();

        return () => setFileUrl("");
    }, [document]);

    // Fill edit form
    useEffect(() => {
        if (!document) return;

        setName(document.name);
        setCategory(document.category);
        setEditing(false);
    }, [document]);

    if (!document) return null;

    const handleDelete = async () => {
        await deleteDocument(document._id);
        onDelete(document._id);
        setShowDelete(false);
    };

    const handleDownload = async () => {
        const url = await downloadDocument(document._id);

        const link = window.document.createElement("a");
        link.href = url;
        link.download = document.fileName;
        window.document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleSave = async () => {
        const data = await updateDocument(document._id, {
            name,
            category,
        });

        onUpdate(data.document);
        setEditing(false);
    };

    const size =
        document.size > 1024 * 1024
            ? `${(document.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(document.size / 1024).toFixed(0)} KB`;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="w-full max-w-6xl h-[90vh] bg-[#111827] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 bg-[#131826]">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>

                            {editing ? (
                                <div className="flex-1 space-y-2">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                                    />

                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white outline-none"
                                    >
                                        {categories.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {document.name}
                                    </h2>

                                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <HardDrive className="w-3.5 h-3.5" />
                                            {size}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(document.createdAt).toLocaleDateString()}
                                        </span>

                                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                                            {document.category}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {editing ? (
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </button>

                            )}
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                            <button
                                onClick={() => setShowDelete(true)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-white/10 transition"
                            >
                                <X className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Viewer */}
                <div className="flex-1 bg-[#0B0F19] flex items-center justify-center">
                    {!fileUrl ? (
                        <p className="text-gray-400">Loading document...</p>
                    ) : document.mimeType === "application/pdf" ? (
                        <iframe
                            src={fileUrl}
                            title={document.name}
                            className="w-full h-full"
                        />
                    ) : (
                        <img
                            src={fileUrl}
                            alt={document.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    )}
                </div>
            </div>

            <DeleteConfirmModel
                isOpen={showDelete}
                name={document.name}
                onCancel={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}