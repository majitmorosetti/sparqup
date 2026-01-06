// src/app/questionnaire/page.tsx
'use client';

import { Suspense } from 'react';
import QuestionnairePageContent from './QuestionnairePageContent';

export default function QuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Chargement...</p>
        </div>
      </div>
    }>
      <QuestionnairePageContent />
    </Suspense>
  );
}