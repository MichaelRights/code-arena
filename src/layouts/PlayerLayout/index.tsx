"use client";
import "../globals.css";
import { AppBar, Typography } from "@mui/material";
import { DefaultThemeProvider } from "@/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <DefaultThemeProvider>
            <AppBar sx={{ p: 1 }} position="sticky">
              <Typography onClick={() => router.push("/")} variant="h6">
                Code Arena
              </Typography>
            </AppBar>
            {children}
          </DefaultThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
