import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <main className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">Nous contacter</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Une question ? Un projet ? Parlons-en.
        </p>

        <Card className="mt-8 p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" placeholder="Votre nom" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} placeholder="Décrivez votre projet..." />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Envoyer
            </Button>
          </form>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Ou préférez-vous simuler votre projet directement ?</p>
          <Button variant="link" asChild>
            <a href="/questionnaire">Accéder au questionnaire →</a>
          </Button>
        </div>
      </div>
    </main>
  );
}