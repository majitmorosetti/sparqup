import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 95, 100], // ← Ajoute cette ligne
  },
};

export default nextConfig;
