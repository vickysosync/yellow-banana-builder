import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/PublicLayout";
import {
  AboutSection,
  AfterSchoolSection,
  CtaSection,
  FacilitiesSection,
  ParentCommunicationSection,
  WhyUsSection,
} from "@/components/sections";

const title = "About Us | The Yellow Banana Preschool, Chinchpokli";
const description =
  "Our story, Montessori-inspired approach, 1:10 care model and child-safe facilities at The Yellow Banana Preschool And Activity Club in Chinchpokli, Mumbai.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        title="Our Story & Philosophy"
        subtitle="A warm, hygienic and joyful early-learning home in the heart of Chinchpokli, Mumbai — since 2017."
      />
      <AboutSection />
      <WhyUsSection />
      <ParentCommunicationSection />
      <FacilitiesSection />
      <AfterSchoolSection />
      <CtaSection />
    </PublicLayout>
  );
}
