import type { CVData } from '@/types/cv';

export const cvData: CVData = {
  personal: {
    name: 'Majit Morosetti',
    title: 'Full-Stack Developer • Freelance • Spécialiste React & Next.js',
    email: 'contact@sparqup.fr',
    phone: '+33 6 XX XX XX XX',
    location: 'Bordeaux, France',
    website: 'sparqup.fr',
    github: 'github.com/majitmorosetti',
    linkedin: 'linkedin.com/in/majitmorosetti',
  },
  summary:
    'Développeur full-stack avec 20 ans d\'expérience en développement web. Spécialisé dans la création d\'applications React/Next.js modernes, l\'automatisation de processus métier et l\'intégration d\'outils IA. Expertise en e-commerce, SaaS et solutions sur-mesure pour TPE/PME.',
  experience: [
    {
      company: 'SparqUp',
      position: 'Développeur Full-Stack & Consultant Freelance',
      period: '2021 - Présent',
      description: [
        'Développement d\'applications web full-stack (React, Next.js, Node.js, Django, PostgreSQL)',
        'Automatisation de workflows clients avec Make, Zapier et intégrations API tierces',
        'Implémentation de solutions e-commerce Shopify avec optimisation conversion',
        'Clients notables : Face Plastie (e-learning), UMAÏ (e-commerce ergonomique), Chez Joon (restauration)',
      ],
    },
    {
      company: 'Face Plastie',
      position: 'Lead Developer',
      period: '2022 - 2024',
      description: [
        'Développement plateforme e-learning complète avec gestion de cours vidéo et espace membre',
        'Intégration paiements Stripe et système d\'abonnement récurrent',
        'Refonte UI/UX avec design system moderne (terra cotta/cream)',
      ],
    },
    {
      company: 'UMAÏ',
      position: 'Consultant E-commerce & Marketing Digital',
      period: '2023 - 2024',
      description: [
        'Développement et optimisation site e-commerce Shopify pour produits ergonomiques',
        'Stratégie et gestion campagnes Meta Ads (Facebook/Instagram)',
        'Email marketing automation et séquences de conversion',
      ],
    },
  ],
  skills: {
    technical: [
      'React',
      'Next.js 15',
      'TypeScript',
      'Node.js',
      'Django',
      'PostgreSQL',
      'Tailwind CSS',
      'REST APIs',
    ],
    tools: [
      'Git',
      'Shopify',
      'Make',
      'Zapier',
      'Notion',
      'Vercel',
      'Meta Business Suite',
      'Google Analytics',
      'Stripe',
    ],
    languages: [
      'Français (natif)',
      'Anglais (professionnel)',
    ],
  },
  education: [
    {
      degree: 'Autodidacte en Développement Web',
      school: 'Formation continue et projets réels',
      period: '2005 - Présent',
    },
  ],
  projects: [
    {
      name: 'SparqUp Questionnaire System',
      description:
        'Système de questionnaire intelligent avec logique de branchement conditionnelle et génération automatique de devis personnalisés pour clients TPE/Tech/Conseil.',
      tech: ['Next.js', 'TypeScript', 'React Hook Form', 'Zod', 'Tailwind CSS'],
    },
    {
      name: 'Face Plastie Platform',
      description:
        'Plateforme e-learning complète avec gestion de cours vidéo, système de paiement Stripe, et espace membre sécurisé.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API'],
    },
    {
      name: 'UMAÏ E-commerce',
      description:
        'Site e-commerce Shopify optimisé pour la conversion avec intégration Meta Pixel et email marketing automation.',
      tech: ['Shopify Liquid', 'JavaScript', 'Meta Ads', 'Klaviyo'],
    },
  ],
};