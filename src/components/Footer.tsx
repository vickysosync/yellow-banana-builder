import { Link } from "@tanstack/react-router";
import { useSiteData } from "@/utils/storage";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Activities", to: "/activities" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const programLinks = [
  "Playgroup",
  "Nursery",
  "LKG",
  "UKG",
  "Activity Club",
  "Tuition Support",
];

export function Footer() {
  const { contact, settings } = useSiteData();

  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-xl">
              🍌
            </span>
            <span className="font-display text-lg font-extrabold">The Yellow Banana</span>
          </div>
          <p className="mt-4 text-sm text-secondary-foreground/75">
            A warm, safe and joyful preschool and activity club in Chinchpokli, Mumbai — nurturing
            curious little minds since 2017.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-secondary-foreground/75 hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Programs</h3>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/75">
            {programLinks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Contact</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-secondary-foreground/75">
            <p>{contact.address}</p>
            <p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {contact.phone}
              </a>
            </p>
            <p>{contact.website}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-secondary-foreground/65 sm:flex-row">
          <p>{settings.footerText}</p>
          <Link
            to="/admin/login"
            className="rounded-full border border-secondary-foreground/25 px-3 py-1.5 font-semibold hover:border-primary hover:text-primary"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
