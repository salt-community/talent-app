"use client";

import { type SessionContextValue } from "next-auth/react";

export const isFeatureHeaderV2Enabled = <R extends boolean>(
  session: SessionContextValue<R>,
) => {
  const environmentEnabled = process.env.NEXT_PUBLIC_FF_HEADER_V2 === "ON";
  const localStorageEnabled = localStorage.getItem("FF_HEADER_V2") === "ON";
  const userEnabled = session?.data?.user?.email?.includes(
    "@appliedtechnology.se",
  );

  return environmentEnabled || localStorageEnabled || userEnabled;
};
