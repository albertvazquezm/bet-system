'use client'

import { QueryClientProvider } from "@tanstack/react-query"
import { useMemo } from "react";
import { createQueryClient } from "@/rq/client";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useMemo(() => createQueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}