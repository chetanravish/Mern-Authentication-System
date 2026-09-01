import { ShieldCheck, Upload } from "lucide-react";

export default function WelcomeCard({ user, onUpload }) {
  return (
    <div className="w-full rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-blue-100 text-sm mb-2">
            Welcome back 👋
          </p>

          <h1 className="text-3xl font-bold">
            Hello, {user?.username || "User"}
          </h1>

          <p className="mt-3 max-w-lg text-blue-100 leading-relaxed">
            Your important documents are securely stored and available from
            any device. Search, upload and manage everything in one place.
          </p>

          <button
            onClick={onUpload}
            className="mt-6 flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/10 items-center justify-center backdrop-blur-sm">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
}