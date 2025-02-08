import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Pong - Vozni park",
  description: "Aplikacija koja omogućava upravljanjem voznog parka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 flex`}>
        <UserProvider>
          <Sidebar />
          <main className="w-full">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
