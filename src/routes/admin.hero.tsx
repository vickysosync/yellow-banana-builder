import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { SavedNotice, TextArea, TextField } from "@/components/admin/AdminFields";
import { Button } from "@/components/Button";
import { initialData } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/hero")({
  component: HeroAdmin,
  head: adminHead(
    "Hero Section",
    "Edit the homepage hero content for The Yellow Banana Preschool.",
    "/admin/hero",
  ),
});

function HeroAdmin() {
  const data = useSiteData();
  const [form, setForm] = useState(data.hero);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(data.hero), [data.hero]);

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <AdminLayout title="Hero Section" description="Changes appear on the homepage immediately.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="grid gap-4 rounded-3xl border border-border bg-card p-6">
          <TextField label="Hero Badge" value={form.badge} onChange={set("badge")} />
          <TextField label="Hero Heading" value={form.heading} onChange={set("heading")} />
          <TextArea label="Hero Description" value={form.description} onChange={set("description")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Primary Button Text" value={form.primaryCta} onChange={set("primaryCta")} />
            <TextField
              label="Secondary Button Text"
              value={form.secondaryCta}
              onChange={set("secondaryCta")}
            />
          </div>
          <TextField
            label="Hero Image URL"
            value={form.image}
            onChange={set("image")}
            hint="Paste any image URL. Use a preschool / classroom photo."
          />

          <SavedNotice show={saved} />

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                updateSection("hero", form);
                setSaved(true);
                window.setTimeout(() => setSaved(false), 2500);
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setForm(initialData.hero);
                updateSection("hero", initialData.hero);
              }}
            >
              Reset
            </Button>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-muted-foreground">Live preview</h2>
          <div className="mt-4 overflow-hidden rounded-3xl bg-cream p-5">
            <span className="inline-flex rounded-full bg-primary/30 px-3 py-1 text-xs font-bold">
              {form.badge}
            </span>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight">{form.heading}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{form.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                {form.primaryCta}
              </span>
              <span className="rounded-full border-2 border-secondary/25 px-4 py-2 text-xs font-bold">
                {form.secondaryCta}
              </span>
            </div>
            {form.image ? (
              <img
                src={form.image}
                alt="Hero preview"
                className="mt-4 h-40 w-full rounded-2xl object-cover"
              />
            ) : null}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
