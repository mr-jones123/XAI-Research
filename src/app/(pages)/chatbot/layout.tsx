import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XeeAI",
  description: "Make AI Transparent",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
