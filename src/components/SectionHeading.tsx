import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
          🍌 {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
