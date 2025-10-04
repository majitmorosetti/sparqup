"use client";

import { ReactNode } from "react";

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  /** apparence du conteneur */
  variant?: "solid" | "frosted" | "plain";
  /** réduire un peu les paddings */
  dense?: boolean;
  /** étendre à la largeur pleine (utile pour une grid full-bleed) */
  bleed?: boolean;
  className?: string;
};

export default function Section({
  id,
  title,
  subtitle,
  actions,
  children,
  variant = "solid",
  dense = false,
  bleed = false,
  className = "",
}: Props) {
  const base = [
    "rounded-2xl",
    "ring-1 ring-border",
    variant === "solid" && "bg-surface-1",
    variant === "frosted" &&
      "backdrop-blur-xl backdrop-saturate-150 bg-surface-1/70 supports-[backdrop-filter]:bg-surface-1/40",
    variant === "plain" && "bg-transparent ring-transparent",
    dense ? "px-4 py-5 md:px-5 md:py-6" : "px-6 py-8 md:px-8 md:py-10",
    "shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={`py-8 md:py-12`}>
      <div
        className={`${bleed ? "max-w-none px-0" : "mx-auto max-w-6xl px-4 md:px-6"}`}
      >
        <div className={base}>
          {(title || subtitle || actions) && (
            <header className="mb-5 flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-1 text-sm md:text-base text-muted">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions ? <div className="shrink-0">{actions}</div> : null}
            </header>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
