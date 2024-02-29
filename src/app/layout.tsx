import "@/styles/globals.css";
import { headers } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/Header";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import { Toaster } from "react-hot-toast";
import { env } from "process";
import { NextUIProvider } from "./NextUIProvider";

export const metadata = {
  title:
    env.NODE_ENV === "development"
      ? "DEV: Salt Talent Pool"
      : "Salt Talent Pool",
  description: "Salt Talent Pool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col overscroll-none">
        <TRPCReactProvider headers={headers()}>
          <Toaster />
          <SessionProviderWrapper>
            <NextUIProvider>
              <Header />
              {children}
            </NextUIProvider>
          </SessionProviderWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
