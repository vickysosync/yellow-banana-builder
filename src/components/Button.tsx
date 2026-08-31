import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline" | "ghost" | "coral" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-banana-soft shadow-[var(--shadow-soft)]",
  navy: "bg-secondary text-secondary-foreground hover:opacity-90",
  outline: "border-2 border-secondary/25 text-foreground hover:border-primary hover:bg-primary/10",
  ghost: "text-foreground hover:bg-primary/15",
  coral: "bg-coral text-secondary-foreground hover:opacity-90",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  to,
  hash,
}: BaseProps & { to: string; hash?: string }) {
  return (
    <Link
      to={to}
      hash={hash}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}
