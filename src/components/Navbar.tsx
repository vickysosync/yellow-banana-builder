import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ButtonLink } from "@/components/Button";
import { useSiteData } from "@/utils/storage";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Activities", to: "/activities" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const data = useSiteData();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 shadow-[var(--shadow-soft)] backdrop-blur" : "bg-background",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-xl">
            🍌
          </span>
          <span className="font-display text-lg font-extrabold leading-5">
            The Yellow
            <br />
            <span className="text-muted-foreground">Banana</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary/20",
                  pathname === l.to && "bg-primary/25",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contact" className="hidden sm:inline-flex">
            {data.settings.primaryCta}
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-border lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded bg-foreground transition-all",
                  open ? "top-2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-0.5 w-5 rounded bg-foreground transition-all",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded bg-foreground transition-all",
                  open ? "top-2 -rotate-45" : "top-4",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-semibold",
                    pathname === l.to && "bg-primary/25",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="px-4 pb-2 pt-3">
              <ButtonLink to="/contact" className="w-full">
                {data.settings.primaryCta}
              </ButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
