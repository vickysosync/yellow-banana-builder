import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import type { Testimonial } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/testimonials")({
  component: TestimonialsAdmin,
  head: adminHead(
    "Testimonials",
    "Manage parent testimonials shown on The Yellow Banana Preschool & Activity Club website.",
    "/admin/testimonials",
  ),
});

function TestimonialsAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout
      title="Testimonials"
      description="Demo testimonials are placeholders — replace them with real parent reviews."
    >
      <AdminCrud<Testimonial>
        items={data.testimonials}
        onChange={(v) =>
          updateSection(
            "testimonials",
            v.map((t) => ({ ...t, rating: Number(t.rating) || 5, demo: Boolean(t.demo) })),
          )
        }
        addLabel="Add testimonial"
        emptyLabel="No testimonials yet."
        config={{
          titleKey: "name",
          toggle: true,
          fields: [
            { key: "name", label: "Parent Name" },
            { key: "role", label: "Role", hint: "e.g. Parent of Nursery Student" },
            { key: "quote", label: "Testimonial", type: "textarea" },
            { key: "rating", label: "Rating", type: "select", options: ["1", "2", "3", "4", "5"], formOnly: true },
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
            role: "Parent of Preschool Student",
            quote: "",
            rating: 5,
            status: "active",
            demo: false,
          }),
        }}
      />
    </AdminLayout>
  );
}
