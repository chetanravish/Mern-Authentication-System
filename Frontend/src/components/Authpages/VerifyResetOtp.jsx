import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { verifyResetOtp, resendOtp } from "../../api/devvault.api";

export default function VerifyResetOtp({ email, onNext, onBack }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [seconds, setSeconds] = useState(60);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (seconds === 0) return;
        const timer = setInterval(() => setSeconds(s => s - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    const handleOtp = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 5)
            document.getElementById(`otp-${index + 1}`).focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key !== "Backspace") return;

        const updated = [...otp];

        // If current box has a digit, clear it
        if (updated[index]) {
            updated[index] = "";
            setOtp(updated);
            return;
        }

        // If already empty, move to previous box and clear it
        if (index > 0) {
            updated[index - 1] = "";
            setOtp(updated);

            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const code = otp.join("");
        if (code.length !== 6) {
            return setError("Enter all 6 digits");
        }

        setLoading(true);
        setError("");

        try {
            const data = await verifyResetOtp(code, email);

            sessionStorage.setItem("resetToken", data.resetToken);

            onNext();
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        await resendOtp(email);
        setSeconds(60);
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#131826] rounded-2xl p-8">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Mail className="w-7 h-7 text-blue-400" />
                    </div>
                </div>

                <h1 className="text-xl font-semibold text-center">
                    Verify Reset OTP
                </h1>

                <p className="text-center text-sm text-gray-400 mt-2">
                    {email}
                </p>

                {error && (
                    <p className="text-red-400 text-sm text-center mt-3">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex gap-2 justify-between">
                        {otp.map((d, i) => (
                            <input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={(e) => handleOtp(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-12 h-14 rounded-xl bg-[#0B0F19] border border-white/10 text-center text-xl"
                            />
                        ))}
                    </div>

                    <div className="text-center mt-6 text-sm">
                        {seconds > 0 ? (
                            <span className="text-gray-400">Resend in {seconds}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-blue-400"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="w-full mt-6 bg-blue-500 py-3 rounded-xl font-medium text-black flex justify-center items-center gap-2"
                    >
                        {loading ? "Verifying..." : <>
                            Verify OTP <ArrowRight className="w-4 h-4" />
                        </>}
                    </button>
                </form>

                <button
                    onClick={onBack}
                    className="w-full mt-4 text-blue-400 text-sm"
                >
                    Back
                </button>
            </div>
        </div>
    );
}