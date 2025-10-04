import Container from "@/components/shared/Container";

export default function UseCases() {
  const items = [
    {
      title: "E-commerce prêt à vendre",
      desc: "Shopify/Next.js, fiches produits, tunnel clair, paiements Stripe (au besoin).",
    },
    {
      title: "Génération de leads locale",
      desc: "Site vitrine + SEO local + pages services + prise de RDV.",
    },
    {
      title: "Automatisations intelligentes",
      desc: "Leads vers CRM, réponses rapides aux FAQs, reportings hebdo utiles.",
    },
  ];
  return (
    <section className="py-16">
      <Container>
        <h2 className="mb-10 text-2xl font-semibold">Cas d’usage concrets</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border p-6">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
