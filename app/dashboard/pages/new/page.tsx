import React from "react";
import { LocalityPageEditor } from "@/components/dashboard/editor/LocalityPageEditor";

export const dynamic = "force-dynamic";

export default function NewLocalityPage() {
  return <LocalityPageEditor isNew={true} />;
}
