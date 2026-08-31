import type { Activity, Facility, Feature, Program, Skill, Testimonial } from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const accentBar: Record<Program["accent"], string> = {
  yellow: "bg-primary",
  green: "bg-leaf",
  sky: "bg-sky",
  coral: "bg-coral",
};

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="card-soft zoom-parent overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <img
          src={program.image}
          alt={`${program.name} classroom at The Yellow Banana Preschool`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-bold">
          {program.ageGroup}
        </span>
      </div>
      <div className={cn("h-1.5 w-full", accentBar[program.accent])} />
      <div className="p-6">
        <h3 className="text-xl font-extrabold">{program.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
        <Link
          to="/programs"
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all"
        >
          Learn More <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="card-soft zoom-parent overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img
          src={activity.image}
          alt={`${activity.name} session for children`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="text-2xl" aria-hidden>
          {activity.emoji}
        </span>
        <h3 className="mt-2 text-lg font-extrabold">{activity.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
      </div>
    </article>
  );
}

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="card-soft p-7">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/25 text-2xl" aria-hidden>
        {skill.emoji}
      </span>
      <h3 className="mt-5 text-lg font-extrabold">{skill.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{skill.description}</p>
    </article>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="card-soft flex gap-4 p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-leaf/20 text-xl" aria-hidden>
        {feature.emoji}
      </span>
      <div>
        <h3 className="font-extrabold">{feature.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </article>
  );
}

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <article className="card-soft zoom-parent overflow-hidden">
      <div className="h-44 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-extrabold">{facility.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{facility.description}</p>
      </div>
    </article>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="text-base tracking-wide">
      <span aria-hidden>{"★".repeat(rating)}</span>
      <span aria-hidden className="opacity-25">
        {"★".repeat(Math.max(0, 5 - rating))}
      </span>
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="card-soft flex h-full flex-col p-7">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        “{testimonial.quote}”
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/30 font-extrabold">
          {testimonial.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </footer>
    </article>
  );
}
