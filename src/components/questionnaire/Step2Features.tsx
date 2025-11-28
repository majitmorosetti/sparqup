import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ActivityType } from "@/lib/questionnaire-types";

interface Props {
  activityType: ActivityType | null;
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Features({ activityType, value, onChange, onNext, onBack }: Props) {
  const featuresByType: Record<string, string[]> = {
    restaurant: [
      "Menu en ligne",
      "Réservation en ligne",
      "Click & Collect / Livraison",
      "Carte interactive",
      "Multilingue",
    ],
    ecommerce: [
      "< 50 produits",
      "50-500 produits",
      "500+ produits",
      "Paiement en ligne",
      "Gestion stock",
      "Multi-vendeurs",
      "Abonnements",
    ],
    services: [
      "Blog / Actualités",
      "Prise de RDV en ligne",
      "Formulaires avancés",
      "Espace client",
      "Portfolio / Réalisations",
      "Multilingue",
    ],
    saas: [
      "Authentification utilisateurs",
      "Dashboard / Tableau de bord",
      "API / Webhooks",
      "Paiements récurrents",
      "Analytics / Reporting",
      "Notifications temps réel",
    ],
    other: [
      "Site vitrine simple",
      "Blog",
      "E-commerce",
      "Espace membre",
      "Formulaires",
      "Autre",
    ],
  };

  const features = featuresByType[activityType || "other"] || featuresByType.other;

  const toggleFeature = (feature: string) => {
    if (value.includes(feature)) {
      onChange(value.filter((f) => f !== feature));
    } else {
      onChange([...value, feature]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quelles fonctionnalités souhaitez-vous ?</h2>
        <p className="mt-2 text-muted-foreground">Sélectionnez toutes celles qui vous intéressent.</p>
      </div>

      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer"
            onClick={() => toggleFeature(feature)}
          >
            <Checkbox
              id={feature}
              checked={value.includes(feature)}
              onCheckedChange={() => toggleFeature(feature)}
            />
            <Label htmlFor={feature} className="flex-1 cursor-pointer">
              {feature}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={value.length === 0}>
          Continuer
        </Button>
      </div>
    </div>
  );
}