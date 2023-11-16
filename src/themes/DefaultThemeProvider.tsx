import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#adeade",
      dark: "#FFFFFF",
      light: "#000000",
    },
  },
});
export function DefaultThemeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
