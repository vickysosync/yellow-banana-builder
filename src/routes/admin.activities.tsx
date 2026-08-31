import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import type { Activity } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/activities")({
  component: ActivitiesAdmin,
  head: adminHead(
    "Activities",
    "Manage activity club offerings such as gymnastics, dance and summer camps.",
    "/admin/activities",
  ),
});

function ActivitiesAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout title="Activities" description="Manage the Activity Club listings.">
      <AdminCrud<Activity>
        items={data.activities}
        onChange={(v) => updateSection("activities", v)}
        addLabel="Add activity"
        emptyLabel="No activities yet. Add gymnastics, dance, summer camps and more."
        config={{
          titleKey: "name",
          toggle: true,
          fields: [
            { key: "name", label: "Activity Name" },
            { key: "emoji", label: "Icon / Emoji" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "image", label: "Image URL", formOnly: true },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["active", "inactive"],
              formOnly: true,
            },
          ],
          blank: () => ({ id: "", name: "", description: "", emoji: "🎨", image: "", status: "active" }),
        }}
      />
    </AdminLayout>
  );
}
