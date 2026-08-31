import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import type { Feature } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/features")({
  component: FeaturesAdmin,
  head: adminHead(
    "Why Choose Us",
    "Manage the reasons parents choose The Yellow Banana Preschool & Activity Club.",
    "/admin/features",
  ),
});

function FeaturesAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout title="Why Choose Us" description="Feature cards shown on the public website.">
      <AdminCrud<Feature>
        items={data.features}
        onChange={(v) => updateSection("features", v)}
        addLabel="Add feature"
        emptyLabel="No feature cards yet."
        config={{
          titleKey: "title",
          toggle: true,
          fields: [
            { key: "title", label: "Title" },
            { key: "emoji", label: "Icon / Emoji" },
            { key: "description", label: "Description", type: "textarea" },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["active", "inactive"],
              formOnly: true,
            },
          ],
          blank: () => ({ id: "", title: "", description: "", emoji: "✅", status: "active" }),
        }}
      />
    </AdminLayout>
  );
}
