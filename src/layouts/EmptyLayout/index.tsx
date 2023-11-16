"use client";
import "../globals.css";
import { DefaultThemeProvider } from "@/themes";

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
