import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Budget, Timeline } from "@/lib/questionnaire-types";

interface Props {
  budget: Budget | null;
  timeline: Timeline | null;
  email: string;
  onChange: (updates: { budget?: Budget; timeline?: Timeline; email?: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Contact({ budget, timeline, email, onChange, onNext, onBack }: Props) {
  const budgetOptions: { value: Budget; label: string }[] = [
    { value: "less-2k", label: "Moins de 2 000€" },
    { value: "2-5k", label: "2 000 - 5 000€" },
    { value: "5-15k", label: "5 000 - 15 000€" },
    { value: "15k-plus", label: "Plus de 15 000€" },
    { value: "unknown", label: "Je ne sais pas" },
  ];

  const timelineOptions: { value: Timeline; label: string }[] = [
    { value: "urgent", label: "Urgent (< 1 mois)" },
    { value: "normal", label: "Normal (1-3 mois)" },
    { value: "flexible", label: "Flexible" },
  ];

  const isValid = budget && timeline && email.includes("@");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Budget et contact</h2>
        <p className="mt-2 text-muted-foreground">
          Dernière étape pour recevoir votre estimation personnalisée.
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Quel est votre budget estimé ?</Label>
        <RadioGroup value={budget || ""} onValueChange={(v) => onChange({ budget: v as Budget })}>
          <div className="space-y-2">
            {budgetOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                <Label htmlFor={`budget-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Quel est votre délai souhaité ?</Label>
        <RadioGroup
          value={timeline || ""}
          onValueChange={(v) => onChange({ timeline: v as Timeline })}
        >
          <div className="space-y-2">
            {timelineOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`timeline-${option.value}`} />
                <Label htmlFor={`timeline-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          Votre email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Nous vous enverrons l&apos;estimation détaillée par email.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Voir mon estimation
        </Button>
      </div>
    </div>
  );
}