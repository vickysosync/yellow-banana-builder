import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import {
  AboutSection,
  ActivityClubSection,
  AfterSchoolSection,
  ContactPreview,
  CtaSection,
  FacilitiesSection,
  Hero,
  ParentCommunicationSection,
  ProgramsSection,
  SkillsSection,
  TestimonialsSection,
  TrustBar,
  WhyUsSection,
} from "@/components/sections";

const title = "The Yellow Banana Preschool & Activity Club | Chinchpokli, Mumbai";
const description =
  "Discover The Yellow Banana Preschool And Activity Club in Chinchpokli, Mumbai — Montessori-based preschool learning, activity programs and personalized care for children aged 1.10 to 6 years.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Preschool",
          name: "The Yellow Banana Preschool And Activity Club",
          telephone: "+91 98201 07473",
          url: "https://theyellowbananapreschool.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No. 11, Shree Motanka Tenants, Dattaram Lad Marg, Chinchpokli",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400012",
            addressCountry: "IN",
          },
          foundingDate: "2017",
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <PublicLayout>
      <Hero />
      <TrustBar />
      <AboutSection />
      <ProgramsSection />
      <SkillsSection />
      <ActivityClubSection />
      <AfterSchoolSection />
      <WhyUsSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <ParentCommunicationSection />
      <CtaSection />
      <ContactPreview />
    </PublicLayout>
  );
}
