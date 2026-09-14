import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/labels";
import { AuthProvider } from "@/components/dashboard/AuthProvider";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-parchment flex flex-col font-sans">
        <DashboardNavbar />
        <main className="flex-1 max-w-wrap w-full mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
