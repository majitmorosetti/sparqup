// src/components/home/proof/types.ts
import type {
  ScreenshotData, // alias pour ne pas dupliquer
} from "@/types/proof-data";

export type Metric = {
  label: string;
  value: string;
  pending?: boolean;
  icon?: "gauge" | "timer" | "activity" | "external-link";
};

// On réutilise la forme data pour le screenshot/placeholder
export type ScreenshotConfig = ScreenshotData;

export type Slide = {
  site: { name: string; url?: string };
  screenshot?: ScreenshotConfig;
  metrics: Metric[];
  extras?: { label: string; href?: string }[];
};

export type BandLook = "none" | "theme" | "screenshot";
