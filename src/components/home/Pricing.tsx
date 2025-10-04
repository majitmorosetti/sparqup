import Container from "@/components/shared/Container";

const tiers = [
  {
    name: "Essentiel",
    price: "à partir de 1 490€",
    points: [
      "Site vitrine WordPress / Wix / Squarespace",
      "Design propre + mobile",
      "Mise en ligne rapide (1–2 semaines)",
      "SEO de base, pages légales",
    ],
  },
  {
    name: "Avancé",
    price: "à partir de 3 900€",
    points: [
      "Site sur-mesure Next.js (perf & SEO)",
      "Intégrations (CRM, paiement, etc.)",
      "UX/UI moderne + animations légères",
      "Base analytics & A/B testing",
    ],
  },
  {
    name: "Digitalisation complète",
    price: "sur devis",
    points: [
      "Site + SEO + UX/UI + contenu",
      "Automatisations (outils intelligents)",
      "Pilotage (reportings clairs)",
      "Formation & accompagnement",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="mb-10 text-2xl font-semibold">Forfaits clairs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{t.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
