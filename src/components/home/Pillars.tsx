"use client";

import Section from "@/components/shared/Section";
import { Card, CardTitle, CardText } from "@/components/shared/Card";

export default function Pillars() {
  const items = [
    {
      t: "Site prêt à vendre",
      d: "Wix/Webflow/Shopify/WordPress/Next.js : on choisit selon budget, délais, complexité.",
    },
    {
      t: "SEO de base inclus",
      d: "Meta/Hn, sitemap, robots, redirections, perf initiale.",
    },
    {
      t: "Outils branchés",
      d: "DNS e-mail (SPF/DKIM/DMARC), formulaires → email/CRM, analytics.",
    },
    {
      t: "Automatisations utiles",
      d: "Du lead au devis, sans copier-coller inutile.",
    },
  ];
  return (
    <Section
      title="Ce que vous obtenez"
      subtitle="Des livrables concrets, pas du blabla technique."
      variant="solid" /* ou "frosted" si tu veux */
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.t}>
            <CardTitle>{it.t}</CardTitle>
            <CardText>{it.d}</CardText>
          </Card>
        ))}
      </div>
    </Section>
  );
}
