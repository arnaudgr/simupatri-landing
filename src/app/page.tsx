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
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Vous voulez du rendement, pas un second metier",
    description:
      "Gestion locative, travaux, impayés, vacance... L'immobilier classique demande un temps et une énergie que vous n'avez pas forcement.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: "SCPI ou cle en main : impossible de comparer",
    description:
      "SCPI europeennes sans prelevements sociaux ou immobilier delegue type Ouiker ? Personne ne vous montre la comparaison nette d'impots.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18v-.008Zm-12 0h.008v.008H6v-.008Z" />
      </svg>
    ),
    title: "Les chiffres qu'on vous donne sont faux",
    description:
      "Rendements bruts, fiscalite ignoree, prelevements sociaux oublies... Les estimations classiques surestiment votre gain reel de 30 a 40%.",
  },
];

const steps = [
  {
    number: "1",
    title: "Decrivez votre profil fiscal",
    description: "TMI, quotient familial, revenus fonciers existants... On part de votre situation reelle.",
  },
  {
    number: "2",
    title: "Comparez vos options",
    description: "SCPI europeennes, SCPI francaises, immobilier cle en main delegue... Cote a cote, sans biais.",
  },
  {
    number: "3",
    title: "Obtenez le vrai rendement net",
    description: "Apres IR, prelevements sociaux, frais de gestion. Le chiffre qui compte vraiment pour decider.",
  },
];

const advantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    text: "SCPI europeennes : 0% de prelevements sociaux (vs 17.2%)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
    text: "Fiscalite reelle : TMI, quotient familial, PS au centime pres",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    text: "100% neutre : on ne vend ni SCPI ni immobilier",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    text: "Concu pour ceux qui veulent investir sans gerer",
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
            Investir dans l&apos;immobilier sans les galeres&nbsp;:
            <br />
            <span className="text-accent-green">SCPI ou cle en main&nbsp;?</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Le premier comparateur qui calcule votre vrai rendement net, avec la fiscalite francaise complete.
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
              Pourquoi c&apos;est si dur de choisir
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Vous voulez faire travailler votre argent dans l&apos;immobilier, sans que ca devienne un travail a plein temps.
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
              SCPI europeennes ou immobilier delegue&nbsp;:
              <br />
              <span className="text-accent-green">decouvrez ce qui rapporte vraiment</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Simupatri compare vos options d&apos;investissement passif avec la vraie fiscalite. Pas d&apos;estimation, pas de produit a vendre.
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
            Pret a savoir ce qui rapporte vraiment&nbsp;?
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            Inscrivez-vous pour acceder en avant-premiere au comparateur et faire vos propres simulations.
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
