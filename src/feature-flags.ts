"use client";

export const isFeatureHeaderV2Enabled = () => {
  const environmentEnabled = process.env.NEXT_PUBLIC_FF_HEADER_V2 === "ON";
  const localStorageEnabled = localStorage.getItem("FF_HEADER_V2") === "ON";

  return environmentEnabled || localStorageEnabled;
};
