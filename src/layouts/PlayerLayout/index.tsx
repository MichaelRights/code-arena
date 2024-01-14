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
          sx={{ width: 64, height: 40, alignItems: "left" }}
          onClick={() => router.push("/")}
        >
          <Typography
            sx={{
              textShadow: "1px 1px 16px #adeade",
            }}
            fontSize="0.8rem"
            variant="subtitle2"
          >
            <Typography style={{ all: "inherit", color: "#ec2c40" }}>
              CODE
            </Typography>{" "}
            <Typography style={{ all: "inherit", color: "#00a9e5" }}>
              ARENA
            </Typography>
          </Typography>
        </Button>
        {headerChildren}
      </AppBar>
      {children}
    </DefaultThemeProvider>
  );
}
