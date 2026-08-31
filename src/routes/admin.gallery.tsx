import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { AdminCrud } from "@/components/admin/AdminCrud";
import { GALLERY_CATEGORIES, type GalleryItem } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
  head: adminHead(
    "Gallery",
    "Add, categorise and publish gallery photos for The Yellow Banana Preschool.",
    "/admin/gallery",
  ),
});

function GalleryAdmin() {
  const data = useSiteData();
  return (
    <AdminLayout title="Gallery" description="Active images show in the public gallery.">
      <AdminCrud<GalleryItem>
        items={data.gallery}
        onChange={(v) => updateSection("gallery", v)}
        addLabel="Add image"
        emptyLabel="No gallery images yet."
        config={{
          titleKey: "title",
          toggle: true,
          fields: [
            { key: "title", label: "Title" },
            { key: "category", label: "Category", type: "select", options: GALLERY_CATEGORIES },
            { key: "description", label: "Description", type: "textarea" },
            { key: "image", label: "Image URL", formOnly: true, hint: "Used as the alt-text source too." },
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
            title: "",
            category: GALLERY_CATEGORIES[0]!,
            description: "",
            image: "",
            status: "active",
          }),
        }}
      />
    </AdminLayout>
  );
}
