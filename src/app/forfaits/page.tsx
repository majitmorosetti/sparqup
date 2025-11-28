import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Forfaits() {
  return (
    <main className="container flex min-h-[80vh] items-center justify-center">
      <Card className="max-w-2xl p-12 text-center">
        <h1 className="text-3xl font-bold">Tarifs sur-mesure</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chaque projet est unique. Nous adaptons nos tarifs à vos besoins réels,
          sans vous faire payer pour ce dont vous n&apos;avez pas besoin.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/questionnaire">Obtenir mon estimation en 5 questions</Link>
        </Button>
      </Card>
    </main>
  );
}