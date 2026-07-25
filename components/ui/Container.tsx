import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-site ${className}`.trim()}>{children}</div>
  );
}

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  light?: boolean;
};

export function SectionLabel({
  children,
  className = "",
  light = false,
}: SectionLabelProps) {
  return (
    <div
      className={`text-[13px] ${
        light ? "text-[rgba(247,245,240,0.45)]" : "text-[rgba(22,21,15,0.45)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
