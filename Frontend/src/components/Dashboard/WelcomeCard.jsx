import { Shield } from "lucide-react";

export default function WelcomeCard({ user }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 p-8">
      {/* Background wave */}
      <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-40 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex items-center justify-between">
        {/* Left */}
        <div className="max-w-xl">
          <p className="text-blue-100 text-lg mb-2">
            Welcome back, {user?.username || "User"} 👋
          </p>

          <h1 className="text-5xl font-bold text-white mb-4">
            Your secure family vault
          </h1>

          <p className="text-blue-100 text-base leading-7">
            Store, organize and access important family documents securely
            from anywhere. Everything in one protected place.
          </p>
        </div>

        {/* Right Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />

            <div className="relative w-36 h-36 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Shield className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}