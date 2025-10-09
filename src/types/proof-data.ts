// src/types/proof-data.ts
export type IconKey = "gauge" | "timer" | "activity";

export type MetricData = {
  label: string;
  value: string;
  pending?: boolean;
  icon?: IconKey; // clé symbolique, pas de React ici
};

export type PlaceholderCfgData = {
  kind?: "gradient" | "solid";
  colors?: string[]; // ex: ["#dc2626", "#f97316"]
  label?: string;
  emoji?: string;
};

export type ScreenshotData = {
  src?: string;
  url?: string;
  provider?: "mshots" | "thumio";
  width?: number;
  height?: number;
  placeholder?: PlaceholderCfgData;
};

export type ShowcaseData = {
  name: string;
  url?: string;
  screenshot?: ScreenshotData;
  metrics: MetricData[];
  extras?: { label: string; href?: string }[];
};
