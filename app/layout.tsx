import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";
import { Toaster } from "@/components/ui/sonner";
import { ThirdwebProvider } from "thirdweb/react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZerionHub",
  description: "ZerionHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased w-screen h-screen relative`}
      >
        <ThirdwebProvider>
          <RootLayoutContent children={children} />
        </ThirdwebProvider>
        <Toaster />
      </body>
    </html>
  );
}
