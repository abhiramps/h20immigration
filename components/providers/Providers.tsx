"use client";

import { LeadModalProvider } from "@/context/LeadModalContext";
import { LeadModal } from "@/components/modals/LeadModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      {children}
      <LeadModal />
    </LeadModalProvider>
  );
}
