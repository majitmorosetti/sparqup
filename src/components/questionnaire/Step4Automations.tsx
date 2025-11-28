import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Automations({ value, onChange, onNext, onBack }: Props) {
  const automations = [
    "Emails automatiques (confirmations, relances)",
    "Synchronisation de données (CRM ↔ site)",
    "Facturation automatique",
    "Reporting / Analytics",
    "Aucune pour l'instant",
  ];

  const toggleAutomation = (automation: string) => {
    if (value.includes(automation)) {
      onChange(value.filter((a) => a !== automation));
    } else {
      onChange([...value, automation]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quelles automatisations souhaitez-vous ?</h2>
        <p className="mt-2 text-muted-foreground">
          Les automatisations vous font gagner du temps et réduisent les erreurs.
        </p>
      </div>

      <div className="space-y-3">
        {automations.map((automation) => (
          <div
            key={automation}
            className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer"
            onClick={() => toggleAutomation(automation)}
          >
            <Checkbox
              id={automation}
              checked={value.includes(automation)}
              onCheckedChange={() => toggleAutomation(automation)}
            />
            <Label htmlFor={automation} className="flex-1 cursor-pointer">
              {automation}
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