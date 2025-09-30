import Hero from "@/components/home/Hero"
import ProofSlider from "@/components/home/proof/ProofSlider"
import Pillars from "@/components/home/Pillars"
import PricingTeaser from "@/components/home/PricingTeaser"
import { Gauge, Timer, Activity, ExternalLink } from "lucide-react"


export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <ProofSlider
        title="Showcases & performances"
        look="screenshot"
        contentMaxWidth={560}
        autoPlayMs={7000}
        slides={[
          {
            site: { name: "faceplastie.com", url: "https://faceplastie.com" },
            screenshot: { provider: "mshots", width: 640 },
            metrics: [
              { label: "Lighthouse (mobile)", value: "92", icon: <Gauge className="h-3.5 w-3.5" /> },
              { label: "Desktop", value: "99", icon: <Gauge className="h-3.5 w-3.5" /> },
              { label: "LCP", value: "1.8s", icon: <Timer className="h-3.5 w-3.5" /> },
              { label: "CLS", value: "0.01", icon: <Activity className="h-3.5 w-3.5" /> },
            ],
            extras: [{ label: "Étude de cas", href: "/portfolio" }],
          },
          {
            site: { name: "Chez Joon — Restaurant" },
            screenshot: {
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
      /> */}
      <Pillars />
      <PricingTeaser />
    </>
  )
}
