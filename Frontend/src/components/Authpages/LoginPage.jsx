import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/devvault.api.js";
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context.js";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { setCurrentAccessToken } from "../../context/TokenStore";


export default function Login({ onRegister, onForgotPassword }={}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useContext(AuthContext);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form.email, form.password);
       setCurrentAccessToken(data.accessToken);
      setAccessToken(data.accessToken);
      navigate("/dashboard", {
        state: {
          email: form.email,
        },
      })

    } catch (error) {
      setError(
        error.response?.data?.message || "Login Failed! Please try again"
      );
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight text-white">DevVault</span>
        </Link>

        <div className="bg-[#131826] border border-white/5 rounded-2xl shadow-2xl shadow-black/40 px-8 py-10">
          <h1 className="text-center text-xl font-semibold text-white">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-400 mt-1">
            Dastavej — Secure Family Document Vault
          </p>

          {error && (
            <p className="text-center text-sm text-red-400 mt-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">


            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-sm text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent
                             placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-sm text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent
                             placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-1">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 disabled:opacity-60
                         text-[#0B0F19] text-sm font-medium py-2.5 rounded-xl transition-colors mt-2"
            >
              {loading ? "Creating account..." : (
                <>Log In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {/* Already have an account?{" "} */}
            <button
              type="button"
              onClick={onRegister}
              className="text-blue-400 font-medium hover:text-blue-300"
            >
              Create new account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}