import { useState } from "react";
import { resetPassword } from "../../api/devvault.api";
import { Lock, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPassword({ onDone }) {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {
            const token = sessionStorage.getItem("resetToken");

            await resetPassword(password, token);

            sessionStorage.removeItem("resetToken");
            sessionStorage.removeItem("resetEmail");

            setSuccess(true);

            setTimeout(() => {
                onDone();
            }, 2500);

        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
                <div className="bg-[#131826] border border-white/5 rounded-2xl p-8 max-w-sm w-full text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold text-white">
                        Password Updated!
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Your password has been changed successfully.
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-[#131826] rounded-2xl p-8">
                <h1 className="text-xl font-semibold text-center">
                    Create New Password
                </h1>

                <p className="text-center text-sm text-gray-400 mt-2">
                    Your new password must be different from the old one.
                </p>

                {error && (
                    <p className="text-red-400 text-sm text-center mt-3">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {[["New Password", password, setPassword], ["Confirm Password", confirm, setConfirm]].map(([label, val, setter]) => (
                        <div key={label}>
                            <label className="text-xs text-gray-400">{label}</label>

                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                <input
                                    type={show ? "text" : "password"}
                                    value={val}
                                    onChange={(e) => setter(e.target.value)}
                                    className="w-full pl-9 pr-9 py-3 rounded-xl bg-[#0B0F19] border border-white/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="absolute right-3 top-3.5"
                                >
                                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        disabled={loading}
                        className="w-full bg-blue-500 py-3 rounded-xl font-medium text-black flex justify-center items-center gap-2"
                    >
                        {loading ? "Updating..." : <>
                            Reset Password <ArrowRight className="w-4 h-4" />
                        </>}
                    </button>
                </form>
            </div>
        </div>
    );
}