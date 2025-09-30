export type IconKey = "gauge" | "timer" | "activity";

export type MetricData = {
  label: string;
  value: string;
  pending?: boolean;
  icon?: IconKey; // optionnel : clé symbolique, pas de React ici
};

export type PlaceholderCfg = {
  kind?: "gradient" | "solid";
  colors?: string[]; // ex: ["#dc2626", "#f97316"]
  label?: string;
  emoji?: string;
};

export type ScreenshotData = {
  url?: string;
  provider?: "mshots" | "thumio";
  width?: number;
  placeholder?: PlaceholderCfg;
};

export type ShowcaseData = {
  name: string;
  url?: string;
  screenshot?: ScreenshotData;
  metrics: MetricData[];
  extras?: { label: string; href?: string }[];
};
