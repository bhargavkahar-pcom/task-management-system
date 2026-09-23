"use client";

import MuiProvider from "@/providers/MuiProvider";
import QueryProvider from "@/providers/QueryProvider";
import NotificationProvider from "./NotificationProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <MuiProvider>
      <QueryProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </QueryProvider>
    </MuiProvider>
  );
}
