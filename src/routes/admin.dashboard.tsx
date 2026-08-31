import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
  head: adminHead(
    "Dashboard",
    "Content dashboard for The Yellow Banana Preschool And Activity Club website.",
    "/admin/dashboard",
  ),
});

function Dashboard() {
  const data = useSiteData();

  const stats = [
    { label: "Programs", value: data.programs.length, emoji: "🎓", to: "/admin/programs" },
    { label: "Activities", value: data.activities.length, emoji: "🤸", to: "/admin/activities" },
    { label: "Gallery Images", value: data.gallery.length, emoji: "🖼️", to: "/admin/gallery" },
    { label: "Testimonials", value: data.testimonials.length, emoji: "💬", to: "/admin/testimonials" },
    { label: "Enquiries", value: data.enquiries.length, emoji: "📥", to: "/admin/enquiries" },
  ];

  const newEnquiries = data.enquiries.filter((e) => e.status === "New");

  return (
    <AdminLayout title="Welcome back, Admin" description="Here's what's happening at The Yellow Banana.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-3xl border border-border bg-card p-5 transition-transform hover:-translate-y-1"
          >
            <span className="text-2xl" aria-hidden>
              {s.emoji}
            </span>
            <p className="mt-3 font-display text-3xl font-extrabold">{s.value}</p>
            <p className="text-sm font-semibold text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <section className="rounded-3xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-lg font-extrabold">Latest enquiries</h2>
          {data.enquiries.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {data.enquiries.slice(0, 5).map((e) => (
                <li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3">
                  <span className="font-bold">{e.parentName}</span>
                  <span className="text-sm text-muted-foreground">
                    {e.childName} · {e.program}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">{e.date}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/enquiries"
            className="mt-4 inline-block text-sm font-bold underline-offset-4 hover:underline"
          >
            View all enquiries →
          </Link>
        </section>

        <section className="rounded-3xl bg-secondary p-6 text-secondary-foreground">
          <h2 className="text-lg font-extrabold">Quick status</h2>
          <p className="mt-3 text-sm opacity-85">
            {newEnquiries.length} new enquir{newEnquiries.length === 1 ? "y" : "ies"} awaiting a
            response.
          </p>
          <p className="mt-2 text-sm opacity-85">
            {data.features.length} why-us cards · {data.facilities.length} facilities
          </p>
          <p className="mt-4 text-xs opacity-70">
            All content is stored locally in your browser for this demo.
          </p>
        </section>
      </div>
    </AdminLayout>
  );
}
