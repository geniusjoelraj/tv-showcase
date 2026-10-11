"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail("admin@showcase.tv");
    setPassword("showcase2026");
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setLoggedInUser(email);
    }, 700);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#0c0a09] text-zinc-100 overflow-hidden font-sans selection:bg-[#ffbf47] selection:text-black">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#ffbf47]/10 via-[#ffbf47]/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[350px] bg-gradient-to-t from-amber-500/5 to-transparent blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shadow-inner">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ffbf47] shadow-[0_0_8px_#ffbf47]" />
          </div>
          <span className="font-mono text-sm tracking-widest uppercase text-white font-semibold">
            TV SHOWCASE
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#ffbf47]/60 to-transparent" />

            {!isLoggedIn ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#ffbf47] text-[11px] font-mono uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffbf47] animate-pulse" />
                    Admin Access
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                    Sign In
                  </h1>
                  <p className="text-zinc-400 text-sm mt-1.5 font-light">
                    Enter your credentials to manage content
                  </p>
                </div>

                <div className="mb-6 p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div className="text-xs text-zinc-400">
                    <span className="font-medium text-zinc-200 block">Demo Credentials</span>
                    <span>Click to fill test account</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="px-3 py-1.5 rounded-lg bg-[#ffbf47]/10 hover:bg-[#ffbf47]/20 text-[#ffbf47] border border-[#ffbf47]/30 text-xs font-mono tracking-wider font-semibold transition-all hover:scale-105 active:scale-95"
                  >
                    ⚡ Auto-Fill
                  </button>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#ffbf47] focus:ring-1 focus:ring-[#ffbf47] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#ffbf47] focus:ring-1 focus:ring-[#ffbf47] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-zinc-400">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-[#ffbf47] accent-[#ffbf47]"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#ededed] hover:bg-white text-black font-semibold text-sm tracking-wide uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? "Signing In..." : "Sign In →"}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-2xl">
                  ✓
                </div>

                <div>
                  <h2 className="text-2xl font-light text-white tracking-tight">
                    Authenticated
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    Signed in as <span className="text-[#ffbf47] font-mono">{loggedInUser}</span>
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    href="/studio"
                    className="w-full py-3 px-4 rounded-xl bg-[#ffbf47] hover:bg-[#ffbf47]/90 text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    Go to Studio (/studio) →
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono uppercase text-zinc-400 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-zinc-500 font-mono">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          ← Back to TV Showcase
        </Link>
      </footer>
    </div>
  );
}
