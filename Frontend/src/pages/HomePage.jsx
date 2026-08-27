import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  ShieldCheck,
  Smartphone,
  KeyRound,
  MailCheck,
  LogOut,
  Menu,
  GitBranch,
  X,
  ArrowRight,
} from "lucide-react";

// const FEATURES = [
//   {
//     icon: MailCheck,
//     title: "Email verification",
//     desc: "New accounts confirm ownership with a time-limited OTP sent straight to their inbox.",
//   },
//   {
//     icon: KeyRound,
//     title: "Short-lived access tokens",
//     desc: "15-minute JWT access tokens paired with a 7-day refresh token, rotated automatically.",
//   },
//   {
//     icon: Smartphone,
//     title: "Session tracking per device",
//     desc: "Every login is recorded with IP and device info, so you always know what's signed in.",
//   },
//   {
//     icon: LogOut,
//     title: "Remote logout, anywhere",
//     desc: "End one session or every session at once, without touching the device itself.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Bcrypt-hashed passwords",
//     desc: "Passwords are salted and hashed before they ever touch the database.",
//   },
//   {
//     icon: Lock,
//     title: "HttpOnly refresh cookies",
//     desc: "Refresh tokens never reach client-side JavaScript, closing off a common attack path.",
//   },
// ];

// const STEPS = [
//   { n: "01", title: "Sign up", desc: "Create an account with an email and password." },
//   { n: "02", title: "Verify", desc: "Confirm your email with a 6-digit code we send you." },
//   { n: "03", title: "Log in", desc: "Get a short-lived access token and a secure session." },
//   { n: "04", title: "Stay in control", desc: "Review active sessions, sign out anywhere, anytime." },
// ];      for later use





export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-gray-900">DevVault</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <Link to="#how-it-works" className="hover:text-gray-900">How it works</Link>
            <Link
              to="https://github.com/chetanravish/Mern-Authentication-System"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 flex items-center gap-1"
            >
              <GitBranch className="w-4 h-4" /> Github
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition-colors"
            >
              Sign up
            </Link>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 text-sm">
            <Link to="#features" className="block text-gray-600">Features</Link>
            <Link to="#how-it-works" className="block text-gray-600">How it works</Link>
            <Link to="https://github.com/chetanravish/Mern-Authentication-System" className="block text-gray-600">Github</Link>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 text-center text-sm font-medium border border-gray-200 rounded-xl py-2">
                Log in
              </Link>
              <Link to="/register" className="flex-1 text-center text-sm font-medium text-white bg-blue-500 rounded-xl py-2">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-5">
            Open-source auth for MERN apps
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-gray-900">
            Authentication that knows who's actually logged in.
          </h1>
          <p className="mt-5 text-gray-500 text-base leading-relaxed max-w-md">
            DevVault handles sign-up, email verification, and token refresh —
            and gives every user visibility into every device holding a
            session on their account.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="/register"
              className="flex items-center gap-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl transition-colors"
            >
              Create an account <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-5 py-3 rounded-xl border border-gray-200"
            >
              Log in
            </a>
          </div>
        </div>

        {/* Signature element: mock session list */}
        <div className="bg-white border border-gray-100 shadow-xl shadow-blue-50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-900">Active sessions</p>
            <span className="text-xs text-blue-500 font-medium">3 devices</span>
          </div>
          <div className="space-y-3">
            {[
              { device: "MacBook Pro · Chrome", loc: "Mumbai, IN", active: true },
              { device: "iPhone 14 · Safari", loc: "Mumbai, IN", active: true },
              { device: "Windows PC · Edge", loc: "Delhi, IN", active: false },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-gray-800">{s.device}</p>
                  <p className="text-xs text-gray-400">{s.loc}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    s.active ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {s.active ? "Active" : "Signed out"}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-xs font-medium text-red-500 border border-red-100 rounded-xl py-2 hover:bg-red-50">
            Log out of all devices
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className= "bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Built for the parts most tutorials skip
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg">
            Every piece here maps to something that actually goes wrong in
            production auth systems.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">How it works</h2>
        <p className="text-gray-500 mb-12 max-w-lg">
          Four steps from a new visitor to a verified, trackable session.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.n}>
              <p className="text-xs font-semibold text-blue-400 mb-2">{s.n}</p>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4 text-blue-400" />
            DevVault — a MERN authentication starter
          </div>
          <Link
            to="https://github.com/chetanravish/Mern-Authentication-System"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <GitBranch className="w-4 h-4" /> View source
          </Link>
        </div>
      </footer>
    </div>
  );
}