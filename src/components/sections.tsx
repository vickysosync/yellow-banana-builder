import { Link } from "@tanstack/react-router";
import { ButtonAnchor, ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ActivityCard,
  FacilityCard,
  FeatureCard,
  ProgramCard,
  SkillCard,
  TestimonialCard,
} from "@/components/Cards";
import { useSiteData } from "@/utils/storage";

const trustStats = [
  { value: "2017", label: "Serving families since" },
  { value: "1:10", label: "Teacher-student ratio" },
  { value: "1.10–6", label: "Years age group" },
  { value: "Montessori", label: "Based learning" },
];

export function Hero() {
  const { hero } = useSiteData();

  return (
    <section className="relative overflow-hidden bg-primary/12 py-14 sm:py-20">
      <span className="blob -left-24 top-10 h-64 w-64 bg-leaf/20" />
      <span className="blob right-1/3 -top-16 h-52 w-52 bg-sky/20" />
      <span className="blob -right-16 bottom-0 h-72 w-72 bg-coral/15" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-bold shadow-[var(--shadow-soft)]">
            🍌 {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/contact" size="lg">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink to="/programs" size="lg" variant="outline">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="relative animate-rise">
          <span className="absolute -left-5 -top-5 hidden h-16 w-16 rounded-full bg-primary sm:block" />
          <span className="absolute -bottom-6 -right-4 hidden h-24 w-24 rounded-[40%] bg-leaf/40 sm:block" />
          <div className="zoom-parent relative overflow-hidden rounded-[2.5rem] border border-border shadow-[var(--shadow-lift)]">
            <img
              src={hero.image}
              alt="Children learning together in a bright Montessori preschool classroom"
              className="h-[22rem] w-full object-cover sm:h-[28rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <section className="container-page -mt-6 sm:-mt-10" aria-label="Why parents trust us">
      <div className="grid gap-4 rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-2xl font-extrabold sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const { about } = useSiteData();

  return (
    <section id="about" className="container-page py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="zoom-parent overflow-hidden rounded-[2.5rem] border border-border shadow-[var(--shadow-soft)]">
          <img
            src={about.image}
            alt="Teacher reading a story to preschool children"
            loading="lazy"
            className="h-80 w-full object-cover sm:h-[26rem]"
          />
        </div>
        <div>
          <SectionHeading align="left" eyebrow="About us" title={about.heading} />
          <p className="mt-5 text-muted-foreground">{about.description}</p>
          <p className="mt-4 text-muted-foreground">{about.story}</p>
          <ButtonLink to="/about" className="mt-7">
            Discover Our Approach
          </ButtonLink>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {about.approach.map((card) => (
          <article key={card.id} className="card-soft p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky/25 text-2xl" aria-hidden>
              {card.emoji}
            </span>
            <h3 className="mt-5 text-lg font-extrabold">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProgramsSection() {
  const { programs } = useSiteData();
  const active = programs.filter((p) => p.status === "active");

  return (
    <section className="bg-primary/10 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Programs"
          title="Learning Programs for Every Little Step"
          subtitle="Thoughtfully designed year groups that grow with your child."
        />
        {active.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">Programs coming soon.</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {active.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function SkillsSection() {
  const { skills } = useSiteData();

  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Skill development"
        title="Skills That Build Strong Foundations"
        subtitle="Specialised programmes that sharpen reading, language, focus and imagination."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => (
          <SkillCard key={s.id} skill={s} />
        ))}
      </div>
    </section>
  );
}

export function ActivityClubSection() {
  const { activities } = useSiteData();
  const active = activities.filter((a) => a.status === "active");

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-secondary-foreground">
      <span className="blob -left-16 top-10 h-56 w-56 bg-primary/25" />
      <span className="blob -right-10 bottom-6 h-64 w-64 bg-coral/20" />
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            Activity club
          </span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            More Than Preschool — A World of Activities
          </h2>
          <p className="mt-4 text-secondary-foreground/75">
            Movement, rhythm, creativity and confidence — beyond the classroom hours.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink to="/activities" size="lg">
            Explore Activity Club
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function AfterSchoolSection() {
  return (
    <section className="container-page py-20">
      <div className="grid items-center gap-10 rounded-[2.5rem] border border-border bg-leaf/10 p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="After-school support"
            title="Learning Continues Beyond the Classroom"
          />
          <p className="mt-5 text-muted-foreground">
            Alongside preschool, we offer school-year tuition support for older children, aligned
            with major boards so that everyday homework, revision and exam preparation feel calm
            and structured.
          </p>
        </div>
        <div className="card-soft p-7">
          <h3 className="text-lg font-extrabold">Academic Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {["ICSE board tuition", "CBSE board tuition", "Homework & revision guidance", "Small batch, personal attention"].map(
              (item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf/30 text-xs" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const { features } = useSiteData();
  const active = features.filter((f) => f.status === "active");

  return (
    <section className="bg-cream py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why us"
          title="Why Parents Choose The Yellow Banana"
          subtitle="The small, everyday things that make a big difference to your child's day."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FacilitiesSection() {
  const { facilities } = useSiteData();
  const active = facilities.filter((f) => f.status === "active");

  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Our space"
        title="A Safe Space to Learn & Explore"
        subtitle="Ground-floor, child-safe premises minutes from Chinchpokli Railway Station (East)."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((f) => (
          <FacilityCard key={f.id} facility={f} />
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const { testimonials } = useSiteData();
  const active = testimonials.filter((t) => t.status === "active");

  return (
    <section className="bg-primary/10 py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by Mumbai Parents"
          subtitle="Demo testimonials shown for this preview."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

const communicationCards = [
  { emoji: "📈", title: "Regular Progress Updates", text: "Frequent updates on how your child is settling, learning and growing." },
  { emoji: "💬", title: "Parent-Teacher Communication", text: "Open, honest conversations with the educators who see your child daily." },
  { emoji: "🎯", title: "Individual Attention", text: "A 1:10 ratio means every child is truly seen, heard and supported." },
  { emoji: "🏅", title: "Learning Milestones", text: "We celebrate first words, first friendships and every little win." },
];

export function ParentCommunicationSection() {
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Together"
        title="We Believe in Growing Together"
        subtitle="Regular communication between educators and parents helps us understand each child's progress, celebrate milestones and support their learning journey."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {communicationCards.map((c) => (
          <article key={c.title} className="card-soft p-7">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/25 text-2xl" aria-hidden>
              {c.emoji}
            </span>
            <h3 className="mt-5 text-lg font-extrabold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  const { contact } = useSiteData();

  return (
    <section className="container-page pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center sm:px-12">
        <span className="blob -left-10 -top-10 h-48 w-48 bg-coral/30" />
        <span className="blob -bottom-12 right-0 h-56 w-56 bg-sky/30" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Begin Your Child's Learning Journey?
          </h2>
          <p className="mt-4 text-foreground/80">
            Come visit The Yellow Banana Preschool And Activity Club and discover a warm, joyful and
            nurturing learning environment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact" size="lg" variant="navy">
              Book a Visit
            </ButtonLink>
            <ButtonAnchor
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              size="lg"
              variant="outline"
            >
              Call {contact.phone}
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactPreview() {
  const { contact } = useSiteData();

  return (
    <section className="container-page pb-20">
      <div className="grid gap-6 sm:grid-cols-3">
        <article className="card-soft p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Address</h3>
          <p className="mt-3 text-sm">{contact.address}</p>
        </article>
        <article className="card-soft p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Phone</h3>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="mt-3 block text-sm font-bold hover:text-muted-foreground"
          >
            {contact.phone}
          </a>
        </article>
        <article className="card-soft p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Website</h3>
          <p className="mt-3 text-sm font-bold">{contact.website}</p>
          <Link to="/contact" className="mt-4 inline-block text-sm font-bold underline">
            Book a visit →
          </Link>
        </article>
      </div>
    </section>
  );
}
