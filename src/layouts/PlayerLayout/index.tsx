"use client";
import type { Metadata } from "next";
import "../globals.css";
import { AppBar, Typography } from "@mui/material";
import { DefaultThemeProvider } from "@/themes";

export const metadata: Metadata = {
  title: "Code Arena",
  description:
    "Code Arena is a coding tournament platform. It is developed for organizing large and small tournaments",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <DefaultThemeProvider>
          <AppBar sx={{ p: 1 }} position="fixed">
            <Typography variant="h6">Code Arena</Typography>
          </AppBar>
          {children}
        </DefaultThemeProvider>
      </body>
    </html>
  );
}
