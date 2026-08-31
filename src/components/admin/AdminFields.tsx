import type { ReactNode } from "react";

export const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string | undefined;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string | undefined;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className={fieldClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <Field label={label}>
      <textarea
        rows={rows}
        className={fieldClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select className={fieldClass} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "active" || status === "Completed"
      ? "bg-leaf/25"
      : status === "New"
        ? "bg-primary/35"
        : status === "Contacted"
          ? "bg-sky/30"
          : "bg-muted";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${tone}`}>
      {status}
    </span>
  );
}

export function SavedNotice({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p className="rounded-2xl bg-leaf/20 px-4 py-3 text-sm font-semibold">
      ✅ Saved — changes are live on the public website.
    </p>
  );
}
