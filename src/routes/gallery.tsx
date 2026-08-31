import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/PublicLayout";
import { Gallery } from "@/components/Gallery";
import { CtaSection } from "@/components/sections";
import { useSiteData } from "@/utils/storage";

const title = "Gallery — Classrooms, Activities & Events | The Yellow Banana";
const description =
  "Browse photos of classrooms, art & craft, dance, gymnastics, summer camps and celebrations at The Yellow Banana Preschool And Activity Club, Mumbai.";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

function GalleryPage() {
  const { gallery } = useSiteData();

  return (
    <PublicLayout>
      <PageHero
        title="Moments at The Yellow Banana"
        subtitle="Little hands, big smiles — a peek into everyday life at our preschool and activity club."
      />
      <section className="container-page py-16">
        <Gallery items={gallery} />
      </section>
      <CtaSection />
    </PublicLayout>
  );
}
