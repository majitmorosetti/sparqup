import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">SparqUp</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/services" className="hover:underline">
            Nos services
          </Link>
          <Link href="/forfaits" className="hover:underline">
            Nos prix
          </Link>
          <Link href="/contact" className="hover:underline">
            Nous contacter
          </Link>
        </nav>

        <Button asChild size="sm">
          <Link href="/questionnaire">Simuler mon projet</Link>
        </Button>
      </div>
    </header>
  );
}