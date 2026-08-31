import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { SavedNotice, TextArea, TextField } from "@/components/admin/AdminFields";
import { Button } from "@/components/Button";
import { initialData } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/contact")({
  component: ContactAdmin,
  head: adminHead(
    "Contact Information",
    "Edit the address, phone and website details shown across the public site.",
    "/admin/contact",
  ),
});

function ContactAdmin() {
  const data = useSiteData();
  const [form, setForm] = useState(data.contact);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(data.contact), [data.contact]);

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <AdminLayout title="Contact Information" description="Used in the contact section and footer.">
      <section className="grid max-w-2xl gap-4 rounded-3xl border border-border bg-card p-6">
        <TextField label="Business Name" value={form.businessName} onChange={set("businessName")} />
        <TextField label="Phone" value={form.phone} onChange={set("phone")} />
        <TextArea label="Address" value={form.address} onChange={set("address")} rows={3} />
        <TextField label="Website" value={form.website} onChange={set("website")} />
        <TextField label="Email / Display Contact" value={form.email} onChange={set("email")} />
        <SavedNotice show={saved} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              updateSection("contact", form);
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2500);
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setForm(initialData.contact);
              updateSection("contact", initialData.contact);
            }}
          >
            Reset
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
}
