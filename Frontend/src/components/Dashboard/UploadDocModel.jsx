import { useState } from "react";
import { X, Upload, FileText, Image as ImageIcon } from "lucide-react";
import { uploadDocument } from "../../api/devvault.api";

const categories = [
    "Identity",
    "Education",
    "Finance",
    "Health",
    "Travel",
    "Other",
];

export default function UploadDocumentModal({ isOpen, onClose,onSuccess }) {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Identity");

    if (!isOpen) return null;

    const handleFile = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);

        if (!name) {
            setName(selected.name.split(".")[0]);
        }
    };

    const handleClose = () => {
        setFile(null);
        setName("");
        setCategory("Identity");
        onClose();
    };
    const handleUpload = async () => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("name", name);
        formData.append("category", category);

        try {
            const data = await uploadDocument(formData);
            onSuccess(data.document);
            handleClose();
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-[#131826] border border-white/10 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <h2 className="text-xl font-semibold text-white">
                        Upload Document
                    </h2>

                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center"
                    >
                        <X className="w-5 h-5 text-gray-300" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">

                    {/* File Picker */}
                    <label className="block">
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/40 transition cursor-pointer">
                            {file ? (
                                <div className="space-y-3">
                                    {file.type.includes("pdf") ? (
                                        <FileText className="w-12 h-12 text-blue-400 mx-auto" />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-emerald-400 mx-auto" />
                                    )}

                                    <p className="text-white font-medium">{file.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                    <p className="text-white font-medium">
                                        Click to choose a file
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, JPG or PNG
                                    </p>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFile}
                            className="hidden"
                        />
                    </label>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">
                            Document Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Aadhar Card"
                            className="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl bg-[#0B0F19] border border-white/10 px-4 py-3 text-white focus:outline-none"
                        >
                            {categories.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-white/5 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={!file || !name}
                        className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-black font-medium flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}