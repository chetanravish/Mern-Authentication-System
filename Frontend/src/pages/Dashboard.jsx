import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { logOut } from "../api/devvault.api";
import {
  FileText, Search, Upload, Bell, Users, Lock, Settings, LogOut,
  Eye, EyeOff, Download, Plus, FolderOpen, ScanLine,
} from "lucide-react";

// ---- Mock data, shaped like the API responses will be ----

const PRIMARY = { id: "self", name: "You", relation: "Primary account" };

const MOCK_FAMILY = [
  { id: "self", name: "You", relation: "Primary account", docCount: 12 },
  { id: "f1", name: "Dad", relation: "father", docCount: 8 },
  { id: "f2", name: "Mom", relation: "mother", docCount: 5 },
  { id: "f3", name: "Riya", relation: "sister", docCount: 3 },
];

const MOCK_DOCS = [
  { id: 1, title: "Aadhar Card.pdf", category: "identity", updatedAt: "2 days ago" },
  { id: 2, title: "LIC Policy 2024.pdf", category: "insurance", updatedAt: "1 week ago" },
  { id: 3, title: "Marksheet 12th.jpg", category: "education", updatedAt: "3 weeks ago" },
  { id: 4, title: "Bank Statement Jan.pdf", category: "financial", updatedAt: "1 month ago" },
];

const CATEGORIES = ["All", "Identity", "Financial", "Medical", "Education", "Insurance", "Property"];

const MOCK_NOTES = [
  { id: 1, label: "Instagram", value: "insta_pass_123" },
  { id: 2, label: "Net Banking PIN", value: "482913" },
  { id: 3, label: "Email Recovery Code", value: "xyz-9981-code" },
];

const NAV_ITEMS = [
  { key: "documents", label: "My Documents", icon: FileText },
  { key: "family", label: "Family Members", icon: Users },
  { key: "notes", label: "Secure Notes", icon: Lock },
  { key: "settings", label: "Settings", icon: Settings },
];

function initials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function Avatar({ name, size = 36, active = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-medium ${
        active
          ? "bg-blue-500/15 text-blue-400 border border-blue-500/40"
          : "bg-white/5 text-gray-300 border border-white/10"
      }`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials(name)}
    </div>
  );
}



  

function Sidebar({ activeNav, setActiveNav, activeProfile, setActiveProfile,handleLogout
  
}) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-[#0B0F19]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
          <Lock className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
        </div>
        <span className="font-semibold tracking-tight text-white">DevVault</span>
      </div>

      {/* Primary profile */}
      <div className="flex items-center gap-3 border-y border-white/5 px-5 py-4">
        <Avatar name={PRIMARY.name} size={40} active />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-gray-100">{PRIMARY.name}</div>
          <div className="text-xs text-gray-500">Primary account</div>
        </div>
      </div>

      {/* Family profile switcher */}
      <div className="border-b border-white/5 px-5 py-4">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Switch profile
        </div>
        <div className="flex flex-wrap gap-2">
          {MOCK_FAMILY.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProfile(p)}
              title={p.name}
              className={`rounded-full ring-2 transition ${
                activeProfile.id === p.id ? "ring-blue-500" : "ring-transparent"
              }`}
            >
              <Avatar name={p.name} size={34} />
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveNav(key)}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
              activeNav === key
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="border-t border-white/5 px-3 py-4">
        <button 
        onClick={handleLogout}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-white/5 hover:text-gray-300">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function Topbar({ activeProfile }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-white/5 bg-[#0B0F19] px-6">
      <div className="relative max-w-md flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search your documents..."
          className="w-full rounded-xl border border-white/10 bg-[#131826] py-2.5 pl-9 pr-3 text-sm text-gray-100 outline-none
                     focus:ring-2 focus:ring-blue-400/50 focus:border-transparent placeholder:text-gray-600"
        />
      </div>

      <button className="flex items-center gap-1.5 rounded-xl bg-blue-500 hover:bg-blue-700 px-3.5 py-2.5 text-sm font-medium text-[#0B0F19] transition-colors">
        <Upload size={15} /> Upload
      </button>

      <button className="relative rounded-xl border border-white/10 p-2.5 text-gray-400 hover:bg-white/5">
        <Bell size={17} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
      </button>

      <div className="ml-1">
        <Avatar name={activeProfile.name} size={36} active />
      </div>
    </header>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-[#131826] shadow-2xl shadow-black/40 ${className}`}>
      {children}
    </div>
  );
}

