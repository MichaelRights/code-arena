import { Button, ButtonProps, styled } from "@mui/material";

interface TabButtonProps {
  selected: boolean;
}

export const TabButton = styled((props: TabButtonProps & ButtonProps) => (
  <Button size="small" {...props} />
))(({ selected, theme }) => ({
  color: selected ? theme.palette.primary.main : "gray",
  borderRadius: 8,
}));
