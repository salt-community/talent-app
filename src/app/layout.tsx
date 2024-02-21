import "@/styles/globals.css";
import { headers } from "next/headers";
import { NextUIProvider } from "@nextui-org/react";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "./_components/HeaderComp";
import { SessionProviderWrapper } from "./SessionProviderWrapper";
import { Toaster } from "react-hot-toast";
import { env } from "process";

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
          <NextUIProvider>
            <Toaster />
            <SessionProviderWrapper>
              <Header />
              {children}
            </SessionProviderWrapper>
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

// const Maintenance = () => {
//   return (
//     <main className="flex h-full flex-col items-center gap-5">
//       <h1 className="w-full bg-orange p-5 text-center text-xl">Maintenance</h1>
//       <div className="flex flex-col gap-5 p-6 font-thin">
//         <p className="self-center font-normal">Salt talents will be back soon...</p>
//         <p>Why did the webpage go to therapy?</p>
//         <p>
//           Because it needed some downtime for maintenance and emotional
//           debugging!
//         </p>
//         <p className="self-end font-normal">- ChatGPT</p>
//       </div>
//     </main>
//   );
// };