function DocumentsView({ activeProfile }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: Upload, title: "Upload document", sub: "PDF, image, or Word file" },
          { icon: ScanLine, title: "Scan document", sub: "Use your camera" },
          { icon: FolderOpen, title: "New category", sub: "Organize your files" },
        ].map(({ icon: Icon, title, sub }) => (
          <Card key={title} className="p-4">
            <button className="flex w-full items-center gap-3 text-left">
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2 text-blue-400">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-100">{title}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition border ${
              activeCategory === c
                ? "bg-blue-500 text-[#0B0F19] border-blue-500"
                : "bg-transparent text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Recent documents */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-100">
          Recent documents · {activeProfile.name}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MOCK_DOCS.map((doc) => (
            <Card key={doc.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-lg bg-white/5 border border-white/10 p-2 text-gray-400">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-100">{doc.title}</div>
                  <div className="text-xs text-gray-500 capitalize">{doc.category} · {doc.updatedAt}</div>
                </div>
              </div>
              <button className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-gray-200">
                <Download size={16} />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function FamilyView({ activeProfile, setActiveProfile }) {
  const atLimit = MOCK_FAMILY.length >= 10;
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-100">Family & friends ({MOCK_FAMILY.length}/10)</h3>
        <button
          disabled={atLimit}
          className="flex items-center gap-1.5 rounded-xl bg-blue-500 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed px-3.5 py-2.5 text-sm font-medium text-[#0B0F19] transition-colors"
        >
          <Plus size={15} /> Add member
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MOCK_FAMILY.map((p) => (
          <Card
            key={p.id}
            className={`flex items-center justify-between gap-3 p-4 ${
              activeProfile.id === p.id ? "border-blue-500/40" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar name={p.name} size={40} active={activeProfile.id === p.id} />
              <div>
                <div className="text-sm font-medium text-gray-100">{p.name}</div>
                <div className="text-xs capitalize text-gray-500">{p.relation} · {p.docCount} docs</div>
              </div>
            </div>
            <button
              onClick={() => setActiveProfile(p)}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10"
            >
              View
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SecureNotesView() {
  const [visible, setVisible] = useState({});
  const toggle = (id) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-100">Secure notes</h3>
        <button className="flex items-center gap-1.5 rounded-xl bg-blue-500 hover:bg-blue-700 px-3.5 py-2.5 text-sm font-medium text-[#0B0F19] transition-colors">
          <Plus size={15} /> Add note
        </button>
      </div>
      <Card>
        {MOCK_NOTES.map((note, i) => (
          <div
            key={note.id}
            className={`flex items-center justify-between px-4 py-3.5 ${
              i !== MOCK_NOTES.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Lock size={14} className="shrink-0 text-gray-500" />
              <span className="truncate text-sm text-gray-100">{note.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-gray-400">
                {visible[note.id] ? note.value : "•".repeat(Math.min(note.value.length, 10))}
              </span>
              <button
                onClick={() => toggle(note.id)}
                className="text-gray-500 hover:text-gray-200"
              >
                {visible[note.id] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        ))}
      </Card>
      <p className="mt-2 text-xs text-gray-600">
        Values are encrypted at rest and decrypted only when you tap the eye icon.
      </p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useContext(AuthContext);

  const [activeNav, setActiveNav] = useState("documents");
  const [activeProfile, setActiveProfile] = useState(PRIMARY);

  const handleLogout = async () => {
    try {
      await logOut();

      // Clear auth state
      setAccessToken(null);
      setUser(null);

      // Go back to landing page
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Logout failed!"
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-gray-100">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        handleLogout={handleLogout}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar activeProfile={activeProfile} />

        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "documents" && (
            <DocumentsView activeProfile={activeProfile} />
          )}

          {activeNav === "family" && (
            <FamilyView
              activeProfile={activeProfile}
              setActiveProfile={setActiveProfile}
            />
          )}

          {activeNav === "notes" && <SecureNotesView />}

          {activeNav === "settings" && (
            <div className="text-sm text-gray-500">
              Settings — coming soon.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
