"use client";
import type { Metadata } from "next";
import "../globals.css";
import { DefaultThemeProvider } from "@/themes";

export const metadata: Metadata = {
  title: "Code Arena",
  description:
    "Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments",
};

export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <DefaultThemeProvider>{children}</DefaultThemeProvider>
      </body>
    </html>
  );
}
