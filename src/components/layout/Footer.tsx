import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">SparqUp</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Digitalisation pour TPE/PME
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/forfaits" className="hover:underline">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Légal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/legal/mentions" className="hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:underline">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SparqUp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}