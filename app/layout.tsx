import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV Showcase",
  description: "A retro TV showcase experience",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className="m-0 p-0 min-h-screen bg-[#0c0a09] text-[#ededed]">
        {children}
      </body>
    </html>
  );
}
