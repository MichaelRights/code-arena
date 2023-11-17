import { AppBar, Button, Typography } from "@mui/material";
import { DefaultThemeProvider } from "@/themes";
import { useRouter } from "next/navigation";

export function PlayerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <DefaultThemeProvider>
      <AppBar sx={{ p: 1 }} position="sticky">
        <Button sx={{ width: 200 }} onClick={() => router.push("/")}>
          <Typography variant="h6">Code Arena</Typography>
        </Button>
      </AppBar>
      {children}
    </DefaultThemeProvider>
  );
}
