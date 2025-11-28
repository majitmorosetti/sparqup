import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Tools({ value, onChange, onNext, onBack }: Props) {
  const tools = [
    "Paiement (Stripe, PayPal...)",
    "Réservation (TheFork, Zenchef...)",
    "CRM (HubSpot, Salesforce...)",
    "Email marketing (Mailchimp, Brevo...)",
    "Comptabilité (Pennylane, Stripe...)",
    "Calendrier (Google Calendar, Calendly...)",
    "Stockage (Google Drive, Dropbox...)",
    "Aucun / Je ne sais pas",
  ];

  const toggleTool = (tool: string) => {
    if (value.includes(tool)) {
      onChange(value.filter((t) => t !== tool));
    } else {
      onChange([...value, tool]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quels outils souhaitez-vous connecter ?</h2>
        <p className="mt-2 text-muted-foreground">
          Sélectionnez les intégrations dont vous avez besoin.
        </p>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => (
          <div
            key={tool}
            className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer"
            onClick={() => toggleTool(tool)}
          >
            <Checkbox
              id={tool}
              checked={value.includes(tool)}
              onCheckedChange={() => toggleTool(tool)}
            />
            <Label htmlFor={tool} className="flex-1 cursor-pointer">
              {tool}
            </Label>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext}>Continuer</Button>
      </div>
    </div>
  );
}