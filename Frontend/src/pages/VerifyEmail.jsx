import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function Register() {

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const [email] = useState("chetan74@gmail.com"); // replace with navigate state later
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleOtpChange(value, index) {
  if (!/^\d?$/.test(value)) return;

  const updated = [...otp];
  updated[index] = value;
  setOtp(updated);

  if (value && index < 5) {
    document.getElementById(`otp-${index + 1}`).focus();
  }
}

function handleKeyDown(e, index) {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    document.getElementById(`otp-${index - 1}`).focus();
  }
}

  function handleSubmit(e) {
  e.preventDefault();

  const code = otp.join("");
  console.log(code);

  // verify OTP API here
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
            OTP Verification
          </h1>
          <p className="text-center text-sm text-gray-400 mt-1">
            Please enter the OTP sent to your registered email to complete your verification
          </p>

          {error && (
            <p className="text-center text-sm text-red-400 mt-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6">
  <div className="flex justify-center mb-6">
    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
      <Mail className="w-7 h-7 text-blue-400" />
    </div>
  </div>

  <p className="text-center text-sm text-gray-400">
    We've sent a 6-digit code to
  </p>

  <p className="text-center text-blue-400 font-medium mb-8">
    {email}
  </p>

  <div className="flex justify-between gap-2">
    {otp.map((digit, index) => (
      <input
        key={index}
        id={`otp-${index}`}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(e) => handleOtpChange(e.target.value, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className="w-12 h-14 rounded-xl bg-[#0B0F19] border border-white/10 text-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ))}
  </div>

  <p className="text-center text-sm text-gray-500 mt-6">
    Didn't receive the code?{" "}
    <button
      type="button"
      className="text-blue-400 hover:text-blue-300"
    >
      Resend OTP
    </button>
  </p>

  <button
    type="submit"
    disabled={loading}
    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 disabled:opacity-60 text-[#0B0F19] text-sm font-medium py-3 rounded-xl transition-colors mt-6"
  >
    {loading ? "Verifying..." : (
      <>
        Verify Email <ArrowRight className="w-4 h-4" />
      </>
    )}
  </button>  
    </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {/* Already have an account?{" "} */}
            <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>    
  );
}