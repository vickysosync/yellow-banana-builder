import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { SavedNotice, TextArea, TextField } from "@/components/admin/AdminFields";
import { Button } from "@/components/Button";
import { initialData } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
  head: adminHead(
    "Site Settings",
    "Manage the business name, tagline, footer text and primary call to action.",
    "/admin/settings",
  ),
});

function SettingsAdmin() {
  const data = useSiteData();
  const [form, setForm] = useState(data.settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(data.settings), [data.settings]);

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <AdminLayout
      title="Site Settings"
      description="Global branding and text used across the public website."
    >
      <section className="grid max-w-2xl gap-4 rounded-3xl border border-border bg-card p-6">
        <TextField label="Business Name" value={form.businessName} onChange={set("businessName")} />
        <TextField label="Tagline" value={form.tagline} onChange={set("tagline")} />
        <TextField label="Phone" value={form.phone} onChange={set("phone")} />
        <TextArea label="Address" value={form.address} onChange={set("address")} rows={3} />
        <TextField label="Website" value={form.website} onChange={set("website")} />
        <TextArea label="Footer Text" value={form.footerText} onChange={set("footerText")} rows={2} />
        <TextField
          label="Primary CTA Text"
          value={form.primaryCta}
          onChange={set("primaryCta")}
          hint="Shown on the main Book a Visit buttons."
        />
        <SavedNotice show={saved} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              updateSection("settings", form);
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2500);
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setForm(initialData.settings);
              updateSection("settings", initialData.settings);
            }}
          >
            Reset
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
}
