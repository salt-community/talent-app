"use client";

export const isFeatureHeaderV2Enabled = () => {
  const environmentEnabled = process.env.NEXT_PUBLIC_FF_HEADER_V2 === "ON";
  const localStorageEnabled =
    typeof window !== "undefined"
      ? window.localStorage.getItem("FF_HEADER_V2") === "ON"
      : false;

  return environmentEnabled || localStorageEnabled;
};
