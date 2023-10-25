import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/layout/HeaderComp";
import Footer from "./_components/layout/Footer";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="en" className="h-full">
      <body className={`font-sans ${inter.variable} flex h-full flex-col`}>
        <TRPCReactProvider headers={headers()}>
          <Toaster />
          <SessionProviderWrapper>
            <Header />
            <main className="flex grow flex-col overflow-y-auto p-5">
              {children}
            </main>
            <Footer />
          </SessionProviderWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
