import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-primary/15 py-16 sm:py-20">
      <span className="blob -left-16 top-0 h-52 w-52 bg-leaf/20" />
      <span className="blob -right-10 bottom-0 h-44 w-44 bg-sky/25" />
      <div className="container-page relative text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}
