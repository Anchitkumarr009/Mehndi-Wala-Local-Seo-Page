import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LocalityPageEditor } from "@/components/dashboard/editor/LocalityPageEditor";

export const dynamic = "force-dynamic";

export default async function NewLocalityPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }

  return <LocalityPageEditor isNew={true} />;
}
