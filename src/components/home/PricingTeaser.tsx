"use client";

import Link from "next/link";
import Section from "@/components/shared/Section";
import { Card, CardTitle, CardText } from "@/components/shared/Card";

export default function PricingTeaser() {
  const tiers = [
    {
      name: "Essentiel",
      price: "dès 2 k€",
      details: "Wix/Webflow · 2–3 semaines",
      href: "/forfaits",
    },
    {
      name: "Pro",
      price: "5–9 k€",
      details: "Webflow/Shopify/WordPress · 3–6 semaines",
      href: "/forfaits",
    },
    {
      name: "Sur-mesure",
      price: "12–30 k€",
      details: "Next.js/Headless · 6–12 semaines",
      href: "/forfaits",
    },
  ];
  return (
    <Section
      title="Tarifs — points d’entrée"
      subtitle="On ajuste ensuite selon votre périmètre. SEO de base et DNS e-mail inclus."
      variant="frosted"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.name} className="flex flex-col">
            <CardTitle>{t.name}</CardTitle>
            <div className="mt-2 text-2xl font-semibold text-foreground">
              {t.price}
            </div>
            <CardText>{t.details}</CardText>
            <div className="mt-4">
              <Link
                href={t.href}
                className="inline-flex items-center rounded bg-foreground px-3 py-1.5 text-sm text-background hover:opacity-90"
              >
                Voir les détails
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
