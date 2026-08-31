import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import type { Facility } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/facilities")({
  component: FacilitiesAdmin,
  head: adminHead(
    "Facilities",
    "Manage facility highlights for The Yellow Banana Preschool premises.",
    "/admin/facilities",
  ),
});

function FacilitiesAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout title="Facilities" description="Highlights of the Chinchpokli premises.">
      <AdminCrud<Facility>
        items={data.facilities}
        onChange={(v) => updateSection("facilities", v)}
        addLabel="Add facility"
        emptyLabel="No facilities yet."
        config={{
          titleKey: "name",
          toggle: true,
          fields: [
            { key: "name", label: "Facility Name" },
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
          blank: () => ({ id: "", name: "", description: "", image: "", status: "active" }),
        }}
      />
    </AdminLayout>
  );
}
