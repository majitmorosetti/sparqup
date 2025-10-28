import Hero from "@/components/home/Hero";
import ProofSlider from "@/components/home/proof/ProofSlider";
import Pillars from "@/components/home/Pillars";
import PricingTeaser from "@/components/home/PricingTeaser";
import Features from "@/components/home/Features";
import Process from "@/components/home/ProcessFiberSequence";

export default function HomePage() {

  return (
    <>
      <Hero />
      <Features />
      <ProofSlider
        title="Showcases & performances"
        look="screenshot"
        contentMaxWidth={560}
        autoPlayMs={7000}
        slides={[
          {
            site: { name: "faceplastie.com", url: "https://faceplastie.com" },
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
            site: { name: "Chez Joon — Restaurant" },
            screenshot: {
              src: "/media/mockups/chez-joon.webp", // ← image locale dans /public
              width: 640, // largeur de rendu (hint)
              height: 400, // hauteur de rendu (hint)
              placeholder: {
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
          },
        ]}
      />
      <Process />
      <Pillars />
      <PricingTeaser />
    </>
  );
}
