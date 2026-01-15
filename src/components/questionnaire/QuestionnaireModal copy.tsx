// src/components/questionnaire/QuestionnaireModal.tsx
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, AlertTriangle } from 'lucide-react';
import Q1TypeProject from './questions/Q1TypeProject';
import Q2Features from './questions/Q2Features';
import Q3Assets from './questions/Q3Assets';
import Q4Tools from './questions/Q4Tools';
import Q5TimelineBudget from './questions/Q5TimelineBudget';
import Q6Estimation from './questions/Q6Estimation';
import Q2TechNature from './questions/tech/Q2TechNature';
import Q4TechContact from './questions/tech/Q4TechContact';
import Q2ConseilContact from './questions/conseil/Q2ConseilContact';
import { QuestionnaireState, ProjectType, Branch, Timeline, ContactData, Budget } from '@/lib/questionnaire/types';
import { calculateEstimation } from '@/lib/questionnaire/estimation';
import { submitQuestionnaire } from '@/actions/questionnaire';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { questionnaireSchema } from '@/lib/questionnaire/schema';
import toast from 'react-hot-toast';


type QuestionnaireSubmitData = z.infer<typeof questionnaireSchema>;

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [state, setState] = useState<QuestionnaireState>({
    projectType: null,
    branch: null,
    features: [],
    assets: [],
    tools: [],
    timeline: null,
    budget: null,
    complexityScore: 0,
    contact: null,
    currentStep: 0,
    totalSteps: 6,
    startedAt: new Date()
  });

  // ✅ Charge preset au mount du modal
  useEffect(() => {
    if (!isOpen) return;

    const presetStr = sessionStorage.getItem('questionnaire-preset');
    if (presetStr) {
      try {
        const preset = JSON.parse(presetStr);
        setState(prev => ({
          ...prev,
          ...preset,
          startedAt: new Date()
        }));
        // Nettoie après chargement
        sessionStorage.removeItem('questionnaire-preset');
      } catch (error) {
        console.error('Erreur chargement preset:', error);
      }
    }
  }, [isOpen]);


  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll animé
      });
    }
  }, [state.currentStep]); // ← Se déclenche quand currentStep change

  const handleClose = useCallback(() => {
  if (state.currentStep > 1) {
    setShowConfirmExit(true);
  } else {
    onClose();
  }
  }, [state.currentStep, onClose]);

  const confirmExit = () => {
    setShowConfirmExit(false);
    onClose();
  };

  const cancelExit = () => {
    setShowConfirmExit(false);
  };

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Bloquer scroll du body quand modal ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ============================================
  // Handlers
  // ============================================


  const handleQ1Next = useCallback((projectType: ProjectType, branch: Branch) => {
    setState(prev => ({
      ...prev,
      projectType,
      branch,
      currentStep: 2,
      totalSteps: branch === 'tech' ? 4 : branch === 'conseil' ? 4 : 6
    }));
  }, []);

  const handleQ2FeaturesChange = useCallback((features: string[]) => {
    setState(prev => ({ ...prev, features }));
  }, []);

  const handleTechNatureChange = useCallback((nature: string) => {
  setState(prev => ({ ...prev, techNature: nature }));
}, []);

  const handleQ3AssetsChange = useCallback((assets: string[]) => {
    setState(prev => ({ ...prev, assets }));
  }, []);

  const handleQ4ToolsChange = useCallback((tools: string[]) => {
    setState(prev => ({ ...prev, tools }));
  }, []);

  const handleQ5TimelineChange = useCallback((timeline: Timeline) => {
    setState(prev => ({ ...prev, timeline }));
  }, []);

  const handleQ5BudgetChange = useCallback((budget: Budget) => {
    setState(prev => ({ ...prev, budget }));
    }, []);

  const handleQ6Submit = useCallback(async (contact: ContactData) => {
    setState(prev => ({ ...prev, contact, completedAt: new Date() }));

    try {
      await submitQuestionnaire({
        ...state,
        contact,
        branch: state.branch!
      } as QuestionnaireSubmitData);

      onClose();
      router.push('/questionnaire/confirmation');
    } catch (error) {
      console.error('Erreur submission:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  }, [state, router, onClose]);

  const handleNext = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const handlePrev = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));
  }, []);

  // Navigation avec Enter
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isOpen && state.currentStep > 1 && state.currentStep < 6) {
        const isValid = 
          (state.currentStep === 2 && state.features.length > 0) ||
          (state.currentStep === 5 && state.timeline && state.budget) ||
          (state.currentStep === 3 || state.currentStep === 4);
        
        if (isValid) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [isOpen, state.currentStep, state.features, state.timeline, state.budget, handleNext]);

  const estimation = state.currentStep === 6 && state.projectType
    ? calculateEstimation(state)
    : null;

  if (!isOpen) return null;

  // ============================================
// Validation
// ============================================

