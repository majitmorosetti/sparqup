"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Step1ActivityType } from "@/components/questionnaire/Step1ActivityType";
import { Step2Features } from "@/components/questionnaire/Step2Features";
import { Step3Tools } from "@/components/questionnaire/Step3Tools";
import { Step4Automations } from "@/components/questionnaire/Step4Automations";
import { Step5Contact } from "@/components/questionnaire/Step5Contact";
import { ResultPage } from "@/components/questionnaire/ResultPage";
import type { QuestionnaireData } from "@/lib/questionnaire-types";

export default function QuestionnairePage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    activityType: null,
    features: [],
    tools: [],
    automations: [],
    budget: null,
    timeline: null,
    email: "",
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="container max-w-3xl py-12">
      {step <= totalSteps && (
        <>
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Étape {step} sur {totalSteps}
            </p>
          </div>

          <Card className="p-8">
            {step === 1 && (
              <Step1ActivityType
                value={data.activityType}
                onChange={(activityType) => updateData({ activityType })}
                onNext={nextStep}
              />
            )}

            {step === 2 && (
              <Step2Features
                activityType={data.activityType}
                value={data.features}
                onChange={(features) => updateData({ features })}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 3 && (
              <Step3Tools
                value={data.tools}
                onChange={(tools) => updateData({ tools })}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 4 && (
              <Step4Automations
                value={data.automations}
                onChange={(automations) => updateData({ automations })}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 5 && (
              <Step5Contact
                budget={data.budget}
                timeline={data.timeline}
                email={data.email}
                onChange={(updates) => updateData(updates)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
          </Card>
        </>
      )}

      {step > totalSteps && <ResultPage data={data} onReset={() => setStep(1)} />}
    </div>
  );
}