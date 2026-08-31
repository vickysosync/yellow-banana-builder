import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { fieldClass } from "@/components/admin/AdminFields";
import { DEMO_CREDENTIALS, isLoggedIn, login } from "@/utils/storage";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
  head: () => ({
    meta: [
      { title: "Admin Portal | The Yellow Banana Preschool" },
      { name: "description", content: "Admin portal sign-in for The Yellow Banana Preschool And Activity Club website content manager." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Portal | The Yellow Banana Preschool" },
      { property: "og:description", content: "Admin portal sign-in for The Yellow Banana Preschool And Activity Club." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin/login" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/admin/login" }],
  }),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setBusy(true);
    // Demo-only auth. Replace with a real auth provider later.
    window.setTimeout(() => {
      if (login(email, password)) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError("Invalid credentials. Try the demo login shown below.");
        setBusy(false);
      }
    }, 350);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-xl">🍌</span>
          <span className="font-display text-lg font-extrabold">The Yellow Banana</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
          <h1 className="text-center font-display text-2xl font-extrabold">Admin Portal</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sign in to manage website content.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <label className="block">
              <span className="text-sm font-bold">Email</span>
              <input
                type="email"
                autoComplete="username"
                className={fieldClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@theyellowbanana.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                className={fieldClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error ? (
              <p role="alert" className="rounded-2xl bg-destructive/15 px-4 py-3 text-sm font-semibold">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 rounded-2xl bg-muted/70 px-4 py-3 text-xs text-muted-foreground">
            <p className="font-bold text-foreground">Demo credentials</p>
            <p className="mt-1">Email: {DEMO_CREDENTIALS.email}</p>
            <p>Password: {DEMO_CREDENTIALS.password}</p>
            <p className="mt-2">
              Frontend-only demo authentication — not production-secure.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="font-semibold underline-offset-4 hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
