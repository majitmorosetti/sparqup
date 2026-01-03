// src/components/questionnaire/QuestionCard.tsx
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tip?: string;
  tipType?: 'info' | 'warning' | 'error';
  className?: string;
}

export default function QuestionCard({
  title,
  subtitle,
  children,
  tip,
  tipType = 'info',
  className
}: QuestionCardProps) {
  const tipStyles = {
    info: 'bg-blue-50/50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50/50 border-amber-200 text-amber-800',
    error: 'bg-red-50/50 border-red-200 text-red-800'
  };

  return (
    <div className={cn("w-full animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      {/* Header - Très grande typo style Tally */}
      <div className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-neutral-950 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg sm:text-xl text-neutral-600 font-light">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Tip - Plus discret */}
      {tip && (
        <div className={cn(
          "mt-8 p-4 rounded-xl border backdrop-blur-sm",
          tipStyles[tipType]
        )}>
          <p className="text-sm font-medium">
            {tipType === 'warning' && '⚠️ '}
            {tipType === 'error' && '❌ '}
            {tipType === 'info' && '💡 '}
            {tip}
          </p>
        </div>
      )}
    </div>
  );
}