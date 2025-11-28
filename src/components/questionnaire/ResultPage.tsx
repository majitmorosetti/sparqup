import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateRecommendation } from "@/lib/questionnaire-logic";
import type { QuestionnaireData } from "@/lib/questionnaire-types";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  data: QuestionnaireData;
  onReset: () => void;
}

export function ResultPage({ data, onReset }: Props) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const recommendation = generateRecommendation(data);

  const handleSendEmail = async () => {
    setSending(true);
    try {
      const response = await fetch("/api/send-estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, recommendation }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-3xl font-bold">Votre estimation personnalisée</h1>
        <p className="mt-2 text-muted-foreground">
          Basée sur vos besoins, voici notre recommandation.
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          {/* Stack */}
          <div>
            <h2 className="text-xl font-semibold">Stack technique recommandée</h2>
            <p className="mt-2 text-2xl font-bold text-primary">{recommendation.stack}</p>
          </div>

          {/* Prix et timeline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Tarif estimé</p>
              <p className="text-xl font-semibold">{recommendation.price}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Délai de réalisation</p>
              <p className="text-xl font-semibold">{recommendation.timeline}</p>
            </div>
          </div>

          {/* Justification */}
          <div>
            <h3 className="font-semibold">Pourquoi cette solution ?</h3>
            <p className="mt-2 text-muted-foreground">{recommendation.justification}</p>
          </div>

          {/* Inclus */}
          <div>
            <h3 className="font-semibold">Ce qui est inclus</h3>
            <ul className="mt-2 space-y-1">
              {recommendation.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative */}
          {recommendation.alternative && (
            <div className="rounded-lg border-2 border-dashed p-4">
              <h3 className="font-semibold">💡 Alternative</h3>
              <p className="mt-2 font-medium">{recommendation.alternative.stack}</p>
              <p className="text-sm text-muted-foreground">{recommendation.alternative.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {recommendation.alternative.reason}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 space-y-3">
          {!sent ? (
            <Button className="w-full" size="lg" onClick={handleSendEmail} disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Recevoir l'estimation par email"
              )}
            </Button>
          ) : (
            <div className="rounded-lg bg-green-50 p-4 text-center text-green-800">
              ✓ Email envoyé à {data.email}
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={onReset}>
            Refaire une simulation
          </Button>
        </div>
      </Card>
    </div>
  );
}