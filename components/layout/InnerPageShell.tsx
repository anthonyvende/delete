import type { ReactNode } from "react";
import { PageShell } from "./PageShell";

type InnerPageShellProps = {
  children: ReactNode;
};

export function InnerPageShell({ children }: InnerPageShellProps) {
  return <PageShell>{children}</PageShell>;
}
