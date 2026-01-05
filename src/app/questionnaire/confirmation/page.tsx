// src/app/questionnaire/confirmation/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 py-40">
      <Container size="md">
        <div className="text-center">
          {/* Checkmark */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-950 mb-4">
              Merci ! Votre demande a bien été envoyée
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Vous allez recevoir un email de confirmation dans quelques minutes.
              <br />
              Je vais étudier votre projet et vous envoyer une estimation détaillée sous 24h (jours ouvrés).
            </p>
          </div>

          {/* Prochaines étapes */}
          <div className="bg-white p-8 rounded-2xl border-2 border-neutral-200 mb-8 text-left">
            <h2 className="text-2xl font-bold text-neutral-950 mb-6 text-center">Prochaines étapes</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold text-neutral-950">Email de confirmation immédiat</h3>
                  <p className="text-sm text-neutral-600">Récapitulatif de votre demande</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold text-neutral-950">Étude de votre projet (sous 24h)</h3>
                  <p className="text-sm text-neutral-600">Analyse détaillée de vos besoins</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold text-neutral-950">Estimation personnalisée par email</h3>
                  <p className="text-sm text-neutral-600">Budget, timeline, stack recommandée</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h3 className="font-bold text-neutral-950">Appel d&apos;audit gratuit (30 min)</h3>
                  <p className="text-sm text-neutral-600">On affine ensemble si besoin</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/questionnaire')}
            >
              Refaire une simulation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/')}
            >
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}