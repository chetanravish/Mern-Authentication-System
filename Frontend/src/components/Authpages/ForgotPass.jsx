import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/devvault.api";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function ForgotPassword({ onBack, onVerify }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await forgotPassword(email);

      // Save email for next screen
      sessionStorage.setItem("resetEmail", email);

      onVerify(email);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to send reset OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight text-white">
            Dastavej
          </span>
        </Link>

        <div className="bg-[#131826] border border-white/5 rounded-2xl shadow-2xl shadow-black/40 px-8 py-10">
          <h1 className="text-center text-xl font-semibold text-white">
            Forgot Password
          </h1>

          <p className="text-center text-sm text-gray-400 mt-1">
            Enter your registered email and we'll send you a verification OTP.
          </p>

          {error && (
            <p className="text-center text-sm text-red-400 mt-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                Registered Email
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B0F19] border border-white/10 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 disabled:opacity-60 text-[#0B0F19] text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              {loading ? (
                "Sending OTP..."
              ) : (
                <>
                  Send OTP <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onBack}
              className="text-blue-400 font-medium hover:text-blue-300"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}