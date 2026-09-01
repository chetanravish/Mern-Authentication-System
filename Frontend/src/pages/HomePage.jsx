import { Link } from "react-router-dom";
import { Lock, Search, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "../components/Authpages/LoginPage";
import Register from "../components/Authpages/RegisterPage";
import VerifyEmail from "../components/Authpages/VerifyEmail";
import ForgotPassword from "../components/Authpages/ForgotPass";
import VerifyResetOtp from "../components/Authpages/VerifyResetOtp";
import ResetPassword from "../components/Authpages/ResetPassword";

const DOC_STACK = [
  { label: "Aadhar Card", tint: "bg-blue-500/10 border-blue-500/20", rotate: "-rotate-6", offset: "translate-x-0 translate-y-6" },
  { label: "Insurance Policy", tint: "bg-amber-400/10 border-amber-400/20", rotate: "rotate-3", offset: "translate-x-6 translate-y-2" },
  { label: "12th Marksheet", tint: "bg-emerald-400/10 border-emerald-400/20", rotate: "-rotate-1", offset: "translate-x-2 -translate-y-4" },
];

const FEATURES = [
  {
    icon: Search,
    title: "Find it in one search",
    body: "Type a document's name and it's on screen — no more scrolling through years of camera roll photos.",
  },
  {
    icon: Users,
    title: "One account, whole family",
    body: "Add parents, siblings, or anyone you look after. Switch between their documents the way you'd switch a profile.",
  },
  {
    icon: ShieldCheck,
    title: "Passwords, kept honestly",
    body: "Secure notes are encrypted before they're stored — hidden by default, visible only when you choose to reveal them.",
  },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
        <Lock className="w-4 h-4 text-blue-500" strokeWidth={2.5} />
      </div>
      <span className="font-semibold tracking-tight text-white">Dastavej</span>
    </Link>
  );
}

function DocumentStack() {
  return (
    <div className="relative h-72 w-full max-w-xs mx-auto lg:mx-0">
      {DOC_STACK.map((doc, i) => (
        <div
          key={doc.label}
          className={`absolute inset-x-6 top-6 h-48 rounded-2xl border ${doc.tint} ${doc.rotate} ${doc.offset}
                      bg-[#131826] shadow-2xl shadow-black/50 p-5 flex flex-col justify-between`}
          style={{ zIndex: i }}
        >
          <div className="space-y-2">
            <div className="h-2 w-3/5 rounded-full bg-white/10" />
            <div className="h-2 w-2/5 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{doc.label}</span>
            <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}



export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetEmail,setResetEmail] = useState(
    sessionStorage.getItem("resetEmail") || ""
  )
  const [email, setEmail] = useState(
  sessionStorage.getItem("verifyEmail") || ""
);

  const screen = searchParams.get("auth") || "home";

  const setScreen = (value) => {
 
    if (value === "home") {
      setSearchParams({});
    } else {
      setSearchParams({ auth: value });
    }
  };


  if (screen === "login") {
    return (
      <Login
        onRegister={() => setScreen("register")}
        onForgotPassword={() => setScreen("forgot-password")}
      />
    );
  }

  if (screen === "forgot-password"){
    return(
      <ForgotPassword
      onBack={()=>setScreen("login")}
      onVerify={(email) => {
        setResetEmail(email);
        sessionStorage.setItem("resetEmail", email);
        console.log("I am here")
        setScreen("verify-reset");
      }}
      />
    )
  }

  if(screen === "verify-reset"){
    return(
      <VerifyResetOtp
      email={resetEmail}
      onBack={() => setScreen("forgot-password")}
      onNext={() => setScreen("reset-password")}
      />
    )
  }

  if (screen === "reset-password") {
  return (
    <ResetPassword
      onDone={() => setScreen("login")}
    />
  );
}


  if (screen === "register") {
    return (
      <Register
        onLogin={() => setScreen("login")}
        onVerify={(registeredEmail) => {
          setEmail(registeredEmail);
          setScreen("verify");
        }}
      />
    );
  }

  if (screen === "verify") {
    return (
      <VerifyEmail
      email = {email}
        onDone={() => setScreen("login")}
      />
    );
  }
  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-gray-100">
      {/* Nav */}
      <header className="max-w-5xl mx-auto flex items-center justify-between px-6 py-6">
        <Logo />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("login")}
            className="hidden sm:block text-sm text-gray-400 hover:text-gray-200"
          >
            Log in
          </button>

          <button
            onClick={() => setScreen("register")}
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-700 text-[#0B0F19] text-sm font-medium px-4 py-2 rounded-xl"
          >
            Get started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] text-white">
            Every family document, exactly where you left it.
          </h1>
          <p className="mt-5 text-gray-400 text-base leading-relaxed max-w-md">
            Dastavej keeps IDs, policies, and certificates for you and the people you look after
            in one place — so finding one takes a search, not a search party.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setScreen("register")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-[#0B0F19] text-sm font-medium px-5 py-3 rounded-xl"
            >
              Create your vault <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScreen("login")}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              I already have an account
            </button>
          </div>
        </div>

        <DocumentStack />
      </section>

      {/* The problem, in one line */}
      <section className="border-y border-white/5 bg-[#0D1220]">
        <div className="max-w-3xl mx-auto px-6 py-10 text-center">
          <p className="text-gray-300 text-lg leading-relaxed">
            You know the file exists. It's in Gallery, or Drive, or a folder called "Important" —
            somewhere. Dastavej is the one place you check first, and the last place you'll need to.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-10">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`flex items-start gap-5 pb-10 ${i !== FEATURES.length - 1 ? "border-b border-white/5" : ""
                }`}
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">{title}</h3>
                <p className="mt-1.5 text-gray-400 text-sm leading-relaxed max-w-md">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl text-white">
          Set it up once. Find anything, always.
        </h2>
        <button
          onClick={() => setScreen("register")}
          className="mt-6 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-[#0B0F19] text-sm font-medium px-5 py-3 rounded-xl"
        >
          Create your vault <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <Logo />
          <span className="text-xs text-gray-600">© {new Date().getFullYear()} Dastavej. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
