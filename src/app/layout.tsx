import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBarWrapper from "@/components/ui/navBarWrapper";
import { Toaster } from "@/components/ui/toaster"
const geist = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist",
});
const sentient = localFont({
  src: "./fonts/sentient.ttf",
  variable: "--font-sentient",
});

export const metadata: Metadata = {
  title: "XeeAI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sentient.variable} ${geist.variable} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <NavBarWrapper />
        <div className="flex flex-col min-h-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
