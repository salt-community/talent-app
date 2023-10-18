import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/HeaderComp";
import Footer from "./_components/Footer";
import { SessionProvider } from "next-auth/react";
import { SessionProviderWrapper } from "./SessionProviderWrapper";

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
      <body className={`font-sans ${inter.variable} h-full flex flex-col`}>
        <TRPCReactProvider headers={headers()}>
          <SessionProviderWrapper>
          <Header />
          <main className="flex flex-col p-5 grow overflow-y-auto">
            {children}
          </main>
          <Footer />
         </SessionProviderWrapper>

        </TRPCReactProvider>
      </body>
    </html>
  );
}
