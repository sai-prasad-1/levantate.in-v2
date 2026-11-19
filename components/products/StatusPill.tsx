import type { ReactNode } from "react";
import { Status } from "@/components/site/ui";

export type StatusDot = "live" | "solid" | "ring" | "dashed";

/** Product or project status: Live, Early access, In development, Stealth. */
export function StatusPill({
  children,
  dot = "solid",
  onNight = false,
  className = "",
}: {
  children: ReactNode;
  dot?: StatusDot;
  onNight?: boolean;
  className?: string;
}) {
  return (
    <Status kind={dot} onNight={onNight} className={className}>
      {children}
    </Status>
  );
}
