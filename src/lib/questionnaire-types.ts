export type ActivityType = 
  | "restaurant"
  | "ecommerce"
  | "services"
  | "saas"
  | "other";

export type Budget = 
  | "less-2k"
  | "2-5k"
  | "5-15k"
  | "15k-plus"
  | "unknown";

export type Timeline = 
  | "urgent"
  | "normal"
  | "flexible";

export interface QuestionnaireData {
  activityType: ActivityType | null;
  features: string[];
  tools: string[];
  automations: string[];
  budget: Budget | null;
  timeline: Timeline | null;
  email: string;
}

export interface Recommendation {
  stack: string;
  price: string;
  timeline: string;
  justification: string;
  included: string[];
  alternative?: {
    stack: string;
    price: string;
    reason: string;
  };
}