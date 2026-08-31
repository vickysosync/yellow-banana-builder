import { useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = useMemo(() => items.filter((i) => i.status === "active"), [items]);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(visible.map((i) => i.category)))],
    [visible],
  );
  const filtered = category === "All" ? visible : visible.filter((i) => i.category === category);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors",
              category === c ? "bg-primary text-primary-foreground" : "bg-card hover:bg-primary/15",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No photos in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="zoom-parent group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className={cn("overflow-hidden", i % 3 === 1 ? "h-72" : "h-56")}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.category}
                </p>
                <p className="mt-1 font-extrabold">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary/85 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close image"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-lg font-bold"
            >
              ✕
            </button>
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[65vh] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {active.category}
              </p>
              <h3 className="mt-1 text-xl font-extrabold">{active.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{active.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
