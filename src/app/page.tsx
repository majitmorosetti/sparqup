import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
        Le site dont votre entreprise a<br />
        vraiment besoin.
      </h1>
      
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Nous créons des sites et des systèmes qui s&apos;adaptent à vos besoins.
        <br />
        Des outils connectés. Des solutions sur mesure.
      </p>

      <Button size="lg" className="mt-8" asChild>
        <Link href="/questionnaire">
          Simuler mon projet en 5 questions
        </Link>
      </Button>
    </main>
  );
}