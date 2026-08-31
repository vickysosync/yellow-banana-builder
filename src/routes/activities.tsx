import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/PublicLayout";
import { ActivityClubSection, CtaSection, ParentCommunicationSection } from "@/components/sections";

const title = "Activity Club — Dance, Gymnastics & Camps | The Yellow Banana";
const description =
  "Gymnastics, physical training, children's dance, summer camps and creative activities for kids at The Yellow Banana Activity Club, Chinchpokli, Mumbai.";

export const Route = createFileRoute("/activities")({
  component: ActivitiesPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/activities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/activities" }],
  }),
});

function ActivitiesPage() {
  return (
    <PublicLayout>
      <PageHero
        title="A World of Activities"
        subtitle="Movement, music, creativity and camps that build confidence beyond the classroom."
      />
      <ActivityClubSection />
      <ParentCommunicationSection />
      <CtaSection />
    </PublicLayout>
  );
}
