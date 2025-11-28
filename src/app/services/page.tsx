import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Création de sites web",
      description: "Sites vitrines, e-commerce, applications web sur-mesure.",
    },
    {
      title: "Automatisation",
      description: "Gagnez du temps avec des process automatisés et connectés.",
    },
    {
      title: "Connexion d'outils",
      description: "Intégration CRM, paiement, calendrier, email marketing...",
    },
    {
      title: "Digitalisation",
      description: "Transformation digitale complète de votre activité.",
    },
  ];

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold">Nos services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Des solutions digitales adaptées à votre entreprise.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="p-6">
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/questionnaire">Simuler mon projet</Link>
        </Button>
      </div>
    </main>
  );
}