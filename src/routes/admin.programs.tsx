import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import type { Program } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/programs")({
  component: ProgramsAdmin,
  head: adminHead(
    "Programs",
    "Add, edit and publish preschool programs for The Yellow Banana Preschool & Activity Club.",
    "/admin/programs",
  ),
});

function ProgramsAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout title="Programs" description="Active programs appear on the public website.">
      <AdminCrud<Program>
        items={data.programs}
        onChange={(v) => updateSection("programs", v)}
        addLabel="Add program"
        emptyLabel="No programs yet. Add Playgroup, Nursery, LKG or UKG."
        config={{
          titleKey: "name",
          toggle: true,
          fields: [
            { key: "name", label: "Program Name" },
            { key: "ageGroup", label: "Age Group" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "image", label: "Image URL", formOnly: true },
            {
              key: "accent",
              label: "Accent Colour",
              type: "select",
              options: ["yellow", "green", "sky", "coral"],
              formOnly: true,
            },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["active", "inactive"],
              formOnly: true,
            },
          ],
          blank: () => ({
            id: "",
            name: "",
            description: "",
            ageGroup: "",
            image: "",
            accent: "yellow",
            status: "active",
          }),
        }}
      />
    </AdminLayout>
  );
}
