"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { siteConfig } from "@/content/labels";
import { PlusCircle, ExternalLink, LogOut, Layers } from "lucide-react";

export const DashboardNavbar: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-card border-b border-line sticky top-0 z-30 shadow-sm">
      <div className="max-w-wrap mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left Brand */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard/pages" className="flex flex-col group">
            <span className="font-serif font-semibold text-lg text-ink tracking-tight group-hover:text-stain transition-colors">
              {siteConfig.name}
            </span>
            <span className="font-sans font-extrabold text-[0.6rem] text-stain uppercase tracking-wider">
              SEO Locality CMS
            </span>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/dashboard/pages"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-sharp transition-colors ${
                pathname === "/dashboard/pages"
                  ? "bg-parchment text-stain border border-line"
                  : "text-ink-soft hover:text-ink hover:bg-parchment"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Pages</span>
            </Link>

            <Link
              href="/dashboard/pages/new"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-sharp transition-colors ${
                pathname === "/dashboard/pages/new"
                  ? "bg-parchment text-stain border border-line"
                  : "text-ink-soft hover:text-ink hover:bg-parchment"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create New</span>
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <div className="h-4 w-px bg-line hidden md:block" />

          {session?.user && (
            <div className="text-xs text-ink font-medium hidden sm:block">
              {session.user.email}
            </div>
          )}

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stain hover:bg-parchment border border-line rounded-sharp transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
