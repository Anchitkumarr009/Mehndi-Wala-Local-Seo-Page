import React from "react";
import { siteConfig, uiLabels } from "@/content/labels";
import { MessageCircle } from "lucide-react";

export const MobileCallBar: React.FC = () => {
  return (
    <aside
      aria-label="Quick Mobile Booking Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stain text-white py-3.5 px-4 shadow-[0_-8px_24px_rgba(51,16,29,0.3)] flex items-center justify-center gap-2 font-bold text-sm"
    >
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full text-center text-parchment"
      >
        <MessageCircle className="w-4 h-4 text-marigold-soft fill-current" />
        <span>{uiLabels.mobileBar.cta}</span>
      </a>
    </aside>
  );
};
