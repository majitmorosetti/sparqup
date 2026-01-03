// src/app/page.tsx
import HeroSection from '@/components/home/HeroSection';
import TechMarquee from '@/components/home/TechMarquee';
import ServicesGrid from '@/components/home/ServicesGrid';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />  {/* ← Ajoute ici */}
      <ServicesGrid />
      <FeaturedProjects />
      <ProcessTimeline />
      <FinalCTA />
    </>
  );
}