import { AppBar, Button, Typography } from "@mui/material";
import { DefaultThemeProvider } from "@/themes";
import { useRouter } from "next/navigation";

interface PlayerLayoutProps {
  children: React.ReactNode;
  headerChildren?: React.ReactElement;
}

export function PlayerLayout({ children, headerChildren }: PlayerLayoutProps) {
  const router = useRouter();
  return (
    <DefaultThemeProvider>
      <AppBar
        sx={{
          alignItems: "center",
          p: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        position="sticky"
      >
        <Button
          sx={{ width: 200, alignItems: "left" }}
          onClick={() => router.push("/")}
        >
          <Typography variant="h6">Code Arena</Typography>
        </Button>
        {headerChildren}
      </AppBar>
      {children}
    </DefaultThemeProvider>
  );
}
