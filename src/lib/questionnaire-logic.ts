import type { QuestionnaireData, Recommendation } from "./questionnaire-types";

export function generateRecommendation(data: QuestionnaireData): Recommendation {
  const { activityType, features, tools, automations, budget } = data;

  // Restaurant simple
  if (activityType === "restaurant" && features.length <= 3 && tools.length <= 2) {
    return {
      stack: "Wix Premium",
      price: "2 000 - 3 000€",
      timeline: "2-3 semaines",
      justification:
        "Un site restaurant avec menu et réservation ne nécessite pas de développement custom. Wix offre rapidité, facilité de gestion, et un excellent rapport qualité/prix.",
      included: [
        "Template premium personnalisé",
        "Menu dynamique",
        "Intégration réservation (TheFork/Zenchef)",
        "Responsive mobile",
        "SEO de base",
      ],
      alternative:
        budget === "15k-plus"
          ? {
              stack: "Budget restant pour acquisition",
              price: "12 000€",
              reason:
                "Investissez l'économie dans des photos professionnelles (1 500€), SEO local (2 000€), et campagnes Google Ads (8 500€). C'est là que vous verrez du ROI.",
            }
          : undefined,
    };
  }

  // E-commerce simple (< 50 produits)
  if (
    activityType === "ecommerce" &&
    features.includes("< 50 produits") &&
    automations.length <= 2
  ) {
    return {
      stack: "Shopify",
      price: "3 000 - 5 000€",
      timeline: "3-4 semaines",
      justification:
        "Pour un petit catalogue, Shopify offre le meilleur équilibre entre coût initial, facilité de gestion, et fonctionnalités e-commerce robustes.",
      included: [
        "Thème Shopify customisé",
        "Configuration paiement (Stripe/PayPal)",
        "Gestion produits & stock",
        "Emails transactionnels",
        "SEO e-commerce",
      ],
    };
  }

  // E-commerce complexe (500+ produits ou multi-vendeurs)
  if (
    activityType === "ecommerce" &&
    (features.includes("500+ produits") || features.includes("Multi-vendeurs"))
  ) {
    return {
      stack: "Next.js + Medusa (headless)",
      price: "12 000 - 18 000€",
      timeline: "8-12 semaines",
      justification:
        "Avec un gros catalogue ou marketplace, les frais récurrents Shopify deviennent prohibitifs. Une solution headless custom offre contrôle total et économies long terme.",
      included: [
        "Design 100% custom",
        "Backend e-commerce Medusa",
        "Dashboard admin avancé",
        "Paiement Stripe",
        "Gestion multi-vendeurs (si applicable)",
        "API REST pour intégrations",
      ],
      alternative: {
        stack: "Shopify Plus",
        price: "299$/mois + 2% transaction + setup 8k€",
        reason:
          "Option clé en main, mais coûts récurrents élevés. À considérer si vous préférez déléguer la maintenance.",
      },
    };
  }

  // SaaS / App web
  if (activityType === "saas" || features.length > 5 || automations.length > 3) {
    return {
      stack: "Next.js + PostgreSQL + Supabase",
      price: "15 000 - 30 000€",
      timeline: "10-16 semaines",
      justification:
        "Une application web avec automatisations complexes nécessite un développement sur-mesure. Stack moderne, scalable, et maintenable.",
      included: [
        "Architecture custom complète",
        "Base de données PostgreSQL",
        "Authentification utilisateurs",
        "Dashboard admin",
        "API REST/GraphQL",
        "Connexions outils (Zapier/n8n)",
        "Déploiement production",
      ],
    };
  }

  // Services / Agence (cas par défaut)
  if (tools.length > 2 || automations.length > 1) {
    return {
      stack: "Next.js + Headless CMS (Sanity)",
      price: "6 000 - 12 000€",
      timeline: "5-8 semaines",
      justification:
        "Site vitrine avancé avec automatisations. CMS headless pour flexibilité contenu, Next.js pour performance et SEO.",
      included: [
        "Design custom responsive",
        "CMS Sanity pour gestion contenu",
        "Formulaires avancés",
        "Intégrations outils (CRM, calendrier...)",
        "Automatisations (emails, synchro données)",
        "SEO optimisé",
      ],
    };
  }

  // Site vitrine simple
  return {
    stack: "WordPress + Elementor",
    price: "2 500 - 4 000€",
    timeline: "3-4 semaines",
    justification:
      "Site vitrine classique avec quelques pages. WordPress reste le meilleur choix pour simplicité et coût.",
    included: [
      "Thème WordPress premium",
      "Design semi-custom",
      "Pages essentielles (services, contact, etc.)",
      "Formulaire de contact",
      "SEO de base",
    ],
  };
}