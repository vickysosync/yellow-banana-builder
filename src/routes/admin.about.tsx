import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { SavedNotice, TextArea, TextField } from "@/components/admin/AdminFields";
import { AdminCrud } from "@/components/admin/AdminCrud";
import { Button } from "@/components/Button";
import { initialData, type ApproachCard } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/about")({
  component: AboutAdmin,
  head: adminHead(
    "About",
    "Edit the about section, story and approach cards for The Yellow Banana Preschool & Activity Club.",
    "/admin/about",
  ),
});

function AboutAdmin() {
  const data = useSiteData();
  const [form, setForm] = useState(data.about);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(data.about), [data.about]);

  const set = (k: "heading" | "description" | "story" | "image") => (v: string) =>
    setForm({ ...form, [k]: v });

  return (
    <AdminLayout title="About" description="Manage the about section and approach cards.">
      <section className="grid gap-4 rounded-3xl border border-border bg-card p-6">
        <TextField label="About Heading" value={form.heading} onChange={set("heading")} />
        <TextArea label="Description" value={form.description} onChange={set("description")} rows={5} />
        <TextArea label="Short Story" value={form.story} onChange={set("story")} rows={3} />
        <TextField label="Image URL" value={form.image} onChange={set("image")} />
        <SavedNotice show={saved} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              updateSection("about", form);
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2500);
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setForm(initialData.about);
              updateSection("about", initialData.about);
            }}
          >
            Reset
          </Button>
        </div>
      </section>

      <h2 className="mt-10 mb-4 text-lg font-extrabold">Approach Cards</h2>
      <AdminCrud<ApproachCard>
        items={data.about.approach}
        onChange={(approach) => updateSection("about", { ...data.about, approach })}
        addLabel="Add approach card"
        config={{
          titleKey: "title",
          fields: [
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "emoji", label: "Icon / Emoji" },
          ],
          blank: () => ({ id: "", title: "", description: "", emoji: "🌱" }),
        }}
      />
    </AdminLayout>
  );
}
