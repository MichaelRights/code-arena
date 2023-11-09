import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#adeade",
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
