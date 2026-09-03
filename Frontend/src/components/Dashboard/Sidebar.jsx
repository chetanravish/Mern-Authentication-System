import {
  FileText,
  Users,
  NotebookPen,
  FileCog,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

const menuItems = [
  { id: "documents", label: "Documents", icon: FileText },
  { id: "family", label: "Family", icon: Users },
  { id: "notes", label: "Secure Notes", icon: NotebookPen },
  { id: "tools", label: "PDF Tools", icon: FileCog },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  user,
  activeTab,
  setActiveTab,
  onLogout,
}) {
  return (
    <aside className="w-64 min-h-screen bg-[#131826] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>

          <div>
            <h1 className="text-white font-semibold">Dastavej</h1>
            <p className="text-xs text-gray-500">Personal Vault</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-sm font-medium text-white">
              {user?.username || "User"}
            </h2>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}