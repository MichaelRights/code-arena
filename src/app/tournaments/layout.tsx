import React from "react";

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return <body style={{ background: "red" }}>{children}</body>;
}
