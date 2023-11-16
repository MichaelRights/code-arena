import { AppBar, Typography } from "@mui/material";
import { DefaultThemeProvider } from "@/themes";
import { useRouter } from "next/navigation";

export function PlayerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <DefaultThemeProvider>
      <AppBar sx={{ p: 1 }} position="sticky">
        <Typography onClick={() => router.push("/")} variant="h6">
          Code Arena
        </Typography>
      </AppBar>
      {children}
    </DefaultThemeProvider>
  );
}
