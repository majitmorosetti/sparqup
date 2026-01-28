import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  // Les couleurs sont définies dans globals.css via @theme
  // Pas besoin de config supplémentaire
} satisfies Config;