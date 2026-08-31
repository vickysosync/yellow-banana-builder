import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/PublicLayout";
import {
  AfterSchoolSection,
  CtaSection,
  ProgramsSection,
  SkillsSection,
} from "@/components/sections";

const title = "Preschool Programs — Playgroup to UKG | The Yellow Banana";
const description =
  "Playgroup, Nursery, LKG and UKG programs plus Jolly Phonics, grammar, abacus mental math and creative learning at The Yellow Banana, Chinchpokli, Mumbai.";

export const Route = createFileRoute("/programs")({
  component: ProgramsPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/programs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
});

function ProgramsPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Learning Programs"
        subtitle="Age-appropriate preschool years and skill-development programs designed for confident little learners."
      />
      <ProgramsSection />
      <SkillsSection />
      <AfterSchoolSection />
      <CtaSection />
    </PublicLayout>
  );
}
