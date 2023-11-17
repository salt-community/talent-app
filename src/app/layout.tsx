import "@/styles/globals.css";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/HeaderComp";
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
        <main className="flex h-full w-full items-center justify-center">
          <p>Under maintenance.</p>
        </main>
        {/* <TRPCReactProvider headers={headers()}>
          <Toaster />
          <SessionProviderWrapper>
            <Header />
            {children}
          </SessionProviderWrapper>
        </TRPCReactProvider> */}
      </body>
    </html>
  );
}
