"use client";
import { NextUIProvider as RealNextUIProvider } from "@nextui-org/react";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <RealNextUIProvider>{children}</RealNextUIProvider>;
}
