// RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* You can add other meta tags here */}</head>
      <body className={`${inter.className} bg-gray-700 text-white`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-blue-400 text-black p-4 text-center">
            © 2024 My Portfolio
          </footer>
        </div>
      </body>
    </html>
  );
}