import { Search, Bell } from "lucide-react";

export default function Topbar({ search, setSearch, user }) {
  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />

        <input
          type="text"
          placeholder="Search your documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#131826] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button className="w-11 h-11 rounded-xl bg-[#131826] border border-white/5 flex items-center justify-center hover:bg-white/5 transition">
          <Bell className="w-5 h-5 text-gray-300" />
        </button>

        <div className="flex items-center gap-3 bg-[#131826] border border-white/5 rounded-2xl px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-white">
              {user?.username || "User"}
            </p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}