const isStepValid = () => {
  // TPE
  if (state.branch === 'tpe') {
    switch (state.currentStep) {
      case 1:
        return state.projectType !== null;
      case 2:
        return state.features.length > 0;
      case 3:
        return state.assets.length > 0; 
      case 4:
        return state.tools.length > 0; 
      case 5:
        return state.timeline !== null && state.budget !== null;
      case 6:
        return false; // Pas de bouton Next (form gère submit)
      default:
        return true;
    }
  }
  
  // Tech
  if (state.branch === 'tech') {
    switch (state.currentStep) {
      case 1:
        return state.projectType !== null;
      case 2:
        return state.techNature !== undefined && state.techNature !== null;
      case 3:
        return state.timeline !== null && state.budget !== null;
      case 4:
        return false; // Pas de bouton Next (form gère submit)
      default:
        return true;
    }
  }
  
  // Conseil
  if (state.branch === 'conseil') {
    switch (state.currentStep) {
      case 1:
        return state.projectType !== null;
      case 2:
        return false; // Pas de bouton Next (form gère submit)
      default:
        return true;
    }
  }
  
  return true;
};

  return (
  <>
      {/* Overlay - Click = ferme */}
      <div 
        className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50"
        onClick={handleClose} // ← Click overlay = ferme
      />

      {/* Container centré - NO pointer events */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        
        {/* Modal - pointer-events-auto + stopPropagation */}
        <div 
          className="w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
          onClick={(e) => e.stopPropagation()} // ← GARDE ÇA
        >
        {/* Header avec progress + close */}
        <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
          <div className="h-1 bg-neutral-200">
            <div 
              className="h-full bg-neutral-900 transition-all duration-500"
              style={{ width: `${(state.currentStep / state.totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="text-sm text-neutral-600">
              Étape {state.currentStep}/{state.totalSteps}
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Content scrollable */}
        <div
        ref={contentRef}
         className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 sm:px-12 py-8">
          {/* Q1 - Type de projet (TOUTES branches) */}
          {state.currentStep === 1 && (
            <Q1TypeProject
              value={state.projectType}
              onNext={handleQ1Next}
            />
          )}

          {/* ========== BRANCH TPE ========== */}
          {state.currentStep === 2 && state.branch === 'tpe' && state.projectType && (
            <Q2Features
              value={state.features}
              onChange={handleQ2FeaturesChange}
              projectType={state.projectType}
            />
          )}

          {state.currentStep === 3 && state.branch === 'tpe' && (
            <Q3Assets
              value={state.assets}
              onChange={handleQ3AssetsChange}
            />
          )}

          {state.currentStep === 4 && state.branch === 'tpe' && (
            <Q4Tools
              value={state.tools}
              onChange={handleQ4ToolsChange}
            />
          )}

          {state.currentStep === 5 && state.branch === 'tpe' && (
            <Q5TimelineBudget
              timeline={state.timeline}
              budget={state.budget}
              onTimelineChange={handleQ5TimelineChange}
              onBudgetChange={handleQ5BudgetChange}
              budgetType="tpe"
            />
          )}

          {state.currentStep === 6 && state.branch === 'tpe' && estimation && (
            <Q6Estimation
              estimation={estimation}
              onSubmit={handleQ6Submit}
            />
          )}

          {/* ========== BRANCH TECH ========== */}
          {state.currentStep === 2 && state.branch === 'tech' && (
            <Q2TechNature
                value={state.techNature || null}
                onChange={handleTechNatureChange} // ← Stable reference
            />
            )}

          {state.currentStep === 3 && state.branch === 'tech' && (
            <Q5TimelineBudget
              timeline={state.timeline}
              budget={state.budget}
              onTimelineChange={handleQ5TimelineChange}
              onBudgetChange={handleQ5BudgetChange}
              budgetType="tech"
            />
          )}

          {state.currentStep === 4 && state.branch === 'tech' && (
            <Q4TechContact onSubmit={handleQ6Submit} />
          )}

          {/* ========== BRANCH CONSEIL ========== */}
          {state.currentStep === 2 && state.branch === 'conseil' && (
            <Q2ConseilContact
              objectives={state.conseilObjectives || []}
              onObjectivesChange={(obj) => setState(prev => ({ ...prev, conseilObjectives: obj }))}
              onSubmit={handleQ6Submit}
            />
          )}
        </div>

        {/* Footer - Caché sur pages avec form */}
        {state.currentStep > 1 && 
         !((state.branch === 'conseil' && state.currentStep === 2) ||
           (state.branch === 'tpe' && state.currentStep === 6) ||
           (state.branch === 'tech' && state.currentStep === 4)) && (
          <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                ← Retour
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={cn(
                  "px-6 py-2 rounded-lg font-medium transition-all",
                  "bg-neutral-900 text-white hover:bg-neutral-800",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                Continuer →
              </button>
            </div>

            {isStepValid() && (
              <div className="mt-3 text-center">
                <span className="text-xs text-neutral-400">
                  Appuyez sur <kbd className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 font-mono">Enter ↵</kbd>
                </span>
              </div>
            )}
          </div>
        )}
        {/* ✅ Modal de confirmation (overlay par-dessus) */}
      {showConfirmExit && (
        <>
          {/* Overlay confirmation (z-index supérieur) */}
          <div 
            className="fixed inset-0 bg-black/60 z-[60] animate-in fade-in duration-200"
            onClick={cancelExit}
          />

          {/* Modal confirmation */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 mb-1">
                    Quitter le questionnaire ?
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Votre progression sera perdue. Vous devrez recommencer depuis le début.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelExit}
                  className="flex-1 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-lg transition-colors"
                >
                  Continuer
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Quitter
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  </>
);
}