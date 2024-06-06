import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NSL Forever",
  description: "Access NSL review articles, videos, and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col h-screen">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
