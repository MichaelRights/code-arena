import { DefaultThemeProvider } from "@/themes";

export function EmptyLayout({ children }: { children: React.ReactNode }) {
  return <DefaultThemeProvider>{children}</DefaultThemeProvider>;
}
