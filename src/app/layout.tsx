import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/layout/HeaderComp";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import { Toaster } from "react-hot-toast";



export const metadata = {
  title: "Salt Talent Pool",
  description: "Salt Talent Pool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen">
      <body className={`flex h-screen flex-col`}>
        <TRPCReactProvider headers={headers()}>
          <Toaster />
          <SessionProviderWrapper>
            <Header />
            {children}
          </SessionProviderWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
