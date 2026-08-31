import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { isLoggedIn, logout } from "@/utils/storage";

export const adminNav = [
  { label: "Dashboard", to: "/admin/dashboard", emoji: "📊" },
  { label: "Hero Section", to: "/admin/hero", emoji: "🌟" },
  { label: "About", to: "/admin/about", emoji: "📖" },
  { label: "Programs", to: "/admin/programs", emoji: "🎓" },
  { label: "Activities", to: "/admin/activities", emoji: "🤸" },
  { label: "Gallery", to: "/admin/gallery", emoji: "🖼️" },
  { label: "Testimonials", to: "/admin/testimonials", emoji: "💬" },
  { label: "Why Choose Us", to: "/admin/features", emoji: "✅" },
  { label: "Facilities", to: "/admin/facilities", emoji: "🏫" },
  { label: "Contact Information", to: "/admin/contact", emoji: "📞" },
  { label: "Enquiries", to: "/admin/enquiries", emoji: "📥" },
  { label: "Site Settings", to: "/admin/settings", emoji: "⚙️" },
];

/**
 * Demo-only auth gate. Replace `isLoggedIn()` with a real session check
 * when a backend is added — nothing else in this layout needs to change.
 */
export function AdminLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: "/admin/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  useEffect(() => setOpen(false), [pathname]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <p className="text-sm text-muted-foreground">Loading admin…</p>
      </div>
    );
  }

  const sidebar = (
    <nav aria-label="Admin" className="flex h-full flex-col gap-1 overflow-y-auto p-4">
      <Link to="/" className="mb-4 flex items-center gap-2.5 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-lg">🍌</span>
        <span className="font-display text-base font-extrabold text-secondary-foreground">
          The Yellow Banana
        </span>
      </Link>
      {adminNav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-secondary-foreground/75 transition-colors hover:bg-primary/20 hover:text-secondary-foreground",
            pathname === item.to && "bg-primary text-primary-foreground hover:bg-primary",
          )}
        >
          <span aria-hidden>{item.emoji}</span>
          {item.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => {
          logout();
          navigate({ to: "/admin/login" });
        }}
        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-secondary-foreground/75 hover:bg-destructive/20 hover:text-secondary-foreground"
      >
        <span aria-hidden>🚪</span> Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-cream lg:flex">
      <aside className="hidden w-72 shrink-0 bg-secondary lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-secondary/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-secondary">{sidebar}</div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3 px-5 py-4">
            <button
              type="button"
              aria-label="Open admin menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
            >
              ☰
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold">{title}</h1>
              {description ? (
                <p className="truncate text-xs text-muted-foreground">{description}</p>
              ) : null}
            </div>
            <Link
              to="/"
              className="ml-auto rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-primary/15"
            >
              View site ↗
            </Link>
          </div>
        </header>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
