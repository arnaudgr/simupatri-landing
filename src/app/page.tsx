"use client";

import { useState, FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

function EmailForm({ id, variant = "light" }: { id?: string; variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "beta-signups"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-accent-green font-semibold text-lg">
        Merci ! Vous serez parmi les premiers informes du lancement.
      </p>
    );
  }

  const inputClass =
    variant === "dark"
      ? "flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent text-base"
      : "flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-base shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md" id={id}>
      <input
        type="email"
        required
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-accent-green hover:bg-accent-green-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-md"
      >
        {status === "loading" ? "..." : "Rejoindre la beta"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm sm:col-span-2">Une erreur est survenue. Reessayez.</p>
      )}
    </form>
  );
}

const problems = [
  {
    icon: (
      <svg className="w-8 h-8 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    title: "Des vendeurs, pas des conseillers",
    description:
      "Banquiers, agents immobiliers, CGP en conflit d'interets... Chacun pousse son produit sans vous montrer les alternatives.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: "Trop de variables, zero visibilite",
    description:
      "TMI, prelevement sociaux, amortissement, plus-value... Impossible de comparer LMNP, SCPI et location nue sur un pied d'egalite.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
    title: "Des tableurs incomprehensibles",
    description:
      "Les rares outils existants sont soit trop simplistes (sans fiscalite reelle), soit des usines a gaz reservees aux experts.",
  },
];

const steps = [
  {
    number: "1",
    title: "Decrivez votre situation",
    description: "Revenus, situation familiale, tranche marginale d'imposition... En quelques clics.",
  },
  {
    number: "2",
    title: "Configurez vos scenarios",
    description: "LMNP reel, LMNP micro-BIC, SCPI, location nue... Comparez ce que vous voulez.",
  },
  {
    number: "3",
    title: "Obtenez les vrais chiffres",
    description: "Rendement net apres impots, cash-flow mensuel, TRI sur 20 ans. Sans angle mort.",
  },
];

const advantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    text: "Calculs fiscaux reels (IR, PS, CSG...)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    text: "Comparaison multi-scenarios cote a cote",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    text: "100% independant, aucun produit a vendre",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21 5.995 9.532 10.5 6.75l1.5 3 1.5-3 4.505 2.782L13.5 21h-3Z" />
      </svg>
    ),
    text: "Interface claire, pensee pour les non-experts",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-white">
            Simu<span className="text-accent-green">patri</span>
          </span>
          <a
            href="#cta"
            className="hidden sm:inline-block px-5 py-2 bg-accent-green hover:bg-accent-green-dark text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
          >
            Rejoindre la beta
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-primary via-primary-light to-slate-50">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium">
            Beta a venir
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Investissement immobilier&nbsp;:
            <br />
            <span className="text-accent-green">comparez enfin</span> sans biais
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            LMNP, SCPI, location nue... Simupatri calcule votre rendement net reel apres impots, avec la vraie fiscalite francaise. Aucun produit a vendre, juste les chiffres.
          </p>
          <div className="flex justify-center">
            <EmailForm id="hero-form" variant="dark" />
          </div>
          <p className="mt-4 text-sm text-white/50">
            Gratuit. Pas de spam. Desinscription en un clic.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Le probleme avec l&apos;investissement immo aujourd&apos;hui
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Vous cherchez a investir, mais personne ne vous donne une comparaison objective.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-secondary-light/40 rounded-2xl p-8 hover:border-secondary transition-colors shadow-sm hover:shadow-md"
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Simupatri : votre <span className="text-accent-green">tiers de confiance</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Un outil independant qui fait les calculs que votre banquier ne fera jamais pour vous.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {advantages.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white border border-secondary-light/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-secondary shrink-0 mt-0.5">{a.icon}</div>
                <p className="text-slate-600 font-medium">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Comment ca marche</h2>
            <p className="text-slate-500 text-lg">Trois etapes. Pas de jargon. Des resultats clairs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.number} className="text-center">
                <div className="w-14 h-14 bg-secondary/10 border border-secondary/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span className="text-secondary text-2xl font-bold">{s.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
            Pret a investir en toute clarte ?
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            Inscrivez-vous pour etre parmi les premiers a tester Simupatri des son lancement.
          </p>
          <div className="flex justify-center">
            <EmailForm id="cta-form" variant="light" />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Gratuit. Pas de spam. Desinscription en un clic.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6 bg-primary">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span>
            &copy; {new Date().getFullYear()} Simupatri. Tous droits reserves.
          </span>
          <span>
            Fait avec rigueur pour les investisseurs francais.
          </span>
        </div>
      </footer>
    </main>
  );
}
