// src/lib/showcases.ts
import type { ShowcaseData } from "@/types/proof-data";

export const showcases: ShowcaseData[] = [
  {
    name: "faceplastie.com",
    url: "https://faceplastie.com",
    screenshot: { provider: "mshots", width: 640 },
    metrics: [
      { label: "Lighthouse (mobile)", value: "92", icon: "gauge" },
      { label: "Desktop", value: "99", icon: "gauge" },
      { label: "LCP", value: "1.8s", icon: "timer" },
      { label: "CLS", value: "0.01", icon: "activity" },
    ],
    extras: [{ label: "Étude de cas", href: "/portfolio" }],
  },
  {
    name: "Chez Joon — Restaurant",
    screenshot: {
      width: 480,
      placeholder: {
        kind: "gradient",
        colors: ["#dc2626", "#f97316"], // rouge/orange “gochujang/kimchi”
        label: "Chez Joon",
        emoji: "🥢",
      },
    },
    metrics: [
      { label: "Lighthouse (mobile)", value: "à venir", pending: true },
      { label: "Desktop", value: "à venir", pending: true },
      { label: "LCP cible", value: "≤ 2.2s", pending: true },
      { label: "CLS cible", value: "≤ 0.02", pending: true },
    ],
    extras: [{ label: "Concept & maquette", href: "/portfolio#chez-joon" }],
  },
];
