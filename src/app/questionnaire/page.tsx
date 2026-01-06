// src/app/questionnaire/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import QuestionnaireModal from '@/components/questionnaire/QuestionnaireModal';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function QuestionnairePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0); // ← Force re-mount
  const searchParams = useSearchParams();

  // ✅ Détecte preset et auto-open
  useEffect(() => {
    const preset = searchParams.get('preset');
    
    if (preset === 'tech') {
      // Injection preset
      sessionStorage.setItem('questionnaire-preset', JSON.stringify({
        projectType: 'tech',
        branch: 'tech',
        currentStep: 2,
        totalSteps: 4
      }));
      
      // Auto-open modal
      setModalKey(prev => prev + 1);
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleOpenModal = () => {
    sessionStorage.removeItem('questionnaire-preset');
    setModalKey(prev => prev + 1); // ← Incrémente = nouveau state
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-50 py-25 pt-40">
        <Container size="md">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-950 mb-6">
              Simulez votre projet en 5 minutes
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Répondez à quelques questions sur votre projet. 
              Vous recevrez une estimation budgétaire claire et réaliste sous 24h.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenModal}
            >
              Démarrer le questionnaire
            </Button>
          </div>

          {/* Reassurance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-3">✓</div>
              <div className="font-semibold text-neutral-950 mb-1">Gratuit</div>
              <div className="text-sm text-neutral-600">Sans engagement</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-3">⚡</div>
              <div className="font-semibold text-neutral-950 mb-1">5 minutes</div>
              <div className="text-sm text-neutral-600">Estimation rapide</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-neutral-200">
              <div className="text-3xl mb-3">📧</div>
              <div className="font-semibold text-neutral-950 mb-1">24h</div>
              <div className="text-sm text-neutral-600">Réponse garantie</div>
            </div>
          </div>
        </Container>
      </div>

      {/* Modal avec key pour forcer re-mount */}
      <QuestionnaireModal 
        key={modalKey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}