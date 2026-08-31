import { useState } from "react";
import { Button } from "@/components/Button";
import { AdminModal, ConfirmDelete } from "@/components/admin/AdminModal";
import { SelectField, StatusBadge, TextArea, TextField } from "@/components/admin/AdminFields";
import { uid } from "@/utils/storage";

export interface CrudField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  hint?: string;
  /** hide from the table, show only in the edit form */
  formOnly?: boolean;
}

export interface CrudConfig<T> {
  fields: CrudField[];
  /** label used in the table's first column + delete confirmation */
  titleKey: keyof T & string;
  blank: () => T;
  /** show a status toggle column (requires a `status` field on the item) */
  toggle?: boolean;
}

type Row = { id: string };
const get = (o: unknown, k: string) => (o as Record<string, unknown>)[k];

export function AdminCrud<T extends Row>({
  items,
  onChange,
  config,
  addLabel = "Add item",
  emptyLabel = "Nothing here yet. Add your first item to get started.",
}: {
  items: T[];
  onChange: (next: T[]) => void;
  config: CrudConfig<T>;
  addLabel?: string;
  emptyLabel?: string;
}) {
  const [draft, setDraft] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);

  const columns = config.fields.filter((f) => !f.formOnly).slice(0, 3);

  const openNew = () => {
    setDraft({ ...config.blank(), id: uid() } as T);
    setIsNew(true);
  };

  const save = () => {
    if (!draft) return;
    onChange(isNew ? [...items, draft] : items.map((i) => (i.id === draft.id ? draft : i)));
    setDraft(null);
  };

  const setField = (key: string, value: string) =>
    setDraft((d) => (d ? ({ ...d, [key]: value } as T) : d));

  const toggleStatus = (item: T) =>
    onChange(
      items.map((i) =>
        i.id === item.id ? ({ ...i, status: get(i, "status") === "active" ? "inactive" : "active" } as T) : i,
      ),
    );

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
        <Button onClick={openNew}>+ {addLabel}</Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">{emptyLabel}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-5 py-3 font-bold">
                    {c.label}
                  </th>
                ))}
                {config.toggle ? <th className="px-5 py-3 font-bold">Status</th> : null}
                <th className="px-5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border align-top">
                  {columns.map((c) => (
                    <td key={c.key} className="max-w-[22rem] px-5 py-4">
                      <span className="line-clamp-2">{String(get(item, c.key) ?? "—")}</span>
                    </td>
                  ))}
                  {config.toggle ? (
                    <td className="px-5 py-4">
                      <button type="button" onClick={() => toggleStatus(item)}>
                        <StatusBadge status={String(get(item, "status"))} />
                      </button>
                    </td>
                  ) : null}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setDraft(item);
                          setIsNew(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => setPendingDelete(item)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {draft ? (
        <AdminModal
          title={isNew ? addLabel : `Edit ${String(get(draft, config.titleKey) ?? "item")}`}
          onClose={() => setDraft(null)}
          footer={
            <>
              <Button variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button onClick={save}>Save</Button>
            </>
          }
        >
          <div className="grid gap-4">
            {config.fields.map((f) => {
              const value = String(get(draft, f.key) ?? "");
              if (f.type === "textarea")
                return (
                  <TextArea
                    key={f.key}
                    label={f.label}
                    value={value}
                    onChange={(v) => setField(f.key, v)}
                  />
                );
              if (f.type === "select")
                return (
                  <SelectField
                    key={f.key}
                    label={f.label}
                    value={value}
                    options={f.options ?? []}
                    onChange={(v) => setField(f.key, v)}
                  />
                );
              return (
                <TextField
                  key={f.key}
                  label={f.label}
                  value={value}
                  hint={f.hint}
                  onChange={(v) => setField(f.key, v)}
                />
              );
            })}
          </div>
        </AdminModal>
      ) : null}

      {pendingDelete ? (
        <ConfirmDelete
          label={String(get(pendingDelete, config.titleKey) ?? "this item")}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            onChange(items.filter((i) => i.id !== pendingDelete.id));
            setPendingDelete(null);
          }}
        />
      ) : null}
    </section>
  );
}
