"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/content/labels";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mehndiwalaa.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard/pages");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-line rounded-sharp p-8 shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-serif font-semibold text-2xl text-ink tracking-tight mb-1">
            {siteConfig.name}
          </div>
          <div className="text-xs font-bold text-stain uppercase tracking-wider mb-3">
            Internal CMS Portal
          </div>
          <p className="text-xs text-ink-soft">
            Enter your admin credentials to manage programmatic SEO locality pages.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-sharp flex items-center gap-2 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-soft absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mehndiwalaa.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-soft absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-bold text-parchment bg-stain hover:bg-stain-deep disabled:opacity-50 rounded-sharp uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center text-xs text-ink-soft/70">
          Default Credentials: <code className="text-ink font-mono font-bold">admin@mehndiwalaa.com</code> /{" "}
          <code className="text-ink font-mono font-bold">admin123</code>
        </div>
      </div>
    </div>
  );
}
