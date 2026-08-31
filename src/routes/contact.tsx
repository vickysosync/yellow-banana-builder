import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/PublicLayout";
import { ContactForm } from "@/components/ContactForm";
import { useSiteData } from "@/utils/storage";

const title = "Contact & Book a Visit | The Yellow Banana Preschool, Mumbai";
const description =
  "Visit The Yellow Banana Preschool And Activity Club at Chinchpokli, Mumbai. Call +91 98201 07473 or request a visit for your child today.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const { contact } = useSiteData();

  return (
    <PublicLayout>
      <PageHero
        title="Come Say Hello"
        subtitle="We would love to show you around our classrooms and answer every question you have."
      />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">Visit Us</h2>
          <div className="mt-6 space-y-5">
            <article className="card-soft p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Address
              </h3>
              <address className="mt-2 text-sm not-italic">{contact.address}</address>
            </article>
            <article className="card-soft p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Phone
              </h3>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-sm font-bold"
              >
                {contact.phone}
              </a>
            </article>
            <article className="card-soft p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Website
              </h3>
              <p className="mt-2 text-sm font-bold">{contact.website}</p>
              <p className="mt-1 text-sm text-muted-foreground">{contact.email}</p>
            </article>
            <p className="text-sm text-muted-foreground">
              Ground-floor premises, a short walk from Chinchpokli Railway Station (East).
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </PublicLayout>
  );
}
