import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ActivityType } from "@/lib/questionnaire-types";

interface Props {
  value: ActivityType | null;
  onChange: (value: ActivityType) => void;
  onNext: () => void;
}

export function Step1ActivityType({ value, onChange, onNext }: Props) {
  const options: { value: ActivityType; label: string }[] = [
    { value: "restaurant", label: "Restaurant / Commerce local" },
    { value: "ecommerce", label: "E-commerce / Boutique en ligne" },
    { value: "services", label: "Services / Agence" },
    { value: "saas", label: "SaaS / Application web" },
    { value: "other", label: "Autre" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quel est votre type d&apos;activité ?</h2>
        <p className="mt-2 text-muted-foreground">
          Cela nous aide à vous proposer la solution la plus adaptée.
        </p>
      </div>

      <RadioGroup value={value || ""} onValueChange={onChange}>
        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!value}>
          Continuer
        </Button>
      </div>
    </div>
  );
}