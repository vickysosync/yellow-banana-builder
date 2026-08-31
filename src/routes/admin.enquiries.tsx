import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminHead } from "@/components/admin/adminHead";
import { StatusBadge } from "@/components/admin/AdminFields";
import { ConfirmDelete } from "@/components/admin/AdminModal";
import { Button } from "@/components/Button";
import type { Enquiry, EnquiryStatus } from "@/data/mockData";
import { updateSection, useSiteData } from "@/utils/storage";

export const Route = createFileRoute("/admin/enquiries")({
  component: EnquiriesAdmin,
  head: adminHead(
    "Enquiries",
    "Review and manage Book a Visit requests submitted from the website.",
    "/admin/enquiries",
  ),
});

const FILTERS = ["All", "New", "Contacted", "Completed"] as const;
const STATUSES: EnquiryStatus[] = ["New", "Contacted", "Completed"];

function EnquiriesAdmin() {
  const data = useSiteData();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [toDelete, setToDelete] = useState<Enquiry | null>(null);

  const list = data.enquiries.filter((e) => filter === "All" || e.status === filter);

  const setStatus = (id: string, status: EnquiryStatus) =>
    updateSection(
      "enquiries",
      data.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
    );

  const remove = (id: string) =>
    updateSection(
      "enquiries",
      data.enquiries.filter((e) => e.id !== id),
    );

  return (
    <AdminLayout
      title="Enquiries"
      description="Visit requests are stored locally in this browser for the demo."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "All" ? data.enquiries.length : data.enquiries.filter((e) => e.status === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card hover:bg-muted"
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          No enquiries in this view yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {list.map((e) => (
            <article key={e.id} className="rounded-3xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{e.parentName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Child: {e.childName} • {e.childAge} • {e.program}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </div>
              <dl className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                <div>
                  <dt className="inline font-bold">Phone: </dt>
                  <dd className="inline">{e.phone}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">Date: </dt>
                  <dd className="inline">{e.date}</dd>
                </div>
              </dl>
              {e.message ? <p className="mt-2 text-sm text-muted-foreground">“{e.message}”</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <Button
                    key={s}
                    variant={e.status === s ? "primary" : "outline"}
                    onClick={() => setStatus(e.id, s)}
                  >
                    {s}
                  </Button>
                ))}
                <Button variant="danger" onClick={() => setToDelete(e)}>
                  Delete
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {toDelete ? (
        <ConfirmDelete
          label={`enquiry from ${toDelete.parentName}`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            remove(toDelete.id);
            setToDelete(null);
          }}
        />
      ) : null}
    </AdminLayout>
  );
}
