import { useState } from "react";
import { Button } from "@/components/Button";
import { getData, setData, uid, useSiteData } from "@/utils/storage";

const empty = {
  parentName: "",
  childName: "",
  childAge: "",
  phone: "",
  program: "",
  message: "",
};

export function ContactForm() {
  const { programs } = useSiteData();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  const activePrograms = programs.filter((p) => p.status === "active");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.parentName.trim()) e.parentName = "Please enter your name.";
    if (!form.childName.trim()) e.childName = "Please enter your child's name.";
    if (!form.childAge.trim()) e.childAge = "Please enter your child's age.";
    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!form.program) e.program = "Please choose a program.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("saving");
    // Demo only: stored locally, nothing is sent anywhere.
    window.setTimeout(() => {
      setData((d) => ({
        ...d,
        enquiries: [
          {
            id: uid(),
            ...form,
            date: new Date().toISOString().slice(0, 10),
            status: "New" as const,
          },
          ...getData().enquiries,
        ],
      }));
      setForm(empty);
      setStatus("done");
    }, 500);
  }

  const field =
    "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  if (status === "done") {
    return (
      <div className="card-soft p-10 text-center">
        <span className="text-4xl" aria-hidden>
          🎉
        </span>
        <h3 className="mt-4 text-2xl font-extrabold">Thank you!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your visit request has been received for this demo. Our team will reach out shortly.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card-soft p-6 sm:p-8">
      <h3 className="text-2xl font-extrabold">Book a Visit</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Tell us about your little one and we'll arrange a warm walkthrough.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="text-sm font-bold">
            Parent Name
          </label>
          <input
            id="parentName"
            className={field}
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
          />
          {errors.parentName ? (
            <p className="mt-1 text-xs text-destructive">{errors.parentName}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="childName" className="text-sm font-bold">
            Child Name
          </label>
          <input
            id="childName"
            className={field}
            value={form.childName}
            onChange={(e) => setForm({ ...form, childName: e.target.value })}
          />
          {errors.childName ? (
            <p className="mt-1 text-xs text-destructive">{errors.childName}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="childAge" className="text-sm font-bold">
            Child Age
          </label>
          <input
            id="childAge"
            className={field}
            placeholder="e.g. 3 years"
            value={form.childAge}
            onChange={(e) => setForm({ ...form, childAge: e.target.value })}
          />
          {errors.childAge ? (
            <p className="mt-1 text-xs text-destructive">{errors.childAge}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-bold">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="program" className="text-sm font-bold">
            Preferred Program
          </label>
          <select
            id="program"
            className={field}
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
          >
            <option value="">Select a program</option>
            {activePrograms.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.ageGroup})
              </option>
            ))}
            <option value="Activity Club">Activity Club</option>
            <option value="Tuition Support">Tuition Support</option>
          </select>
          {errors.program ? (
            <p className="mt-1 text-xs text-destructive">{errors.program}</p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-bold">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={field}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "saving"}>
        {status === "saving" ? "Sending…" : "Request a Visit"}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Demo form — requests are saved locally in your browser only.
      </p>
    </form>
  );
}
